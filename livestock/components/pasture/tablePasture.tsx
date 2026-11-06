
"use client";

import { useEffect, useState } from "react";

import { DataTable } from "@/components/ui/data-table";
import { getColumns, type Pasture } from "./columns";

import ButtonCreate from "../ui/buttonCreate";
import FormCreationPasture from "./formCreationPasture";

export default function TablePasture() {
  const [pastures, setPastures] = useState<Pasture[]>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPasture, setSelectedPasture] = useState<Pasture | null>(null);

  useEffect(() => {
    const fetchPastures = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          "http://localhost:3000/api/pasture/PastureAll?limit=500",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const resJson = await response.json();

        const pastureList: Pasture[] = Array.isArray(resJson.info)
          ? resJson.info
          : [];

        setPastures([...pastureList].reverse());

      } catch (error) {
        console.error("Error:", error);
        setPastures([]);
      }
    };

    fetchPastures();
  }, []);

  // Abrir formulario para crear
  const handleOpenCreate = () => {
    setSelectedPasture(null);
    setIsModalOpen(true);
  };

  // Abrir formulario para editar
  const handleOpenEdit = (pasture: Pasture) => {
    setSelectedPasture(pasture);
    setIsModalOpen(true);
  };

  // Cerrar formulario
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPasture(null);
  };

  return (
    <div className="w-full bg-white px-4 py-8">
      <div className="mx-auto w-full space-y-6">

        <div>
          <h1 className="text-2xl font-semibold text-[#2B2A26]">
            Potreros
          </h1>

          <p className="text-sm text-[#6B6459]">
            {pastures.length}{" "}
            {pastures.length === 1
              ? "potrero registrado"
              : "potreros registrados"}
            .
          </p>
        </div>

        <DataTable
          columns={getColumns(handleOpenEdit)}
          data={pastures}
          filterPlaceholder="Buscar en todos los campos..."
          toolbar={
            <ButtonCreate onClick={handleOpenCreate}>
              Agregar Potrero
            </ButtonCreate>
          }
        />

        <FormCreationPasture
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSuccess={handleCloseModal}
          pastureToEdit={selectedPasture}
        />

      </div>
    </div>
  );
}
