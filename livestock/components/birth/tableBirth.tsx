"use client";

import { useEffect, useState } from "react";

import { DataTable } from "@/components/ui/data-table";
import { getColumns, type Birth } from "./columns";
import FormCreationBirth from "./formCreationBirth";

interface Race {
  id_race: number;
  name_race: string;
}

interface Responsible {
  idResponsible: number;
  fullName: string;
  role: string;
}

export default function TableBirth() {
  const [births, setBirths] = useState<Birth[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [birthToEdit, setBirthToEdit] = useState<Birth | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  // Consultar los partos
  useEffect(() => {
    const fetchBirths = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const [birthRes, raceRes, responsibleRes] = await Promise.all([
          fetch("http://localhost:3000/api/birth/BirthAll?limit=500", {
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

        const [birthJson, raceJson, responsibleJson] = await Promise.all([
          birthRes.json(),
          raceRes.json(),
          responsibleRes.json(),
        ]);

        if (!birthRes.ok) {
          throw new Error("Error al cargar los partos");
        }

        if (!raceRes.ok) {
          throw new Error("Error al cargar las razas");
        }

        if (!responsibleRes.ok) {
          throw new Error("Error al cargar los responsables");
        }

        const birthList: Birth[] = Array.isArray(birthJson.info)
          ? birthJson.info
          : [];

        const races: Race[] = raceJson.info ?? [];
        const responsibles: Responsible[] = responsibleJson.info ?? [];

        const birthsFormatted: Birth[] = birthList.map((b) => {
          const race = races.find(
            (r) => String(r.id_race) === String(b.id_race),
          );

          const responsible = responsibles.find(
            (r) =>
              String(r.idResponsible) === String(b.idResponsible),
          );

          return {
            ...b,
            raceData: race
              ? {
                  id_race: race.id_race,
                  name_race: race.name_race,
                }
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

        setBirths([...birthsFormatted].reverse());
      } catch (error) {
        console.error("Error:", error);
        setBirths([]);
      }
    };

    fetchBirths();
  }, [refreshKey]);

  // Abrir formulario para crear
  const handleOpenCreate = () => {
    setBirthToEdit(null);
    setIsModalOpen(true);
  };

  // Abrir formulario para editar
  const handleOpenEdit = (birth: Birth) => {
    setBirthToEdit(birth);
    setIsModalOpen(true);
  };

  // Cerrar formulario
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setBirthToEdit(null);
  };

  // Actualizar tabla después de guardar
  const handleSuccess = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div className="w-full bg-white px-4 py-8">
      <div className="mx-auto w-full space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-[#2B2A26]">
            Partos
          </h1>

          <p className="text-sm text-[#6B6459]">
            {births.length}{" "}
            {births.length === 1
              ? "parto registrado"
              : "partos registrados"}
            .
          </p>
        </div>

        <DataTable
          columns={getColumns(handleOpenEdit)}
          data={births}
          filterPlaceholder="Buscar en todos los campos..."
          toolbar={
            <FormCreationBirth
              isOpen={isModalOpen}
              onOpen={handleOpenCreate}
              onClose={handleCloseModal}
              onSuccess={handleSuccess}
              birthToEdit={birthToEdit}
            />
          }
        />
      </div>
    </div>
  );
}