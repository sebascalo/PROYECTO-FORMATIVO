"use client";

import FormCreationMortality from "@/components/mortality/formCreationMortality";
import TableMortality from "@/components/mortality/tableMortality";

function MortalityPage() {
  return (
    <div className="flex flex-col w-full min-h-screen px-2 pb-2 pt-0 -mt-4 gap-2">
      <div className="w-full">
        <TableMortality actions={<FormCreationMortality />} />
      </div>
    </div>
  );
}

export default MortalityPage;