"use client";
import { useEffect, useState } from "react";

export default function tableUser() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/user/UserAll');
                let resJson = await response.json();
                
                // 👇 ESTO TE AYUDARÁ A VER QUÉ DEVUELVE LA API EN LA CONSOLA (F12)
                console.log("Respuesta completa de la API de usuarios:", resJson);

                // 👇 LÓGICA DE EXTRACCIÓN BLINDADA
                // Busca los datos en las propiedades más comunes. Si no encuentra, deja un arreglo vacío.
                let datos = [];
                
                if (Array.isArray(resJson)) {
                    datos = resJson; // Caso 1: La API devuelve [ {...}, {...} ]
                } else if (resJson && Array.isArray(resJson.info)) {
                    datos = resJson.info; // Caso 2: La API devuelve { info: [ ... ] }
                } else if (resJson && Array.isArray(resJson.data)) {
                    datos = resJson.data; // Caso 3: La API devuelve { data: [ ... ] }
                } else if (resJson && Array.isArray(resJson.users)) {
                    datos = resJson.users; // Caso 4: La API devuelve { users: [ ... ] }
                }

                setUsers(datos);
                
            } catch (error) {
                console.error('Error en la petición:', error);
                setUsers([]);
            }
        }
        fetchUser();
    }, []);

    return (
        <div className="overflow-x-auto shadow-lg rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gradient-to-r from-blue-500 to-blue-700">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Nombre</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Correo</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Documento</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Cargo</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Verificación Email</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Activo</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {/* Validamos que users sea un arreglo y tenga elementos */}
                    {users && users.length > 0 ? (
                        users.map((user: any) => (
                            <tr key={user.userId}>
                                <td className="px-6 py-4 whitespace-nowrap">{user.userId}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{user.documentId}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{user.postJob}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {user.verifyEmail ? 'Verificado' : 'No verificado'}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {user.active ? 'Activo' : 'Inactivo'}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                                No hay usuarios disponibles.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}