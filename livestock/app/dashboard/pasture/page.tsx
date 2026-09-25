"use client";

import FormCreationPasture from "@/components/pasture/formCreationPasture";
import TablePasture from "@/components/pasture/tablePasture";

function PasturePage() {
  return (
    <div className="flex flex-col w-full min-h-screen px-2 pb-2 pt-0 -mt-4 gap-2">
      <div className="w-full">
        <TablePasture actions={<FormCreationPasture />} />
      </div>
    </div>
  );
}

export default PasturePage;