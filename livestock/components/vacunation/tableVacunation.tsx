"use client";
import { useEffect, useState } from "react";

export default function tableVacunation() {
    const [vacunations, setVacunations] = useState([]);

    useEffect(() => {
        const fetchVacunations = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/vacunation/VacunationAll');
                let resJson = await response.json();
                setVacunations(resJson.info);
            } catch (error) {
                console.error('Error:', error);
                setVacunations([]);
            }
        }
        fetchVacunations();
    }, []);

    return (
        <div className="overflow-x-auto shadow-lg rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gradient-to-r from-blue-500 to-blue-700">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Bovino</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Fecha</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Dosis</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Lugar</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Condición</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Responsable</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Observaciones</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {vacunations.map((vacunation: any) => (
                        <tr key={vacunation.id}>
                            <td className="px-6 py-4 whitespace-nowrap">{vacunation.id}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{vacunation.idBovine}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{vacunation.vaccination_date}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{vacunation.applied_dose}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{vacunation.application_site}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{vacunation.application_condition}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{vacunation.idResponsible}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{vacunation.observations || '-'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}