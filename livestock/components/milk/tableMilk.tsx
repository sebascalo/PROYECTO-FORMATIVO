"use client";
import { useEffect, useState } from "react";

export default function tableMilk() {
    const [milks, setMilks] = useState([]);

    useEffect(() => {
        const fetchMilks = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/milk/MilkAll');
                let resJson = await response.json();
                setMilks(resJson.info);
            } catch (error) {
                console.error('Error:', error);
                setMilks([]);
            }
        }
        fetchMilks();
    }, []);

    return (
        <div className="overflow-x-auto shadow-lg rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gradient-to-r from-blue-500 to-blue-700">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Bovino</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Fecha</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Turno</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Litros</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Calidad</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Responsable</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Observaciones</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Activo</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {milks.map((milk: any) => (
                        <tr key={milk.id}>
                            <td className="px-6 py-4 whitespace-nowrap">{milk.id}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{milk.Bovine ? `${milk.Bovine.earTag} - ${milk.Bovine.name}` : milk.idBovine}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{milk.milkingDate}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{milk.shift}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{milk.litersQuantity} L</td>
                            <td className="px-6 py-4 whitespace-nowrap">{milk.milkQuality || '-'}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{milk.Responsible ? milk.Responsible.name : milk.idResponsible}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{milk.observations || '-'}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{milk.active ? 'Activo' : 'Inactivo'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}