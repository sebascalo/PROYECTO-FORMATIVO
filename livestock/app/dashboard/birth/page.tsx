"use client";

import FormCreationBirth from "@/components/birth/formCreationBirth";
import TableBirth from "@/components/birth/tableBirth";

function BirthPage() {
  return (
    <div className="flex flex-col w-full min-h-screen px-2 pb-2 pt-0 -mt-4 gap-2">
      <div className="w-full">
        <TableBirth actions={<FormCreationBirth />} />
      </div>
    </div>
  );
}

export default BirthPage;