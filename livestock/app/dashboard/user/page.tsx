"use client";

import { useState } from "react";
import FormCreationUser from "@/components/user/formCreationUser";
import TableUser from "@/components/user/tableUser";

function UserPage() {
  // Al crear un usuario se incrementa y la tabla vuelve a pedir los datos
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <div className="flex flex-col w-full min-h-screen px-2 pb-2 pt-0 -mt-4 gap-2">
      <div className="w-full">
        <TableUser
          refreshKey={refreshKey}
          actions={
            <FormCreationUser onSuccess={() => setRefreshKey((n) => n + 1)} />
          }
        />
      </div>
    </div>
  );
}

export default UserPage;