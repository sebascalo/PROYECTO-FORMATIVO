"use client";
import { useEffect, useState } from "react";

import { DataTable } from "@/components/ui/data-table";
import { columns, type Birth } from "./columns";

interface TableBirthProps {
  actions?: React.ReactNode;
}

// 👇 Tipos mínimos para los catálogos
interface Cattle {
  id_Bovine: number;
  name: string;
}

interface Pasture {
  id_pasture: number;
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

export default function TableBirth({ actions }: TableBirthProps) {
  const [births, setBirths] = useState<Birth[]>([]);

  useEffect(() => {
    const fetchBirths = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = { Authorization: `Bearer ${token}` };

        // 👇 5 fetch en paralelo
        const [birthRes, cattleRes, pastureRes, raceRes, responsibleRes] =
          await Promise.all([
            fetch("http://localhost:3000/api/birth/BirthAll", { headers }),
            fetch("http://localhost:3000/api/cattle/CattleAll?limit=500", {
              headers,
            }),
            fetch("http://localhost:3000/api/pasture/PastureAll?limit=500", {
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

        const [birthJson, cattleJson, pastureJson, raceJson, responsibleJson] =
          await Promise.all([
            birthRes.json(),
            cattleRes.json(),
            pastureRes.json(),
            raceRes.json(),
            responsibleRes.json(),
          ]);

        const birthList: Birth[] = birthJson.info ?? [];
        const cattles: Cattle[] = cattleJson.info ?? [];
        const pastures: Pasture[] = pastureJson.info ?? [];
        const races: Race[] = raceJson.info ?? [];
        const responsibles: Responsible[] = responsibleJson.info ?? [];

        // 👇 "JOIN en memoria"
        const birthsFormatted: Birth[] = birthList.map((b) => {
          const cattle = cattles.find(
            (c) => String(c.id_Bovine) === String(b.id_Bovine),
          );
          const pasture = pastures.find(
            (p) => String(p.id_pasture) === String(b.id_pasture),
          );
          const race = races.find(
            (r) => String(r.id_race) === String(b.id_race),
          );
          const responsible = responsibles.find(
            (r) => r.idResponsible === b.idResponsible,
          );

          return {
            ...b,
            cattleData: cattle
              ? { id_Bovine: cattle.id_Bovine, name: cattle.name }
              : null,
            pastureData: pasture
              ? { id_pasture: pasture.id_pasture, name: pasture.name }
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

        setBirths(birthsFormatted);
      } catch (error) {
        console.error("Error:", error);
        setBirths([]);
      }
    };
    fetchBirths();
  }, []);

  return (
    <div className="min-h-screen bg-white px-6 py-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-[#2B2A26]">Nacimientos</h1>
          <p className="text-sm text-[#6B6459]">
            {births.length}{" "}
            {births.length === 1
              ? "nacimiento registrado"
              : "nacimientos registrados"}
            .
          </p>
        </div>

        <DataTable
          columns={columns}
          data={births}
          filterColumnId="id_Bovine"
          filterPlaceholder="Filtrar por madre..."
          toolbar={actions}
        />
      </div>
    </div>
  );
}