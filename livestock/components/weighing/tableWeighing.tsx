"use client";
import { useEffect, useState } from "react";

import { DataTable } from "@/components/ui/data-table";
import { columns, type Weighing } from "./columns";

interface TableWeighingProps {
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

export default function TableWeighing({ actions }: TableWeighingProps) {
  const [weighings, setWeighings] = useState<Weighing[]>([]);

  useEffect(() => {
    const fetchWeighings = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = { Authorization: `Bearer ${token}` };

        // 👇 Traer las 3 listas en paralelo
        const [weighingRes, cattleRes, responsibleRes] = await Promise.all([
          fetch("http://localhost:3000/api/weighing/WeighingAll", { headers }),
          fetch("http://localhost:3000/api/cattle/CattleAll?limit=500", { headers }),
          fetch("http://localhost:3000/api/responsible/ResponsibleAll?limit=500", { headers }),
        ]);

        const [weighingJson, cattleJson, responsibleJson] = await Promise.all([
          weighingRes.json(),
          cattleRes.json(),
          responsibleRes.json(),
        ]);

        const weighingList: Weighing[] = weighingJson.info ?? [];
        const cattles: Cattle[] = cattleJson.info ?? [];
        const responsibles: Responsible[] = responsibleJson.info ?? [];

        // 👇 "JOIN en memoria"
        const weighingsFormatted: Weighing[] = weighingList.map((w) => {
          const cattle = cattles.find(
            (c) => String(c.id_Bovine) === String(w.id_Bovine),
          );
          const responsible = responsibles.find(
            (r) => r.idResponsible === w.idResponsible,
          );

          return {
            ...w,
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

        setWeighings(weighingsFormatted);
      } catch (error) {
        console.error("Error:", error);
        setWeighings([]);
      }
    };
    fetchWeighings();
  }, []);

  return (
    <div className="min-h-screen bg-white px-6 py-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-[#2B2A26]">Pesajes</h1>
          <p className="text-sm text-[#6B6459]">
            {weighings.length}{" "}
            {weighings.length === 1
              ? "pesaje registrado"
              : "pesajes registrados"}
            .
          </p>
        </div>

        <DataTable
          columns={columns}
          data={weighings}
          filterColumnId="id_Bovine"
          filterPlaceholder="Filtrar por bovino..."
          toolbar={actions}
        />
      </div>
    </div>
  );
}