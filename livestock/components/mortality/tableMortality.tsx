"use client";
import { useEffect, useState } from "react";

import { DataTable } from "@/components/ui/data-table";
import { columns, type Mortality } from "./columns";

interface TableMortalityProps {
  actions?: React.ReactNode;
}

// 👇 Tipos mínimos para los catálogos
interface Cattle {
  id_Bovine: number;
  name: string;
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

        // 👇 3 fetch en paralelo
        const [mortalityRes, cattleRes, responsibleRes] = await Promise.all([
          fetch("http://localhost:3000/api/mortality/MortalityAll", { headers }),
          fetch("http://localhost:3000/api/cattle/CattleAll?limit=500", {
            headers,
          }),
          fetch(
            "http://localhost:3000/api/responsible/ResponsibleAll?limit=500",
            { headers },
          ),
        ]);

        const [mortalityJson, cattleJson, responsibleJson] = await Promise.all([
          mortalityRes.json(),
          cattleRes.json(),
          responsibleRes.json(),
        ]);

        const mortalityList: Mortality[] = mortalityJson.info ?? [];
        const cattles: Cattle[] = cattleJson.info ?? [];
        const responsibles: Responsible[] = responsibleJson.info ?? [];

        // 👇 "JOIN en memoria"
        const mortalidadesFormatted: Mortality[] = mortalityList.map((m) => {
          const cattle = cattles.find(
            (c) => String(c.id_Bovine) === String(m.id_Bovine),
          );
          const responsible = responsibles.find(
            (r) => r.idResponsible === m.idResponsible,
          );

          return {
            ...m,
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

        setMortalidades(mortalidadesFormatted);
      } catch (error) {
        console.error("Error:", error);
        setMortalidades([]);
      }
    };
    fetchMortalidades();
  }, []);

  return (
    <div className="min-h-screen bg-white px-6 py-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-[#2B2A26]">
            Mortalidades
          </h1>
          <p className="text-sm text-[#6B6459]">
            {mortalidades.length}{" "}
            {mortalidades.length === 1
              ? "mortalidad registrada"
              : "mortalidades registradas"}
            .
          </p>
        </div>

        <DataTable
          columns={columns}
          data={mortalidades}
          filterColumnId="id_Bovine"
          filterPlaceholder="Filtrar por bovino..."
          toolbar={actions}
        />
      </div>
    </div>
  );
}