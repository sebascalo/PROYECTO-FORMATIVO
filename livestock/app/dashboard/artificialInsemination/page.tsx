"use client";

import TableArtificialInsemination from "@/components/artificialInsemination/tableArtificialInsemination";

function ArtificialInseminationPage() {
  return (
    <div className="flex flex-col w-full min-h-screen px-2 pb-2 pt-0 -mt-4 gap-2">
      <div className="w-full">
        <TableArtificialInsemination />
      </div>
    </div>
  );
}

export default ArtificialInseminationPage;