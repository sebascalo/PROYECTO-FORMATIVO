"use client";
import { useEffect, useState } from "react";

import { DataTable } from "@/components/ui/data-table";
import { columns, type Food } from "./columns";

interface TableFoodProps {
  actions?: React.ReactNode;
}

export default function TableFood({ actions }: TableFoodProps) {
  const [foods, setFoods] = useState<Food[]>([]);

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

  return (
    <div className="min-h-screen bg-white px-6 py-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-[#2B2A26]">Alimentos</h1>
          <p className="text-sm text-[#6B6459]">
            {foods.length}{" "}
            {foods.length === 1
              ? "alimento registrado"
              : "alimentos registrados"}
            .
          </p>
        </div>

        <DataTable
          columns={columns}
          data={foods}
          filterColumnId="food_name"
          filterPlaceholder="Filtrar por nombre..."
          toolbar={actions}
        />
      </div>
    </div>
  );
}