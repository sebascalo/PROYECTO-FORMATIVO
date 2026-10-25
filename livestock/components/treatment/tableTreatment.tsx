"use client";
import { useEffect, useState } from "react";

import { DataTable } from "@/components/ui/data-table";
import { columns, type Treatment } from "./columns";

interface TableTreatmentProps {
  actions?: React.ReactNode;
}

interface Responsible {
  idResponsible: number;
  fullName: string;
  role: string;
}

export default function TableTreatment({ actions }: TableTreatmentProps) {
  const [treatments, setTreatments] = useState<Treatment[]>([]);

  useEffect(() => {
    const fetchTreatments = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = { Authorization: `Bearer ${token}` };

        // 👇 Quitamos el fetch de cattle
        const [treatmentRes, responsibleRes] = await Promise.all([
          fetch("http://localhost:3000/api/treatment/TreatmentAll?limit=500", { headers }),
          fetch("http://localhost:3000/api/responsible/ResponsibleAll?limit=500", { headers }),
        ]);

        const [treatmentJson, responsibleJson] = await Promise.all([
          treatmentRes.json(),
          responsibleRes.json(),
        ]);

        const treatmentList: Treatment[] = Array.isArray(treatmentJson.info) ? treatmentJson.info : [];
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

        // 👇 Invertimos para que el más nuevo salga primero
        setTreatments([...treatmentFormatted].reverse());
      } catch (error) {
        console.error("Error:", error);
        setTreatments([]);
      }
    };
    fetchTreatments();
  }, []);

  return (
    <div className="w-full bg-white px-4 py-8">
      <div className="mx-auto w-full space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-[#2B2A26]">Tratamientos</h1>
          <p className="text-sm text-[#6B6459]">
            {treatments.length} {treatments.length === 1 ? "tratamiento registrado" : "tratamientos registrados"}.
          </p>
        </div>

        <DataTable
          columns={columns}
          data={treatments}
          filterColumnId="id_Bovine"
          filterPlaceholder="Filtrar por ID de bovino..."
          toolbar={actions}
        />
      </div>
    </div>
  );
}