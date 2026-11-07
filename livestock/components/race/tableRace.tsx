"use client";

import { useEffect, useState } from "react";
import { DataTable } from "@/components/ui/data-table";
import { getColumns, type Race } from "./columns";
import ButtonCreate from "../ui/buttonCreate";
import FormCreationRace from "./formCreationRace";

export default function TableRace() {
  const [races, setRaces] = useState<Race[]>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRace, setSelectedRace] = useState<Race | null>(null);

  const fetchRaces = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:3000/api/race/RaceAll?limit=500",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const resJson = await response.json();

      const raceList: Race[] = Array.isArray(resJson.info)
        ? resJson.info
        : [];

      setRaces([...raceList].reverse());
    } catch (error) {
      console.error("Error:", error);
      setRaces([]);
    }
  };

  useEffect(() => {
    fetchRaces();
  }, []);

  const handleOpenCreate = () => {
    setSelectedRace(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (race: Race) => {
    setSelectedRace(race);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRace(null);
  };

  const handleSuccess = () => {
    handleCloseModal();
    fetchRaces();
  };

  return (
    <div className="w-full bg-white px-4 py-8">
      <div className="mx-auto w-full space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-[#2B2A26]">
            Razas
          </h1>

          <p className="text-sm text-[#6B6459]">
            {races.length}{" "}
            {races.length === 1
              ? "raza registrada"
              : "razas registradas"}
            .
          </p>
        </div>

        <DataTable
          columns={getColumns(handleOpenEdit)}
          data={races}
          filterPlaceholder="Buscar en todos los campos..."
          toolbar={
            <ButtonCreate onClick={handleOpenCreate}>
              Agregar Raza
            </ButtonCreate>
          }
        />

        <FormCreationRace
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSuccess={handleSuccess}
          raceToEdit={selectedRace}
        />
      </div>
    </div>
  );
}
