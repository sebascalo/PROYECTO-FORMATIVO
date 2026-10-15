"use client";
import { useEffect, useState } from "react";

import { DataTable } from "@/components/ui/data-table";
import { columns, type Vacunation } from "./columns";

interface TableVacunationProps {
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

export default function TableVacunation({ actions }: TableVacunationProps) {
  const [vacunations, setVacunations] = useState<Vacunation[]>([]);

  useEffect(() => {
    const fetchVacunations = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = { Authorization: `Bearer ${token}` };

        const [vacRes, cattleRes, responsibleRes] = await Promise.all([
          fetch("http://localhost:3000/api/vacunation/VacunationAll?limit=500", {
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

        const [vacJson, cattleJson, responsibleJson] = await Promise.all([
          vacRes.json(),
          cattleRes.json(),
          responsibleRes.json(),
        ]);

        const vacList: Vacunation[] = vacJson.info ?? [];
        const cattles: Cattle[] = cattleJson.info ?? [];
        const responsibles: Responsible[] = responsibleJson.info ?? [];

        const vacFormatted: Vacunation[] = vacList.map((v) => {
          const cattle = cattles.find(
            (c) => String(c.id_Bovine) === String(v.id_Bovine),
          );
          const responsible = responsibles.find(
            (r) => r.idResponsible === v.idResponsible,
          );

          return {
            ...v,
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

        setVacunations(vacFormatted);
      } catch (error) {
        console.error("Error:", error);
        setVacunations([]);
      }
    };
    fetchVacunations();
  }, []);

  return (
    <div className="min-h-screen bg-white px-6 py-8">
      <div className="mx-auto max-w-6xl space-y-6">
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
          columns={columns}
          data={vacunations}
          filterColumnId="id_Bovine"
          filterPlaceholder="Filtrar por bovino..."
          toolbar={actions}
        />
      </div>
    </div>
  );
}