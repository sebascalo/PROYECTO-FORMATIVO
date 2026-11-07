"use client";

import { useEffect, useState } from "react";
import { DataTable } from "@/components/ui/data-table";
import ButtonCreate from "../ui/buttonCreate";
import FormCreationTreatment from "./formCreationTreatment";
import { getColumns, type Treatment } from "./columns";

interface Responsible {
  idResponsible: number;
  fullName: string;
  role: string;
}

export default function TableTreatment() {
  const [treatments, setTreatments] = useState<Treatment[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTreatment, setSelectedTreatment] =
    useState<Treatment | null>(null);

  const fetchTreatments = async () => {
    try {
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };

      const [treatmentRes, responsibleRes] = await Promise.all([
        fetch("http://localhost:3000/api/treatment/TreatmentAll?limit=500", {
          headers,
        }),
        fetch(
          "http://localhost:3000/api/responsible/ResponsibleAll?limit=500",
          { headers },
        ),
      ]);

      const [treatmentJson, responsibleJson] = await Promise.all([
        treatmentRes.json(),
        responsibleRes.json(),
      ]);

      if (!treatmentRes.ok) {
        throw new Error(
          treatmentJson?.message || "Error al cargar tratamientos",
        );
      }

      if (!responsibleRes.ok) {
        throw new Error(
          responsibleJson?.message || "Error al cargar responsables",
        );
      }

      const treatmentList: Treatment[] = Array.isArray(treatmentJson.info)
        ? treatmentJson.info
        : [];

      const responsibles: Responsible[] = responsibleJson.info ?? [];

      const treatmentFormatted: Treatment[] = treatmentList.map((t) => {
        const responsible = responsibles.find(
          (r) => String(r.idResponsible) === String(t.idResponsible),
        );

        return {
          ...t,
          responsibleData: responsible
            ? {
                idResponsible: responsible.idResponsible,
                fullName: responsible.fullName,
                role: responsible.role,
              }
            : null,
        };
      });

      setTreatments([...treatmentFormatted].reverse());
    } catch (error) {
      console.error("Error:", error);
      setTreatments([]);
    }
  };

  useEffect(() => {
    fetchTreatments();
  }, []);

  const handleOpenCreate = () => {
    setSelectedTreatment(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (treatment: Treatment) => {
    setSelectedTreatment(treatment);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTreatment(null);
  };

  const handleSuccess = () => {
    handleCloseModal();
    fetchTreatments();
  };

  return (
    <div className="w-full bg-white px-4 py-8">
      <div className="mx-auto w-full space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-[#2B2A26]">
            Tratamientos
          </h1>

          <p className="text-sm text-[#6B6459]">
            {treatments.length}{" "}
            {treatments.length === 1
              ? "tratamiento registrado"
              : "tratamientos registrados"}
            .
          </p>
        </div>

        <DataTable
          columns={getColumns(handleOpenEdit)}
          data={treatments}
          filterPlaceholder="Buscar en todos los campos..."
          toolbar={
            <ButtonCreate onClick={handleOpenCreate}>
              Agregar Tratamiento
            </ButtonCreate>
          }
        />

        <FormCreationTreatment
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSuccess={handleSuccess}
          treatmentToEdit={selectedTreatment}
        />
      </div>
    </div>
  );
}