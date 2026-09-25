"use client";

import FormCreationFood from "@/components/food/formCreationFood";
import TableFood from "@/components/food/tableFood";

function FoodPage() {
  return (
    <div className="flex flex-col w-full min-h-screen px-2 pb-2 pt-0 -mt-4 gap-2">
      <div className="w-full">
        <TableFood actions={<FormCreationFood />} />
      </div>
    </div>
  );
}

export default FoodPage;