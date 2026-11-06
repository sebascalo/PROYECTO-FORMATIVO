
"use client";

import { useEffect, useState } from "react";
import { DataTable } from "@/components/ui/data-table";
import { getColumns, type Milk } from "./columns";

import ButtonCreate from "../ui/buttonCreate";
import FormCreationMilk from "./formCreationMilk";

interface Responsible {
  idResponsible: number;
  fullName: string;
  role: string;
}

export default function TableMilk() {
  const [milks, setMilks] = useState<Milk[]>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMilk, setSelectedMilk] = useState<Milk | null>(null);

  useEffect(() => {
    const fetchMilks = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = { Authorization: `Bearer ${token}` };

        const [milkRes, responsibleRes] = await Promise.all([
          fetch("http://localhost:3000/api/milk/MilkAll?limit=500", {
            headers,
          }),
          fetch(
            "http://localhost:3000/api/responsible/ResponsibleAll?limit=500",
            { headers },
          ),
        ]);

        const [milkJson, responsibleJson] = await Promise.all([
          milkRes.json(),
          responsibleRes.json(),
        ]);

        const milkList: Milk[] = Array.isArray(milkJson.info)
          ? milkJson.info
          : [];

        const responsibles: Responsible[] = responsibleJson.info ?? [];

        const milksFormatted: Milk[] = milkList.map((m) => {
          const responsible = responsibles.find(
            (r) => String(r.idResponsible) === String(m.idResponsible),
          );

          return {
            ...m,
            responsibleData: responsible
              ? {
                  idResponsible: responsible.idResponsible,
                  fullName: responsible.fullName,
                  role: responsible.role,
                }
              : null,
          };
        });

        setMilks([...milksFormatted].reverse());
      } catch (error) {
        console.error("Error:", error);
        setMilks([]);
      }
    };

    fetchMilks();
  }, []);

  const handleOpenCreate = () => {
    setSelectedMilk(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (milk: Milk) => {
    setSelectedMilk(milk);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMilk(null);
  };

  return (
    <div className="w-full bg-white px-4 py-8">
      <div className="mx-auto w-full space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-[#2B2A26]">
            Producción de Leche
          </h1>

          <p className="text-sm text-[#6B6459]">
            {milks.length}{" "}
            {milks.length === 1
              ? "producción registrada"
              : "producciones registradas"}
            .
          </p>
        </div>

        <DataTable
          columns={getColumns(handleOpenEdit)}
          data={milks}
          filterPlaceholder="Buscar en todos los campos..."
          toolbar={
            <ButtonCreate onClick={handleOpenCreate}>
              Agregar Producción
            </ButtonCreate>
          }
        />

        <FormCreationMilk
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSuccess={handleCloseModal}
          milkToEdit={selectedMilk}
        />
      </div>
    </div>
  );
}
