"use client";
import { useEffect, useState } from "react";

import { DataTable } from "@/components/ui/data-table";
import { columns, type Milk } from "./columns";

interface TableMilkProps {
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

export default function TableMilk({ actions }: TableMilkProps) {
  const [milks, setMilks] = useState<Milk[]>([]);

  useEffect(() => {
    const fetchMilks = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = { Authorization: `Bearer ${token}` };

        const [milkRes, cattleRes, responsibleRes] = await Promise.all([
          fetch("http://localhost:3000/api/milk/MilkAll?limit=500", { headers }),
          fetch("http://localhost:3000/api/cattle/CattleAll?limit=500", {
            headers,
          }),
          fetch(
            "http://localhost:3000/api/responsible/ResponsibleAll?limit=500",
            { headers },
          ),
        ]);

        const [milkJson, cattleJson, responsibleJson] = await Promise.all([
          milkRes.json(),
          cattleRes.json(),
          responsibleRes.json(),
        ]);

        const milkList: Milk[] = milkJson.info ?? [];
        const cattles: Cattle[] = cattleJson.info ?? [];
        const responsibles: Responsible[] = responsibleJson.info ?? [];

        const milksFormatted: Milk[] = milkList.map((m) => {
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

        setMilks(milksFormatted);
      } catch (error) {
        console.error("Error:", error);
        setMilks([]);
      }
    };
    fetchMilks();
  }, []);

  return (
    <div className="min-h-screen bg-white px-6 py-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-[#2B2A26]">
            Producción de Leche
          </h1>
          <p className="text-sm text-[#6B6459]">
            {milks.length}{" "}
            {milks.length === 1
              ? "producción registrada"
              : "producciones registradas"}
            .
          </p>
        </div>

        <DataTable
          columns={columns}
          data={milks}
          filterColumnId="id_Bovine"
          filterPlaceholder="Filtrar por bovino..."
          toolbar={actions}
        />
      </div>
    </div>
  );
}