
"use client";

import { useEffect, useState } from "react";

import { DataTable } from "@/components/ui/data-table";
import { getColumns, type Food } from "./columns";

import ButtonCreate from "../ui/buttonCreate";
import FormCreationFood from "./formCreationFood";

export default function TableFood() {
  const [foods, setFoods] = useState<Food[]>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFood, setSelectedFood] = useState<Food | null>(null);

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/food/FoodAll",
        );

        const resJson = await response.json();

        setFoods(resJson.info ?? []);
      } catch (error) {
        console.error("Error:", error);
        setFoods([]);
      }
    };

    fetchFoods();
  }, []);

  // Abrir formulario para crear
  const handleOpenCreate = () => {
    setSelectedFood(null);
    setIsModalOpen(true);
  };

  // Abrir formulario para editar
  const handleOpenEdit = (food: Food) => {
    setSelectedFood(food);
    setIsModalOpen(true);
  };

  // Cerrar modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedFood(null);
  };

  return (
    <div className="w-full bg-white px-4 py-8">
      <div className="mx-auto w-full space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-[#2B2A26]">
            Alimentos
          </h1>

          <p className="text-sm text-[#6B6459]">
            {foods.length}{" "}
            {foods.length === 1
              ? "alimento registrado"
              : "alimentos registrados"}
            .
          </p>
        </div>

        <DataTable
          columns={getColumns(handleOpenEdit)}
          data={foods}
          filterPlaceholder="Buscar en todos los campos..."
          toolbar={
            <ButtonCreate onClick={handleOpenCreate}>
              Agregar Alimento
            </ButtonCreate>
          }
        />

        <FormCreationFood
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSuccess={handleCloseModal}
          foodToEdit={selectedFood}
        />
      </div>
    </div>
  );
}
