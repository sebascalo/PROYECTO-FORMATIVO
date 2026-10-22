"use client";
import { useEffect, useState } from "react";

import { DataTable } from "@/components/ui/data-table";
import { columns, type Mortality } from "./columns";

interface TableMortalityProps {
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

export default function TableMortality({ actions }: TableMortalityProps) {
  const [mortalidades, setMortalidades] = useState<Mortality[]>([]);

  useEffect(() => {
    const fetchMortalidades = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = { Authorization: `Bearer ${token}` };

        const [mortalityRes, cattleRes, responsibleRes] = await Promise.all([
          fetch("http://localhost:3000/api/mortality/MortalityAll?limit=500", { headers }),
          fetch("http://localhost:3000/api/cattle/CattleAll?limit=500", { headers }),
          fetch("http://localhost:3000/api/responsible/ResponsibleAll?limit=500", { headers }),
        ]);

        const [mortalityJson, cattleJson, responsibleJson] = await Promise.all([
          mortalityRes.json(),
          cattleRes.json(),
          responsibleRes.json(),
        ]);

        // 👇 Validación para que no explote si hay error
        const mortalityList: Mortality[] = Array.isArray(mortalityJson.info) ? mortalityJson.info : [];
        const cattles: Cattle[] = cattleJson.info ?? [];
        const responsibles: Responsible[] = responsibleJson.info ?? [];

        const mortalidadesFormatted: Mortality[] = mortalityList.map((m) => {
          const cattle = cattles.find(
            (c) => String(c.id_Bovine) === String(m.id_Bovine),
          );
          const responsible = responsibles.find(
            (r) => String(r.idResponsible) === String(m.idResponsible),
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

        setMortalidades([...mortalidadesFormatted].reverse());
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
          filterColumnId="cattleData" // 👈 Ahora busca por el objeto del bovino
          filterPlaceholder="Filtrar por nombre de bovino..."
          toolbar={actions}
        />
      </div>
    </div>
  );
}