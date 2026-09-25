"use client";
import { useEffect, useState } from "react";

import { DataTable } from "@/components/ui/data-table";
import { columns, type User } from "./columns";

interface TableUserProps {
  actions?: React.ReactNode;
}

export default function TableUser({ actions }: TableUserProps) {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/user/UserAll",
        );
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
  }, []);

  return (
    <div className="min-h-screen bg-white px-6 py-8">
      <div className="mx-auto max-w-6xl space-y-6">
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
          filterColumnId="name"
          filterPlaceholder="Filtrar por nombre..."
          toolbar={actions}
        />
      </div>
    </div>
  );
}