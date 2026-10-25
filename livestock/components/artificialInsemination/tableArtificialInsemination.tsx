"use client";
import { useEffect, useState } from "react";

import { DataTable } from "@/components/ui/data-table";
import { columns, type ArtificialInsemination } from "./columns";

interface TableArtificialInseminationProps {
  actions?: React.ReactNode;
}

interface Race { id_race: number; name_race: string; }
interface Responsible { idResponsible: number; fullName: string; role: string; }

export default function TableArtificialInsemination({ actions }: TableArtificialInseminationProps) {
  const [inseminations, setInseminations] = useState<ArtificialInsemination[]>([]);

  useEffect(() => {
    const fetchInseminations = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = { Authorization: `Bearer ${token}` };

        const [aiRes, raceRes, responsibleRes] = await Promise.all([
          fetch("http://localhost:3000/api/artificialInsemination/ArtificialInseminationAll?limit=500", { headers }),
          fetch("http://localhost:3000/api/race/RaceAll?limit=500", { headers }),
          fetch("http://localhost:3000/api/responsible/ResponsibleAll?limit=500", { headers }),
        ]);

        const [aiJson, raceJson, responsibleJson] = await Promise.all([
          aiRes.json(),
          raceRes.json(),
          responsibleRes.json(),
        ]);

        const aiList: ArtificialInsemination[] = Array.isArray(aiJson.info) ? aiJson.info : [];
        const races: Race[] = raceJson.info ?? [];
        const responsibles: Responsible[] = responsibleJson.info ?? [];

        const aiFormatted: ArtificialInsemination[] = aiList.map((a) => {
          const race = races.find((r) => String(r.id_race) === String(a.id_race));
          const responsible = responsibles.find((r) => String(r.idResponsible) === String(a.idResponsible));

          return {
            ...a,
            raceData: race ? { name_race: race.name_race } : null,
            responsibleData: responsible ? { idResponsible: responsible.idResponsible, fullName: responsible.fullName, role: responsible.role } : null,
          };
        });

        // 👇 Invertimos para que el último registro salga primero
        setInseminations([...aiFormatted].reverse());
      } catch (error) {
        console.error("Error:", error);
        setInseminations([]);
      }
    };
    fetchInseminations();
  }, []);

  return (
    <div className="w-full bg-white px-4 py-8">
      <div className="mx-auto w-full space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-[#2B2A26]">Inseminaciones Artificiales</h1>
          <p className="text-sm text-[#6B6459]">{inseminations.length} {inseminations.length === 1 ? "inseminación registrada" : "inseminaciones registradas"}.</p>
        </div>

        <DataTable
          columns={columns}
          data={inseminations}
          filterColumnId="id_madre"
          filterPlaceholder="Filtrar por ID de madre..."
          toolbar={actions}
        />
      </div>
    </div>
  );
}