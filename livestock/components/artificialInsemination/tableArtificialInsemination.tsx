"use client";

import { useCallback, useEffect, useState } from "react";
import { DataTable } from "@/components/ui/data-table";
import {
  getColumns,
  type ArtificialInsemination,
} from "./columns";
import FormCreationArtificialInsemination from "./formCreationArtificialInsemination";
import ButtonCreate from "../ui/buttonCreate";

interface Race {
  id_race: number;
  name_race: string;
}

interface Responsible {
  idResponsible: number;
  fullName: string;
  role: string;
}

export default function TableArtificialInsemination() {
  const [inseminations, setInseminations] = useState<
    ArtificialInsemination[]
  >([]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedInsemination, setSelectedInsemination] =
    useState<ArtificialInsemination | null>(null);

  const fetchInseminations = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };

      const [aiRes, raceRes, responsibleRes] = await Promise.all([
        fetch(
          "http://localhost:3000/api/artificialInsemination/ArtificialInseminationAll?limit=500",
          { headers },
        ),
        fetch("http://localhost:3000/api/race/RaceAll?limit=500", {
          headers,
        }),
        fetch(
          "http://localhost:3000/api/responsible/ResponsibleAll?limit=500",
          { headers },
        ),
      ]);

      const [aiJson, raceJson, responsibleJson] = await Promise.all([
        aiRes.json(),
        raceRes.json(),
        responsibleRes.json(),
      ]);

      if (!aiRes.ok) {
        throw new Error(
          aiJson?.message || "Error al cargar las inseminaciones",
        );
      }

      const aiList: ArtificialInsemination[] = Array.isArray(aiJson.info)
        ? aiJson.info
        : [];

      const races: Race[] = Array.isArray(raceJson.info)
        ? raceJson.info
        : [];

      const responsibles: Responsible[] = Array.isArray(
        responsibleJson.info,
      )
        ? responsibleJson.info
        : [];

      const aiFormatted = aiList.map((insemination) => {
        const race = races.find(
          (r) =>
            String(r.id_race) === String(insemination.id_race),
        );

        const responsible = responsibles.find(
          (r) =>
            String(r.idResponsible) ===
            String(insemination.idResponsible),
        );

        return {
          ...insemination,
          raceData: race
            ? { name_race: race.name_race }
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

      setInseminations([...aiFormatted].reverse());
    } catch (error) {
      console.error("Error al cargar inseminaciones:", error);
      setInseminations([]);
    }
  }, []);

  useEffect(() => {
    fetchInseminations();
  }, [fetchInseminations]);

  const handleOpenCreate = () => {
    setSelectedInsemination(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (record: ArtificialInsemination) => {
    setSelectedInsemination(record);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedInsemination(null);
  };

  return (
    <div className="w-full bg-white px-4 py-8">
      <div className="mx-auto w-full space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
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

          <ButtonCreate onClick={handleOpenCreate}>
            Agregar Inseminación
          </ButtonCreate>
        </div>

        <DataTable
          columns={getColumns(handleOpenEdit)}
          data={inseminations}
          filterPlaceholder="Buscar en todos los campos..."
        />

        <FormCreationArtificialInsemination
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSuccess={fetchInseminations}
          inseminationToEdit={selectedInsemination}
        />
      </div>
    </div>
  );
}