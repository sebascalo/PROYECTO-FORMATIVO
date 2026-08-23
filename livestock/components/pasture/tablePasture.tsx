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

    // Función para formatear fechas a un formato legible (ej: 15/08/2026)
    const formatDate = (dateString: string | null) => {
        if (!dateString) return "Sin fecha"; // Si es null, muestra esto
        const date = new Date(dateString);
        return date.toLocaleDateString('es-CO', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });
    };

    return (
        <div className="overflow-x-auto shadow-lg rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gradient-to-r from-blue-500 to-blue-700">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Nombre</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Extensión (Ha)</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Aforo (Cap. Máx)</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Tipo de Pastura</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Estado Actual</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Ingreso Ganado</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Salida Ganado</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Último Químico</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {pastures.map((pasture: any) => (
                        <tr key={pasture.id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap">{pasture.id}</td>
                            <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{pasture.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{pasture.extension}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{pasture.forageCapacity}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{pasture.pastureType}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                {/* Mostrar el estado con un color según su valor */}
                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${pasture.currentStatus === 'Ocupado' ? 'bg-red-100 text-red-800' : pasture.currentStatus === 'En descanso' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                                    {pasture.currentStatus}
                                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">{formatDate(pasture.cattleEntryDate)}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{formatDate(pasture.cattleExitDate)}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{pasture.lastChemicalApplication ? pasture.lastChemicalApplication : 'N/A'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}