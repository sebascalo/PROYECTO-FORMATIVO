
"use client";

import TableResponsible from "@/components/responsible/tableResponsible";

function ResponsiblePage() {
  return (
    <div className="flex flex-col w-full min-h-screen px-2 pb-2 pt-0 -mt-4 gap-2">
      <div className="w-full">
        <TableResponsible />
      </div>
    </div>
  );
}

export default ResponsiblePage;
