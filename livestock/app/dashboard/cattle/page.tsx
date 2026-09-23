"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import FormCreationBovine from "@/components/cattle/formCreationBovine";
import TableBovine from "@/components/cattle/tableBovine";

function CattlePage() {
  const [search, setSearch] = useState("");

  return (
    <div className="flex flex-col w-full min-h-screen px-2 pb-2 pt-0 -mt-4 gap-2">
      {/* Barra superior: buscador a la izquierda, botón a la derecha */}
      <div className="flex items-center justify-between w-full gap-4">
        <Input
          placeholder="Buscar bovinos..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
        <FormCreationBovine />
      </div>

      <div className="flex justify-center w-full">
        <div className="w-full">
          <TableBovine globalFilter={search} />
        </div>
      </div>
    </div>
  );
}

export default CattlePage;