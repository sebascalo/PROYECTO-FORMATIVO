"use client";
import { useCallback, useEffect, useMemo, useState } from "react";

import { DataTable } from "@/components/ui/data-table";
import { getColumns, type User } from "./columns";

import ButtonCreate from "../ui/buttonCreate";
import FormCreationUser from "./formCreationUser";

// interface TableUserProps {
//   actions?: React.ReactNode;
// }

export default function TableUser() {
  const [users, setUsers] = useState<User[]>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

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

  const handleOpenCreate = () => {
    // Implementation for opening create user form
    setSelectedUser(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (user: User) => {
    // Implementation for opening edit user form
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  }

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
          columns={getColumns(handleOpenEdit)}
          data={users}
          filterPlaceholder="Buscar en todos los campos..."
          toolbar={
            <ButtonCreate onClick={handleOpenCreate}>
              Crear Usuario
            </ButtonCreate>
          }
        />
        <FormCreationUser
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSuccess = {handleCloseModal}
        userToEdit={selectedUser}
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