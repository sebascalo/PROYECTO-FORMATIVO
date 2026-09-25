"use client";

import FormCreationMilk from "@/components/milk/formCreationMilk";
import TableMilk from "@/components/milk/tableMilk";

function MilkPage() {
  return (
    <div className="flex flex-col w-full min-h-screen px-2 pb-2 pt-0 -mt-4 gap-2">
      <div className="w-full">
        <TableMilk actions={<FormCreationMilk />} />
      </div>
    </div>
  );
}

export default MilkPage;