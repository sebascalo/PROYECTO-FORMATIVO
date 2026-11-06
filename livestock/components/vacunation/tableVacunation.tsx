"use client";

import { useEffect, useState } from "react";
import { DataTable } from "@/components/ui/data-table";
import ButtonCreate from "../ui/buttonCreate";
import FormCreationVacunation from "./formCreationVacunation";
import { getColumns, type Vacunation } from "./columns";

interface Responsible {
  idResponsible: number;
  fullName: string;
  role: string;
}

export default function TableVacunation() {
  const [vacunations, setVacunations] = useState<Vacunation[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVacunation, setSelectedVacunation] =
    useState<Vacunation | null>(null);

  const fetchVacunations = async () => {
    try {
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };

      const [vacRes, responsibleRes] = await Promise.all([
        fetch("http://localhost:3000/api/vacunation/VacunationAll?limit=500", {
          headers,
        }),
        fetch(
          "http://localhost:3000/api/responsible/ResponsibleAll?limit=500",
          { headers },
        ),
      ]);

      const [vacJson, responsibleJson] = await Promise.all([
        vacRes.json(),
        responsibleRes.json(),
      ]);

      if (!vacRes.ok) {
        throw new Error(vacJson?.message || "Error al cargar vacunaciones");
      }

      if (!responsibleRes.ok) {
        throw new Error(
          responsibleJson?.message || "Error al cargar responsables",
        );
      }

      const vacList: Vacunation[] = Array.isArray(vacJson.info)
        ? vacJson.info
        : [];

      const responsibles: Responsible[] = responsibleJson.info ?? [];

      const vacFormatted: Vacunation[] = vacList.map((v) => {
        const responsible = responsibles.find(
          (r) => String(r.idResponsible) === String(v.idResponsible),
        );

        return {
          ...v,
          responsibleData: responsible
            ? {
                idResponsible: responsible.idResponsible,
                fullName: responsible.fullName,
                role: responsible.role,
              }
            : null,
        };
      });

      setVacunations([...vacFormatted].reverse());
    } catch (error) {
      console.error("Error:", error);
      setVacunations([]);
    }
  };

  useEffect(() => {
    fetchVacunations();
  }, []);

  const handleOpenCreate = () => {
    setSelectedVacunation(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (vacunation: Vacunation) => {
    setSelectedVacunation(vacunation);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedVacunation(null);
  };

  const handleSuccess = () => {
    handleCloseModal();
    fetchVacunations();
  };

  return (
    <div className="w-full bg-white px-4 py-8">
      <div className="mx-auto w-full space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-[#2B2A26]">
            Vacunaciones
          </h1>

          <p className="text-sm text-[#6B6459]">
            {vacunations.length}{" "}
            {vacunations.length === 1
              ? "vacunación registrada"
              : "vacunaciones registradas"}
            .
          </p>
        </div>

        <DataTable
          columns={getColumns(handleOpenEdit)}
          data={vacunations}
          filterPlaceholder="Buscar en todos los campos..."
          toolbar={
            <ButtonCreate onClick={handleOpenCreate}>
              Agregar Vacunación
            </ButtonCreate>
          }
        />

        <FormCreationVacunation
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSuccess={handleSuccess}
          vacunationToEdit={selectedVacunation}
        />
      </div>
    </div>
  );
}