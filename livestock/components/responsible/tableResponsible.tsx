
"use client";

import { useEffect, useState } from "react";

import { DataTable } from "@/components/ui/data-table";
import { getColumns, type Responsible } from "./columns";

import ButtonCreate from "../ui/buttonCreate";
import FormCreationResponsible from "./formCreationResponsible";

export default function TableResponsible() {
  const [responsibles, setResponsibles] = useState<Responsible[]>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedResponsible, setSelectedResponsible] =
    useState<Responsible | null>(null);

  const fetchResponsibles = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/responsible/ResponsibleAll",
      );

      const resJson = await response.json();

      const datos = Array.isArray(resJson)
        ? resJson
        : Array.isArray(resJson.info)
          ? resJson.info
          : Array.isArray(resJson.data)
            ? resJson.data
            : [];

      setResponsibles(datos);
    } catch (error) {
      console.error("Error:", error);
      setResponsibles([]);
    }
  };

  useEffect(() => {
    fetchResponsibles();
  }, []);

  const handleOpenCreate = () => {
    setSelectedResponsible(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (responsible: Responsible) => {
    setSelectedResponsible(responsible);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedResponsible(null);
  };

  return (
    <div className="w-full bg-white px-4 py-8">
      <div className="mx-auto w-full space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-[#2B2A26]">
            Responsables
          </h1>
          <p className="text-sm text-[#6B6459]">
            {responsibles.length}{" "}
            {responsibles.length === 1
              ? "responsable registrado"
              : "responsables registrados"}
            .
          </p>
        </div>

        <DataTable
          columns={getColumns(handleOpenEdit)}
          data={responsibles}
          filterPlaceholder="Buscar en todos los campos..."
          toolbar={
            <ButtonCreate onClick={handleOpenCreate}>
              Agregar Responsable
            </ButtonCreate>
          }
        />

        <FormCreationResponsible
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSuccess={fetchResponsibles}
          responsibleToEdit={selectedResponsible}
        />
      </div>
    </div>
  );
}
