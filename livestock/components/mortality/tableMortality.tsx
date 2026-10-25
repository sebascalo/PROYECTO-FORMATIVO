"use client";
import { useEffect, useState } from "react";

import { DataTable } from "@/components/ui/data-table";
import { columns, type Mortality } from "./columns";

interface TableMortalityProps {
  actions?: React.ReactNode;
}

interface Responsible {
  idResponsible: number;
  fullName: string;
  role: string;
}

export default function TableMortality({ actions }: TableMortalityProps) {
  const [mortalidades, setMortalidades] = useState<Mortality[]>([]);

  useEffect(() => {
    const fetchMortalidades = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = { Authorization: `Bearer ${token}` };

        // 👇 Solo hacemos 2 fetch (salidas y responsables)
        const [mortalityRes, responsibleRes] = await Promise.all([
          fetch("http://localhost:3000/api/mortality/MortalityAll?limit=500", { headers }),
          fetch("http://localhost:3000/api/responsible/ResponsibleAll?limit=500", { headers }),
        ]);

        const [mortalityJson, responsibleJson] = await Promise.all([
          mortalityRes.json(),
          responsibleRes.json(),
        ]);

        const mortalityList: Mortality[] = Array.isArray(mortalityJson.info) ? mortalityJson.info : [];
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

        // Invertimos para que salga el más nuevo primero
        setMortalidades([...mortalidadesFormatted].reverse());
      } catch (error) {
        console.error("Error:", error);
        setMortalidades([]);
      }
    };
    fetchMortalidades();
  }, []);

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
          columns={columns}
          data={mortalidades}
          filterColumnId="id_Bovine" // 👈 Filtramos por el ID
          filterPlaceholder="Filtrar por ID de bovino..."
          toolbar={actions}
        />
      </div>
    </div>
  );
}