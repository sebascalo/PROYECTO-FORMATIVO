"use client";
import { useEffect, useState } from "react";

export default function tableResponsible() {
    const [responsibles, setResponsibles] = useState([]);

    useEffect(() => {
        const fetchResponsibles = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/responsible/ResponsibleAll');
                let resJson = await response.json();
                setResponsibles(resJson.info);
            } catch (error) {
                console.error('Error:', error);
                setResponsibles([]);
            }
        }
        fetchResponsibles();
    }, []);

    return (
        <div className="overflow-x-auto shadow-lg rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gradient-to-r from-blue-500 to-blue-700">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Nombre Completo</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Rol</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Email</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Teléfono</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Estado</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {responsibles.map((responsible: any) => (
                        <tr key={responsible.id}>
                            <td className="px-6 py-4 whitespace-nowrap">{responsible.id}</td>
                            <td className="px-6 py-4 whitespace-nowrap font-medium">{responsible.fullName}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                    responsible.role === 'Veterinario' ? 'bg-blue-100 text-blue-800' :
                                    responsible.role === 'Administrador' ? 'bg-purple-100 text-purple-800' :
                                    responsible.role === 'Operario' ? 'bg-green-100 text-green-800' :
                                    responsible.role === 'Gerente' ? 'bg-yellow-100 text-yellow-800' :
                                    'bg-gray-100 text-gray-800'
                                }`}>
                                    {responsible.role}
                                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">{responsible.email}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{responsible.phoneNumber || '-'}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                    responsible.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                }`}>
                                    {responsible.status === 'Active' ? 'Activo' : 'Inactivo'}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}