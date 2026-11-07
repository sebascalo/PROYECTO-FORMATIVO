
"use client";

import TableMount from "@/components/mount/tableMount";

function MountPage() {
  return (
    <div className="flex flex-col w-full min-h-screen px-2 pb-2 pt-0 -mt-4 gap-2">
      <div className="w-full">
        <TableMount />
      </div>
    </div>
  );
}

export default MountPage;
