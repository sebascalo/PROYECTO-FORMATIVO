"use client";

import { useState } from "react";

function FormCreationUser() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        documentId: "",
        postJob: ""
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        setMessage("");

        try {
            const response = await fetch(
                "http://localhost:3000/api/user/CreateUser",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(formData)
                }
            );

            const data = await response.json();

            if (!response.ok) {
                setMessage(
                    data.message || "Error al crear el usuario"
                );
                return;
            }

            setMessage("Usuario creado exitosamente");

            // Limpiar formulario
            setFormData({
                name: "",
                email: "",
                password: "",
                documentId: "",
                postJob: ""
            });

        } catch (error) {
            console.error("Error al crear usuario:", error);
            setMessage("No se pudo conectar con el servidor");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-lg mx-auto bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2">
                Crear Usuario
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">

                <div>
                    <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Nombre:
                    </label>

                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Ej: Juan Pérez"
                    />
                </div>

                <div>
                    <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Correo:
                    </label>

                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="ejemplo@correo.com"
                    />
                </div>

                <div>
                    <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Contraseña:
                    </label>

                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="********"
                    />
                </div>

                <div>
                    <label
                        htmlFor="documentId"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Documento:
                    </label>

                    <input
                        type="text"
                        id="documentId"
                        name="documentId"
                        value={formData.documentId}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="123456789"
                    />
                </div>

                <div>
                    <label
                        htmlFor="postJob"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Cargo:
                    </label>

                    <select
                        id="postJob"
                        name="postJob"
                        value={formData.postJob}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                    >
                        <option value="">Seleccione un cargo</option>
                        <option value="administrador">Administrador</option>
                        <option value="veterinaria">Veterinario</option>
                        <option value="operario">Operario</option>
                        <option value="gerente">Gerente</option>
                        <option value="asistente">Asistente</option>
                    </select>
                </div>

                {message && (
                    <div className="p-3 bg-gray-100 rounded-md text-sm">
                        {message}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                >
                    {loading ? "Guardando..." : "Guardar Usuario"}
                </button>

            </form>
        </div>
    );
}

export default FormCreationUser;

