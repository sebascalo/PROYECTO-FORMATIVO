
"use client";

import { useEffect, useState } from "react";

import { DataTable } from "@/components/ui/data-table";
import { getColumns, type Nutrition } from "./columns";

import ButtonCreate from "../ui/buttonCreate";
import FormCreationNutrition from "./formcreationNutrtion";

export default function TableNutrition() {
  const [nutritions, setNutritions] = useState<Nutrition[]>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNutrition, setSelectedNutrition] =
    useState<Nutrition | null>(null);

  useEffect(() => {
    const fetchNutritions = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = { Authorization: `Bearer ${token}` };

        // Traer las 4 listas en paralelo
        const [nutritionRes, cattleRes, foodRes, responsibleRes] =
          await Promise.all([
            fetch("http://localhost:3000/api/nutrition/NutritionAll", {
              headers,
            }),
            fetch("http://localhost:3000/api/cattle/CattleAll?limit=500", {
              headers,
            }),
            fetch("http://localhost:3000/api/food/FoodAll?limit=500", {
              headers,
            }),
            fetch(
              "http://localhost:3000/api/responsible/ResponsibleAll?limit=500",
              { headers },
            ),
          ]);

        const [nutritionJson, cattleJson, foodJson, responsibleJson] =
          await Promise.all([
            nutritionRes.json(),
            cattleRes.json(),
            foodRes.json(),
            responsibleRes.json(),
          ]);

        const nutritionList: Nutrition[] = nutritionJson.info ?? [];
        const cattles = cattleJson.info ?? [];
        const foods = foodJson.info ?? [];
        const responsibles = responsibleJson.info ?? [];

        // JOIN en memoria
        const nutritionFormatted: Nutrition[] = nutritionList.map((n) => {
          const cattle = cattles.find(
            (c: { id_Bovine: number }) => c.id_Bovine === n.id_Bovine,
          );

          const food = foods.find(
            (f: { id_food: number }) => f.id_food === n.id_food,
          );

          const responsible = responsibles.find(
            (r: { idResponsible: number }) =>
              r.idResponsible === n.idResponsible,
          );

          return {
            ...n,
            cattleData: cattle
              ? {
                  id_Bovine: cattle.id_Bovine,
                  name: cattle.name,
                }
              : null,

            foodData: food
              ? {
                  id_food: food.id_food,
                  food_name: food.food_name,
                  food_type: food.food_type,
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

        setNutritions(nutritionFormatted);
      } catch (error) {
        console.error("Error:", error);
        setNutritions([]);
      }
    };

    fetchNutritions();
  }, []);

  // Abrir formulario para crear
  const handleOpenCreate = () => {
    setSelectedNutrition(null);
    setIsModalOpen(true);
  };

  // Abrir formulario para editar
  const handleOpenEdit = (nutrition: Nutrition) => {
    setSelectedNutrition(nutrition);
    setIsModalOpen(true);
  };

  // Cerrar modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedNutrition(null);
  };

  return (
    <div className="w-full bg-white px-4 py-8">
      <div className="mx-auto w-full space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-[#2B2A26]">
            Nutriciones
          </h1>

          <p className="text-sm text-[#6B6459]">
            {nutritions.length}{" "}
            {nutritions.length === 1
              ? "nutrición registrada"
              : "nutriciones registradas"}
            .
          </p>
        </div>

        <DataTable
          columns={getColumns(handleOpenEdit)}
          data={nutritions}
          filterPlaceholder="Buscar en todos los campos..."
          toolbar={
            <ButtonCreate onClick={handleOpenCreate}>
              Agregar Nutrición
            </ButtonCreate>
          }
        />

        <FormCreationNutrition
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSuccess={handleCloseModal}
          nutritionToEdit={selectedNutrition}
        />
      </div>
    </div>
  );
}
