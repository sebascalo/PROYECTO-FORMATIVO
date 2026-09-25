"use client";

import FormCreationBovine from "@/components/cattle/formCreationBovine";
import TableBovine from "@/components/cattle/tableBovine";

function CattlePage() {
  return (
    <div className="flex flex-col w-full min-h-screen px-2 pb-2 pt-0 -mt-4 gap-2">
      <div className="w-full">
        <TableBovine actions={<FormCreationBovine />} />
      </div>
    </div>
  );
}

export default CattlePage;