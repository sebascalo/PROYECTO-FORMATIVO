"use client";
import { useCallback, useEffect, useMemo, useState } from "react";

import { DataTable } from "@/components/ui/data-table";
import { getColumns, type User } from "./columns";
import FormCreationUser from "./formCreationUser";

interface TableUserProps {
  actions?: React.ReactNode;
  // Cambia cuando se crea un usuario desde fuera (page.tsx) para recargar la lista
  refreshKey?: number;
}

export default function TableUser({ actions, refreshKey = 0 }: TableUserProps) {
  const [users, setUsers] = useState<User[]>([]);

  // Estado de edición: qué usuario se edita y si el modal está abierto
  const [userToEdit, setUserToEdit] = useState<User | null>(null);
  const [editOpen, setEditOpen] = useState(false);
  const [localReload, setLocalReload] = useState(0);

  const handleEdit = useCallback((user: User) => {
    setUserToEdit(user);
    setEditOpen(true);
  }, []);

  const columns = useMemo(() => getColumns({ onEdit: handleEdit }), [handleEdit]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/user/UserAll");
        const resJson = await response.json();

        const datos = Array.isArray(resJson)
          ? resJson
          : Array.isArray(resJson.info)
            ? resJson.info
            : Array.isArray(resJson.data)
              ? resJson.data
              : Array.isArray(resJson.users)
                ? resJson.users
                : [];

        setUsers(datos);
      } catch (error) {
        console.error("Error:", error);
        setUsers([]);
      }
    };
    fetchUsers();
  }, [refreshKey, localReload]); // se vuelve a ejecutar al crear o editar

  return (
    <div className="w-full bg-white px-4 py-8">
      <div className="mx-auto w-full space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-[#2B2A26]">Usuarios</h1>
          <p className="text-sm text-[#6B6459]">
            {users.length}{" "}
            {users.length === 1
              ? "usuario registrado"
              : "usuarios registrados"}
            .
          </p>
        </div>

        <DataTable
          columns={columns}
          data={users}
          filterPlaceholder="Buscar en todos los campos..."
          toolbar={actions}
        />

        {/* Mismo formulario de creación, reutilizado en modo edición */}
        <FormCreationUser
          userToEdit={userToEdit}
          open={editOpen}
          onOpenChange={setEditOpen}
          onSuccess={() => setLocalReload((n) => n + 1)}
        />
      </div>
    </div>
  );
}