"use client";
import { useEffect, useState } from "react";
import { DataTable } from "@/components/ui/data-table";
import { columns, type Milk } from "./columns";

interface TableMilkProps {
  actions?: React.ReactNode;
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

        // 👇 Ya no pedimos los bovinos, solo la leche y los responsables
        const [milkRes, responsibleRes] = await Promise.all([
          fetch("http://localhost:3000/api/milk/MilkAll?limit=500", { headers }),
          fetch("http://localhost:3000/api/responsible/ResponsibleAll?limit=500", { headers }),
        ]);

        const [milkJson, responsibleJson] = await Promise.all([
          milkRes.json(),
          responsibleRes.json(),
        ]);

        const milkList: Milk[] = Array.isArray(milkJson.info) ? milkJson.info : [];
        const responsibles: Responsible[] = responsibleJson.info ?? [];

        const milksFormatted: Milk[] = milkList.map((m) => {
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

        // 👇 Invertimos el arreglo para que el más nuevo salga primero
        setMilks([...milksFormatted].reverse());
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
          <h1 className="text-2xl font-semibold text-[#2B2A26]">Producción de Leche</h1>
          <p className="text-sm text-[#6B6459]">
            {milks.length} {milks.length === 1 ? "producción registrada" : "producciones registradas"}.
          </p>
        </div>

        <DataTable
          columns={columns}
          data={milks}
          filterColumnId="id_Bovine"
          filterPlaceholder="Filtrar por ID de bovino..."
          toolbar={actions}
        />
      </div>
    </div>
  );
}