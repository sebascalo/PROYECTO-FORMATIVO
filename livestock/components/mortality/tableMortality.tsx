"use client";
import { useEffect, useState } from "react";

export default function tableMortality() {
    const [mortalidades, setMortalidades] = useState([]);

    useEffect(() => {
        const fetchMortalidades = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/mortality/MortalityAll');
                let resJson = await response.json();
                setMortalidades(resJson.info);
            } catch (error) {
                console.error('Error:', error);
                setMortalidades([]);
            }
        }
        fetchMortalidades();
    }, []);

    return (
        <div className="overflow-x-auto shadow-lg rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gradient-to-r from-blue-500 to-blue-700">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Bovino</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Fecha de Muerte</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Causa</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Responsable</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Destino</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Observaciones</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {mortalidades.map((mortality: any) => (
                        <tr key={mortality.id}>
                            <td className="px-6 py-4 whitespace-nowrap">{mortality.id}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{mortality.idBovine || '-'}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{mortality.dateofdeath || '-'}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{mortality.causeofdeath || '-'}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{mortality.responsible || '-'}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{mortality.fateoftheanimal || '-'}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{mortality.observations || '-'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}