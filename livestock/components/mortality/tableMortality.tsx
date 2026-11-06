
"use client";
import { useEffect, useState } from "react";

import { DataTable } from "@/components/ui/data-table";
import { getColumns, type Mortality } from "./columns";

import ButtonCreate from "../ui/buttonCreate";
import FormCreationMortality from "./formCreationMortality";

interface Responsible {
  idResponsible: number;
  fullName: string;
  role: string;
}

export default function TableMortality() {
  const [mortalidades, setMortalidades] = useState<Mortality[]>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMortality, setSelectedMortality] =
    useState<Mortality | null>(null);

  useEffect(() => {
    const fetchMortalidades = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = { Authorization: `Bearer ${token}` };

        const [mortalityRes, responsibleRes] = await Promise.all([
          fetch(
            "http://localhost:3000/api/mortality/MortalityAll?limit=500",
            { headers },
          ),
          fetch(
            "http://localhost:3000/api/responsible/ResponsibleAll?limit=500",
            { headers },
          ),
        ]);

        const [mortalityJson, responsibleJson] = await Promise.all([
          mortalityRes.json(),
          responsibleRes.json(),
        ]);

        const mortalityList: Mortality[] = Array.isArray(mortalityJson.info)
          ? mortalityJson.info
          : [];

        const responsibles: Responsible[] = responsibleJson.info ?? [];

        const mortalidadesFormatted: Mortality[] = mortalityList.map((m) => {
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

        setMortalidades([...mortalidadesFormatted].reverse());
      } catch (error) {
        console.error("Error:", error);
        setMortalidades([]);
      }
    };

    fetchMortalidades();
  }, []);

  const handleOpenCreate = () => {
    setSelectedMortality(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (mortality: Mortality) => {
    setSelectedMortality(mortality);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMortality(null);
  };

  return (
    <div className="w-full bg-white px-4 py-8">
      <div className="mx-auto w-full space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-[#2B2A26]">
            Salidas
          </h1>
          <p className="text-sm text-[#6B6459]">
            {mortalidades.length}{" "}
            {mortalidades.length === 1
              ? "salida registrada"
              : "salidas registradas"}
            .
          </p>
        </div>

        <DataTable
          columns={getColumns(handleOpenEdit)}
          data={mortalidades}
          filterPlaceholder="Buscar en todos los campos..."
          toolbar={
            <ButtonCreate onClick={handleOpenCreate}>
              Crear Salida
            </ButtonCreate>
          }
        />

        <FormCreationMortality
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSuccess={handleCloseModal}
          mortalityToEdit={selectedMortality}
        />
      </div>
    </div>
  );
}
