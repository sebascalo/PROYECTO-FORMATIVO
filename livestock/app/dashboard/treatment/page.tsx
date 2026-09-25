"use client";

import FormCreationTreatment from "@/components/treatment/formCreationTreatment";
import TableTreatment from "@/components/treatment/tableTreatment";

function TreatmentPage() {
  return (
    <div className="flex flex-col w-full min-h-screen px-2 pb-2 pt-0 -mt-4 gap-2">
      <div className="w-full">
        <TableTreatment actions={<FormCreationTreatment />} />
      </div>
    </div>
  );
}

export default TreatmentPage;