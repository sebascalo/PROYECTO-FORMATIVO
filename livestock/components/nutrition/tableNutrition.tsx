"use client";
import { useEffect, useState } from "react";

import { DataTable } from "@/components/ui/data-table";
import { columns, type Nutrition } from "./columns";

interface TableNutritionProps {
  actions?: React.ReactNode;
}

// 👇 Tipos mínimos para los catálogos
interface Cattle {
  id_Bovine: number;
  name: string;
}

interface Food {
  id_food: number;
  food_name: string;
  food_type: string;
}

interface Responsible {
  idResponsible: number;
  fullName: string;
  role: string;
}

export default function TableNutrition({ actions }: TableNutritionProps) {
  const [nutritions, setNutritions] = useState<Nutrition[]>([]);

  useEffect(() => {
    const fetchNutritions = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = { Authorization: `Bearer ${token}` };

        // 👇 Traer las 4 listas en paralelo
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
        const cattles: Cattle[] = cattleJson.info ?? [];
        const foods: Food[] = foodJson.info ?? [];
        const responsibles: Responsible[] = responsibleJson.info ?? [];

        // 👇 "JOIN en memoria"
        const nutritionFormatted: Nutrition[] = nutritionList.map((n) => {
          const cattle = cattles.find((c) => c.id_Bovine === n.id_Bovine);
          const food = foods.find((f) => f.id_food === n.id_food);
          const responsible = responsibles.find(
            (r) => r.idResponsible === n.idResponsible,
          );

          return {
            ...n,
            cattleData: cattle
              ? { id_Bovine: cattle.id_Bovine, name: cattle.name }
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

  return (
    <div className="min-h-screen bg-white px-6 py-8">
      <div className="mx-auto max-w-6xl space-y-6">
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
          columns={columns}
          data={nutritions}
          filterColumnId="id_Bovine"
          filterPlaceholder="Filtrar por bovino..."
          toolbar={actions}
        />
      </div>
    </div>
  );
}