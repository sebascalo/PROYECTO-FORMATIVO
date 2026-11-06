
"use client";
import { useEffect, useState } from "react";

import { DataTable } from "@/components/ui/data-table";
import { getColumns, type Weighing } from "./columns";

import ButtonCreate from "../ui/buttonCreate";
import FormCreationWeighing from "./formCreationWeighing";

interface Responsible {
  idResponsible: number;
  fullName: string;
  role: string;
}

export default function TableWeighing() {
  const [weighings, setWeighings] = useState<Weighing[]>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedWeighing, setSelectedWeighing] = useState<Weighing | null>(null);

  useEffect(() => {
    const fetchWeighings = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = { Authorization: `Bearer ${token}` };

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

        setWeighings([...weighingsFormatted].reverse());
      } catch (error) {
        console.error("Error:", error);
        setWeighings([]);
      }
    };

    fetchWeighings();
  }, []);

  const handleOpenCreate = () => {
    setSelectedWeighing(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (weighing: Weighing) => {
    setSelectedWeighing(weighing);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedWeighing(null);
  };

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
          columns={getColumns(handleOpenEdit)}
          data={weighings}
          filterPlaceholder="Buscar en todos los campos..."
          toolbar={
            <ButtonCreate onClick={handleOpenCreate}>
              Crear Pesaje
            </ButtonCreate>
          }
        />

        <FormCreationWeighing
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSuccess={handleCloseModal}
          weighingToEdit={selectedWeighing}
        />
      </div>
    </div>
  );
}
