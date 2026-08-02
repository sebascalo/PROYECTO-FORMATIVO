"use client";
import { useEffect, useState } from "react";

export default function tableArtificialInsemination() {
    const [inseminations, setInseminations] = useState([]);

    useEffect(() => {
        const fetchInseminations = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/artificialInsemination/ArtificialInseminationAll');
                let resJson = await response.json();
                setInseminations(resJson.info);
            } catch (error) {
                console.error('Error:', error);
                setInseminations([]);
            }
        }
        fetchInseminations();
    }, []);

    return (
        <div className="overflow-x-auto shadow-lg rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gradient-to-r from-blue-500 to-blue-700">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Bovino</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Fecha</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Código Semen</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Toro</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Dosis</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Responsable</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Observaciones</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {inseminations.map((insemination: any) => (
                        <tr key={insemination.id}>
                            <td className="px-6 py-4 whitespace-nowrap">{insemination.id}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{insemination.idBovine}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{insemination.inseminationDate}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{insemination.semenID}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{insemination.donorBull || '-'}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{insemination.semenDose || '-'}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{insemination.idResponsible}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{insemination.observations || '-'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}