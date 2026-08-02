"use client";
import { useEffect, useState } from "react";

export default function tablePasture() {
    const [pastures, setPastures] = useState([]);

    useEffect(() => {
        const fetchPastures = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/pasture/PastureAll');
                let resJson = await response.json();
                setPastures(resJson.info);
            } catch (error) {
                console.error('Error:', error);
                setPastures([]);
            }
        }
        fetchPastures();
    }, []);

    return (
        <div className="overflow-x-auto shadow-lg rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gradient-to-r from-blue-500 to-blue-700">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Nombre</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Extensión (Ha)</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Capacidad Máx</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Tipo</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Estado</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Días Descanso</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Días Ocupación</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Activo</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {pastures.map((pasture: any) => (
                        <tr key={pasture.id}>
                            <td className="px-6 py-4 whitespace-nowrap">{pasture.id}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{pasture.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{pasture.extension}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{pasture.maxCapacity}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{pasture.pastureType}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{pasture.currentStatus}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{pasture.restDays}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{pasture.occupationDays}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{pasture.active ? 'Activo' : 'Inactivo'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}