"use client";

import { createColumnHelper } from "@tanstack/react-table";
import { Pencil } from "lucide-react";
import { type SharedTableFeatures } from "@/components/ui/data-table-features";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";

// Forma de los datos que devuelve tu API (/api/user/UserAll)
export type User = {
  userId: number | string;
  name: string;
  email: string;
  documentId: string;
  id_roll?: number | string | null; // id del rol (puede ser NULL en usuarios antiguos)
  verifyEmail: boolean;
  active: boolean;
};
const ROLES_URL = "http://localhost:3000/api/roles";

// Colores por nombre de rol
const roleStyles: Record<string, string> = {
  administrador: "bg-[#4B6043] text-white hover:bg-[#405539]",
  instructor: "bg-[#8C8266] text-white hover:bg-[#77704F]",
  pasante: "bg-[#A9744F] text-white hover:bg-[#94623F]",
  gestor: "bg-[#6B6459] text-white hover:bg-[#5A5449]",
};

// Caché del módulo: aunque la tabla tenga muchas filas, solo se hace UNA
// petición a /api/roles y todas las filas reutilizan el resultado.
let rolesPromise: Promise<Record<number, string>> | null = null;

function loadRoles(): Promise<Record<number, string>> {
  if (!rolesPromise) {
    const token = localStorage.getItem("token");
    rolesPromise = fetch(ROLES_URL, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error(`Status ${res.status}`);
        return res.json();
      })
      .then((body) => {
        // Diccionario { 1: "Administrador", 2: "Instructor", ... }
        // (tu backend devuelve la lista en `info`)
        const map: Record<number, string> = {};
        (body?.info ?? []).forEach((r: { id: number; name: string }) => {
          map[r.id] = r.name;
        });
        return map;
      })
      .catch((err) => {
        console.error("Error cargando roles:", err);
        rolesPromise = null; // permite reintentar
        return {};
      });
  }
  return rolesPromise;
}

// Celda de la columna "Rol". Es un componente (y no una función suelta)
// porque necesita useState/useEffect para esperar a que lleguen los roles.
function RoleCell({ roleId }: { roleId?: number | string | null }) {
  const [name, setName] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    loadRoles().then((map) => {
      if (!active) return;
      setName(roleId != null && roleId !== "" ? (map[Number(roleId)] ?? null) : null);
    });
    return () => {
      active = false;
    };
  }, [roleId]);

  if (roleId == null || roleId === "") {
    return <span className="text-[#6B6459]">Sin rol</span>;
  }
  if (!name) return <span className="text-[#6B6459]">...</span>;

  return (
    <Badge className={roleStyles[name.toLowerCase()] ?? "bg-[#8C8266] text-white"}>
      {name}
    </Badge>
  );
}

const columnHelper = createColumnHelper<SharedTableFeatures, User>();

// export const columns = columnHelper.columns([
export const getColumns = (handleOpenEdit: (user: User) => void) => columnHelper.columns([
  columnHelper.accessor("name", {
    header: "Nombre",
    cell: ({ getValue }) => (
      <span className="font-medium text-[#2B2A26]">{getValue()}</span>
    ),
  }),
  columnHelper.accessor("email", {
    header: "Correo",
    cell: ({ getValue }) => (
      <span className="text-[#6B6459]">{getValue() || "-"}</span>
    ),
  }),
  columnHelper.accessor("documentId", {
    header: "Documento",
    cell: ({ getValue }) => (
      <span className="text-[#2B2A26] tabular-nums">
        {getValue() || "-"}
      </span>
    ),
  }),
  // CAMBIO: antes mostraba el número del rol; ahora muestra su nombre.
  columnHelper.accessor("id_roll", {
    header: "Rol",
    cell: ({ getValue }) => <RoleCell roleId={getValue()} />,
  }),
  columnHelper.accessor("verifyEmail", {
    header: "Verificación",
    cell: ({ getValue }) => {
      const isVerified = getValue() === true;
      return (
        <span className="inline-flex items-center gap-1.5 text-sm">
          <span
            className={`h-1.5 w-1.5 rounded-full ${isVerified ? "bg-[#4B6043]" : "bg-[#A9744F]"
              }`}
          />
          <span className={isVerified ? "text-[#2B2A26]" : "text-[#6B6459]"}>
            {isVerified ? "Verificado" : "No verificado"}
          </span>
        </span>
      );
    },
  }),
  columnHelper.accessor("active", {
    header: "Estado",
    cell: ({ getValue }) => {
      const isActive = getValue() === true;
      return (
        <span className="inline-flex items-center gap-1.5 text-sm">
          <span
            className={`h-1.5 w-1.5 rounded-full ${isActive ? "bg-[#4B6043]" : "bg-[#B0A896]"
              }`}
          />
          <span className={isActive ? "text-[#2B2A26]" : "text-[#6B6459]"}>
            {isActive ? "Activo" : "Inactivo"}
          </span>
        </span>
      );
    },
  }),
  columnHelper.display({
    id: "actions",
    header: "Acciones",
    cell: ({ row }) => (
      <button type="button"
        onClick={() => handleOpenEdit(row.original)}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#4B6043] bg-[#4B6043]/10 hover:bg-[#4B6043]/20 rounded-md transition-colors cursor-pointer"
      >
        <Pencil size={14} />
        Editar
      </button>
    )
  }),
]);