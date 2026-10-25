"use client";
import { useEffect, useState } from "react";

import { DataTable } from "@/components/ui/data-table";
import { columns, type Mount } from "./columns";

interface TableMountProps {
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

export default function TableMount({ actions }: TableMountProps) {
  const [mounts, setMounts] = useState<Mount[]>([]);

  useEffect(() => {
    const fetchMounts = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = { Authorization: `Bearer ${token}` };

        const [mountRes, cattleRes, responsibleRes] = await Promise.all([
          fetch("http://localhost:3000/api/mount/MountAll?limit=500", {
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

        const [mountJson, cattleJson, responsibleJson] = await Promise.all([
          mountRes.json(),
          cattleRes.json(),
          responsibleRes.json(),
        ]);

        const mountList: Mount[] = mountJson.info ?? [];
        const cattles: Cattle[] = cattleJson.info ?? [];
        const responsibles: Responsible[] = responsibleJson.info ?? [];

        const mountsFormatted: Mount[] = mountList.map((m) => {
          const cow = cattles.find(
            (c) => String(c.id_Bovine) === String(m.id_cow),
          );
          const bull = cattles.find(
            (c) => String(c.id_Bovine) === String(m.id_bull),
          );
          const responsible = responsibles.find(
            (r) => String(r.idResponsible) === String(m.idResponsible),
          );

          return {
            ...m,
            cowData: cow
              ? { id_Bovine: cow.id_Bovine, name: cow.name }
              : null,
            bullData: bull
              ? { id_Bovine: bull.id_Bovine, name: bull.name }
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

        setMounts([...mountsFormatted].reverse());
      } catch (error) {
        console.error("Error:", error);
        setMounts([]);
      }
    };
    fetchMounts();
  }, []);

  return (
    <div className="w-full bg-white px-4 py-8">
      <div className="mx-auto w-full space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-[#2B2A26]">
            Montas Naturales
          </h1>
          <p className="text-sm text-[#6B6459]">
            {mounts.length}{" "}
            {mounts.length === 1 ? "monta registrada" : "montas registradas"}.
          </p>
        </div>

        <DataTable
          columns={columns}
          data={mounts}
          filterPlaceholder="Buscar en todos los campos..."
          toolbar={actions}
        />
      </div>
    </div>
  );
}