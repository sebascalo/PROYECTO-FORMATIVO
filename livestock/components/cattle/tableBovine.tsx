"use client";
import { useEffect, useState } from "react";
import { DataTable } from "@/components/ui/data-table";
import { columns, type Cattle } from "./columns";

interface TableCattleProps {
  actions?: React.ReactNode;
}

interface Race {
  id_race: number;
  name_race: string;
}

export default function TableCattle({ actions }: TableCattleProps) {
  const [cattles, setCattles] = useState<Cattle[]>([]);

  useEffect(() => {
    const fetchCattles = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = { Authorization: `Bearer ${token}` };

        const [cattleRes, raceRes] = await Promise.all([
          fetch("http://localhost:3000/api/cattle/CattleAll?limit=500", {
            headers,
          }),
          fetch("http://localhost:3000/api/race/RaceAll?limit=500", {
            headers,
          }),
        ]);

        const [cattleJson, raceJson] = await Promise.all([
          cattleRes.json(),
          raceRes.json(),
        ]);

        const cattleList: Cattle[] = cattleJson.info ?? [];
        const races: Race[] = raceJson.info ?? [];
        const cattlesFormatted: Cattle[] = cattleList.map((c): Cattle => {
          const race = races.find(
            (r) => String(r.id_race) === String(c.id_race),
          );
          const father = cattleList.find(
            (item) => item.id_Bovine === c.id_father,
          );
          const mother = cattleList.find(
            (item) => item.id_Bovine === c.id_mother,
          );

          return {
            ...c,
            raceData: race
              ? { id_race: race.id_race, name_race: race.name_race }
              : null,
            fatherData: father
              ? { id_Bovine: Number(father.id_Bovine), name: father.name }
              : null,
            motherData: mother
              ? { id_Bovine: Number(mother.id_Bovine), name: mother.name }
              : null,
          };
        });

        // 👇 Invertimos el arreglo para que el más nuevo salga primero
        setCattles([...cattlesFormatted].reverse());
      } catch (error) {
        console.error("Error:", error);
        setCattles([]);
      }
    };
    fetchCattles();
  }, []);

  return (
    <div className="min-h-screen bg-white px-6 py-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-[#2B2A26]">Bovinos</h1>
          <p className="text-sm text-[#6B6459]">
            {cattles.length}{" "}
            {cattles.length === 1
              ? "animal registrado"
              : "animales registrados"}
            .
          </p>
        </div>

        <DataTable
          columns={columns}
          data={cattles}
          filterColumnId="name"
          filterPlaceholder="Filtrar por nombre..."
          toolbar={actions}
        />
      </div>
    </div>
  );
}