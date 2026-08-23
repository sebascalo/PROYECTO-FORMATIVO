"use client";
import { useEffect, useState } from "react";

export default function tableTreatment() {
    const [treatments, setTreatments] = useState([]);

    // Función para formatear fecha
    const formatDate = (dateString) => {
        if (!dateString) return '-';
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });
    };

    useEffect(() => {
        const fetchTreatments = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/treatment/TreatmentAll');
                let resJson = await response.json();
                setTreatments(resJson.info);
            } catch (error) {
                console.error('Error:', error);
                setTreatments([]);
            }
        }
        fetchTreatments();
    }, []);

    return (
        <div className="overflow-x-auto shadow-lg rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gradient-to-r from-blue-500 to-blue-700">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Bovino</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Fecha</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Medicamento</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Dosis</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Vía</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Diagnóstico</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Responsable</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {treatments.map((treatment: any) => (
                        <tr key={treatment.id}>
                            <td className="px-6 py-4 whitespace-nowrap">{treatment.id}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{treatment.idBovine}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{formatDate(treatment.treatment_date)}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{treatment.medication_used}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{treatment.applied_dose}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{treatment.application_route}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{treatment.associated_diagnosis}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{treatment.idResponsible}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}