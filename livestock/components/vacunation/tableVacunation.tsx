"use client";
import { useEffect, useState } from "react";

import { DataTable } from "@/components/ui/data-table";
import { columns, type Vacunation } from "./columns";

interface TableVacunationProps {
  actions?: React.ReactNode;
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

        // 👇 Solo 2 fetch (vacunaciones y responsables)
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

        const vacList: Vacunation[] = Array.isArray(vacJson.info) ? vacJson.info : [];
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

        // 👇 Invertimos para que el último registro salga primero
        setVacunations([...vacFormatted].reverse());
      } catch (error) {
        console.error("Error:", error);
        setVacunations([]);
      }
    };
    fetchVacunations();
  }, []);

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
          columns={columns}
          data={vacunations}
          filterPlaceholder="Buscar en todos los campos..."
          toolbar={actions}
        />
      </div>
    </div>
  );
}