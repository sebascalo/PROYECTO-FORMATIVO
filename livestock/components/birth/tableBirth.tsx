"use client";
import { useEffect, useState } from "react";

export default function tableBirth() {
    const [births, setBirths] = useState([]);

    useEffect(() => {
        const fetchBirths = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/birth/BirthAll');
                let resJson = await response.json();
                setBirths(resJson.info);
            } catch (error) {
                console.error('Error:', error);
                setBirths([]);
            }
        }
        fetchBirths();
    }, []);

    return (
        <div className="overflow-x-auto shadow-lg rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gradient-to-r from-blue-500 to-blue-700">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Madre</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Identificación</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Fecha</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Sexo</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Raza</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Peso (kg)</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Condición</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Responsable</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Activo</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {births.map((birth: any) => (
                        <tr key={birth.id}>
                            <td className="px-6 py-4 whitespace-nowrap">{birth.id}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{birth.motheridentification || '-'}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{birth.landidentification || '-'}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{birth.birthdate || '-'}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                {birth.sex ? (
                                    <span className={birth.sex === 'Macho' ? 'text-blue-600' : 'text-pink-600'}>
                                        {birth.sex === 'Macho' ? '♂' : '♀'} {birth.sex}
                                    </span>
                                ) : '-'}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">{birth.race || '-'}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{birth.birthweight ? `${birth.birthweight} kg` : '-'}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{birth.conditionatbirth || '-'}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{birth.responsible || '-'}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{birth.active ? 'Activo' : 'Inactivo'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}