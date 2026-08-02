"use client";
import { useEffect, useState } from "react";

export default function tableWeighing() {
    const [weighings, setWeighings] = useState([]);

    useEffect(() => {
        const fetchWeighings = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/weighing/WeighingAll');
                let resJson = await response.json();
                setWeighings(resJson.info);
            } catch (error) {
                console.error('Error:', error);
                setWeighings([]);
            }
        }
        fetchWeighings();
    }, []);

    return (
        <div className="overflow-x-auto shadow-lg rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gradient-to-r from-blue-500 to-blue-700">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Bovino</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Fecha</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Peso (kg)</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Ganancia/Pérdida</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Condición</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Observaciones</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Responsable</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {weighings.map((weighing: any) => (
                        <tr key={weighing.id}>
                            <td className="px-6 py-4 whitespace-nowrap">{weighing.id}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{weighing.idBovine}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{weighing.weighingdate}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{weighing.currentweight}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{weighing.profitorloss}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{weighing.bodycondition}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{weighing.observations}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{weighing.idResponsible}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}