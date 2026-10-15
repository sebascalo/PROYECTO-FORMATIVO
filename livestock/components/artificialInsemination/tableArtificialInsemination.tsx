"use client";
import { useEffect, useState } from "react";

import { DataTable } from "@/components/ui/data-table";
import { columns, type ArtificialInsemination } from "./columns";

interface TableArtificialInseminationProps {
  actions?: React.ReactNode;
}

interface Cattle {
  id_Bovine: number;
  name: string;
}

interface Race {
  id_race: number;
  name_race: string;
}

interface Responsible {
  idResponsible: number;
  fullName: string;
  role: string;
}

export default function TableArtificialInsemination({
  actions,
}: TableArtificialInseminationProps) {
  const [inseminations, setInseminations] = useState<ArtificialInsemination[]>(
    [],
  );

  useEffect(() => {
    const fetchInseminations = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = { Authorization: `Bearer ${token}` };

        const [aiRes, cattleRes, raceRes, responsibleRes] = await Promise.all([
          fetch(
            "http://localhost:3000/api/artificialInsemination/ArtificialInseminationAll?limit=500",
            { headers },
          ),
          fetch("http://localhost:3000/api/cattle/CattleAll?limit=500", {
            headers,
          }),
          fetch("http://localhost:3000/api/race/RaceAll?limit=500", {
            headers,
          }),
          fetch(
            "http://localhost:3000/api/responsible/ResponsibleAll?limit=500",
            { headers },
          ),
        ]);

        const [aiJson, cattleJson, raceJson, responsibleJson] =
          await Promise.all([
            aiRes.json(),
            cattleRes.json(),
            raceRes.json(),
            responsibleRes.json(),
          ]);

        const aiList: ArtificialInsemination[] = aiJson.info ?? [];
        const cattles: Cattle[] = cattleJson.info ?? [];
        const races: Race[] = raceJson.info ?? [];
        const responsibles: Responsible[] = responsibleJson.info ?? [];

        const aiFormatted: ArtificialInsemination[] = aiList.map((a) => {
          const cattle = cattles.find(
            (c) => String(c.id_Bovine) === String(a.id_Bovine),
          );
          const race = races.find(
            (r) => String(r.id_race) === String(a.id_race),
          );
          const responsible = responsibles.find(
            (r) => String(r.idResponsible) === String(a.idResponsible),
          );

          return {
            ...a,
            cattleData: cattle
              ? { id_Bovine: cattle.id_Bovine, name: cattle.name }
              : null,
            raceData: race
              ? { id_race: race.id_race, name_race: race.name_race }
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

        setInseminations(aiFormatted);
      } catch (error) {
        console.error("Error:", error);
        setInseminations([]);
      }
    };
    fetchInseminations();
  }, []);

  return (
    <div className="min-h-screen bg-white px-6 py-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-[#2B2A26]">
            Inseminaciones Artificiales
          </h1>
          <p className="text-sm text-[#6B6459]">
            {inseminations.length}{" "}
            {inseminations.length === 1
              ? "inseminación registrada"
              : "inseminaciones registradas"}
            .
          </p>
        </div>

        <DataTable
          columns={columns}
          data={inseminations}
          filterColumnId="id_Bovine"
          filterPlaceholder="Filtrar por bovino..."
          toolbar={actions}
        />
      </div>
    </div>
  );
}