"use client";

import { useEffect, useState } from "react";

import { DataTable } from "@/components/ui/data-table";
import { getColumns, type Cattle } from "./columns";

import ButtonCreate from "../ui/buttonCreate";
import FormCreationCattle from "./formCreationBovine";

interface Race {
  id_race: number;
  name_race: string;
}

export default function TableCattle() {
  const [cattles, setCattles] = useState<Cattle[]>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCattle, setSelectedCattle] = useState<Cattle | null>(null);

  // Consultar bovinos y razas
  const fetchCattles = async () => {
    try {
      const token = localStorage.getItem("token");

      const headers = {
        Authorization: `Bearer ${token}`,
      };

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

      if (!cattleRes.ok) {
        throw new Error(cattleJson?.message || "Error al obtener bovinos");
      }

      if (!raceRes.ok) {
        throw new Error(raceJson?.message || "Error al obtener razas");
      }

      const cattleList: Cattle[] = Array.isArray(cattleJson)
        ? cattleJson
        : cattleJson.info ?? cattleJson.data ?? [];

      const races: Race[] = Array.isArray(raceJson)
        ? raceJson
        : raceJson.info ?? raceJson.data ?? [];

      const cattlesFormatted: Cattle[] = cattleList.map((c) => {
        const race = races.find(
          (r) => String(r.id_race) === String(c.id_race)
        );

        const father = cattleList.find(
          (item) => String(item.id_Bovine) === String(c.id_father)
        );

        const mother = cattleList.find(
          (item) => String(item.id_Bovine) === String(c.id_mother)
        );

        return {
          ...c,

          raceData: race
            ? {
                id_race: race.id_race,
                name_race: race.name_race,
              }
            : null,

          fatherData: father
            ? {
                id_Bovine: father.id_Bovine,
                name: father.name,
              }
            : null,

          motherData: mother
            ? {
                id_Bovine: mother.id_Bovine,
                name: mother.name,
              }
            : null,
        };
      });

      setCattles([...cattlesFormatted].reverse());

    } catch (error) {
      console.error("Error:", error);
      setCattles([]);
    }
  };

  // Cargar bovinos al iniciar
  useEffect(() => {
    fetchCattles();
  }, []);

  // Abrir formulario para crear
  const handleOpenCreate = () => {
    setSelectedCattle(null);
    setIsModalOpen(true);
  };

  // Abrir formulario para editar
  const handleOpenEdit = (cattle: Cattle) => {
    setSelectedCattle(cattle);
    setIsModalOpen(true);
  };

  // Cerrar formulario
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCattle(null);
  };

  // Actualizar tabla después de guardar
  const handleSuccess = async () => {
    await fetchCattles();
  };

  return (
    <div className="w-full bg-white px-4 py-8">
      <div className="mx-auto w-full space-y-6">

        <div>
          <h1 className="text-2xl font-semibold text-[#2B2A26]">
            Bovinos
          </h1>

          <p className="text-sm text-[#6B6459]">
            {cattles.length}{" "}
            {cattles.length === 1
              ? "animal registrado"
              : "animales registrados"}
            .
          </p>
        </div>

        <DataTable
          columns={getColumns(handleOpenEdit)}
          data={cattles}
          filterPlaceholder="Buscar en todos los campos..."
          toolbar={
            <ButtonCreate onClick={handleOpenCreate}>
              Agregar Bovino
            </ButtonCreate>
          }
        />

        <FormCreationCattle
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSuccess={handleSuccess}
          cattleToEdit={selectedCattle}
        />

      </div>
    </div>
  );
}