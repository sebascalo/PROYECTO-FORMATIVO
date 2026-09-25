"use client";

import FormCreationVacunation from "@/components/vacunation/formCreationVacunation";
import TableVacunation from "@/components/vacunation/tableVacunation";

function VacunationPage() {
  return (
    <div className="flex flex-col w-full min-h-screen px-2 pb-2 pt-0 -mt-4 gap-2">
      <div className="w-full">
        <TableVacunation actions={<FormCreationVacunation />} />
      </div>
    </div>
  );
}

export default VacunationPage;