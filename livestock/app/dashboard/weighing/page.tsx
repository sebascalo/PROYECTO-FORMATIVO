"use client";

import FormCreationWeighing from "@/components/weighing/formCreationWeighing";
import TableWeighing from "@/components/weighing/tableWeighing";

function WeighingPage() {
  return (
    <div className="flex flex-col w-full min-h-screen px-2 pb-2 pt-0 -mt-4 gap-2">
      <div className="w-full">
        <TableWeighing actions={<FormCreationWeighing />} />
      </div>
    </div>
  );
}

export default WeighingPage;