"use client";

import FormCreationResponsible from "@/components/responsible/formCreationResponsible";
import TableResponsible from "@/components/responsible/tableResponsible";

function ResponsiblePage() {
  return (
    <div className="flex flex-col w-full min-h-screen px-2 pb-2 pt-0 -mt-4 gap-2">
      <div className="w-full">
        <TableResponsible actions={<FormCreationResponsible />} />
      </div>
    </div>
  );
}

export default ResponsiblePage;