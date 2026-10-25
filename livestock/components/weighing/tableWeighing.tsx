"use client";
import { useEffect, useState } from "react";

import { DataTable } from "@/components/ui/data-table";
import { columns, type Weighing } from "./columns";

interface TableWeighingProps {
  actions?: React.ReactNode;
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

        // Ya no pedimos los bovinos, solo pesajes y responsables
        const [weighingRes, responsibleRes] = await Promise.all([
          fetch("http://localhost:3000/api/weighing/WeighingAll?limit=500", { headers }),
          fetch("http://localhost:3000/api/responsible/ResponsibleAll?limit=500", { headers }),
        ]);

        const [weighingJson, responsibleJson] = await Promise.all([
          weighingRes.json(),
          responsibleRes.json(),
        ]);

        const weighingList: Weighing[] = weighingJson.info ?? [];
        const responsibles: Responsible[] = responsibleJson.info ?? [];

        const weighingsFormatted: Weighing[] = weighingList.map((w) => {
          const responsible = responsibles.find(
            (r) => String(r.idResponsible) === String(w.idResponsible),
          );

          return {
            ...w,
            responsibleData: responsible
              ? {
                  idResponsible: responsible.idResponsible,
                  fullName: responsible.fullName,
                  role: responsible.role,
                }
              : null,
          };
        });

        // Invertimos para que el más nuevo salga primero
        setWeighings([...weighingsFormatted].reverse());
      } catch (error) {
        console.error("Error:", error);
        setWeighings([]);
      }
    };
    fetchWeighings();
  }, []);

  return (
    <div className="w-full bg-white px-4 py-8">
      <div className="mx-auto w-full space-y-6">
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
          filterPlaceholder="Filtrar por ID de bovino..."
          toolbar={actions}
        />
      </div>
    </div>
  );
}