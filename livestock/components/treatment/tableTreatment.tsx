"use client";
import { useEffect, useState } from "react";

import { DataTable } from "@/components/ui/data-table";
import { columns, type Treatment } from "./columns";

interface TableTreatmentProps {
  actions?: React.ReactNode;
}

interface Cattle {
  id_Bovine: number;
  name: string;
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

        const [treatmentRes, cattleRes, responsibleRes] = await Promise.all([
          fetch("http://localhost:3000/api/treatment/TreatmentAll?limit=500", {
            headers,
          }),
          fetch("http://localhost:3000/api/cattle/CattleAll?limit=500", {
            headers,
          }),
          fetch(
            "http://localhost:3000/api/responsible/ResponsibleAll?limit=500",
            { headers },
          ),
        ]);

        const [treatmentJson, cattleJson, responsibleJson] = await Promise.all([
          treatmentRes.json(),
          cattleRes.json(),
          responsibleRes.json(),
        ]);

        const treatmentList: Treatment[] = treatmentJson.info ?? [];
        const cattles: Cattle[] = cattleJson.info ?? [];
        const responsibles: Responsible[] = responsibleJson.info ?? [];

        const treatmentFormatted: Treatment[] = treatmentList.map((t) => {
          const cattle = cattles.find(
            (c) => String(c.id_Bovine) === String(t.id_Bovine),
          );
          const responsible = responsibles.find(
            (r) => r.idResponsible === t.idResponsible,
          );

          return {
            ...t,
            cattleData: cattle
              ? { id_Bovine: cattle.id_Bovine, name: cattle.name }
              : null,
            responsibleData: responsible
              ? {
                  idResponsible: responsible.idResponsible,
                  fullName: responsible.fullName,
                  role: responsible.role,
                }
              : null,
          };
        });

        setTreatments(treatmentFormatted);
      } catch (error) {
        console.error("Error:", error);
        setTreatments([]);
      }
    };
    fetchTreatments();
  }, []);

  return (
    <div className="min-h-screen bg-white px-6 py-8">
      <div className="mx-auto max-w-6xl space-y-6">
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
          columns={columns}
          data={treatments}
          filterColumnId="id_Bovine"
          filterPlaceholder="Filtrar por bovino..."
          toolbar={actions}
        />
      </div>
    </div>
  );
}