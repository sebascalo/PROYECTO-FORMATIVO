"use client";

import FormCreationRace from "@/components/race/formCreationRace";
import TableRace from "@/components/race/tableRace";

function RacePage() {
  return (
    <div className="flex flex-col w-full min-h-screen px-2 pb-2 pt-0 -mt-4 gap-2">
      <div className="w-full">
        <TableRace actions={<FormCreationRace />} />
      </div>
    </div>
  );
}

export default RacePage;