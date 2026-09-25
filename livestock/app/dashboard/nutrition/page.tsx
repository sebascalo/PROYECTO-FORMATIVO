"use client";

import FormCreationNutrition from "@/components/nutrition/formcreationNutrtion";
import TableNutrition from "@/components/nutrition/tableNutrition";

function NutritionPage() {
  return (
    <div className="flex flex-col w-full min-h-screen px-2 pb-2 pt-0 -mt-4 gap-2">
      <div className="w-full">
        <TableNutrition actions={<FormCreationNutrition />} />
      </div>
    </div>
  );
}

export default NutritionPage;