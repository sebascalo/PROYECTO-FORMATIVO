"use client";
import { useEffect, useState } from "react";

export default function tableCattle() {
    const [cattles, setCattles] = useState([]);

    useEffect(() => {
        const fetchCattles = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/cattle/CattleAll');
                let resJson = await response.json();
                setCattles(resJson.info);
            } catch (error) {
                console.error('Error:', error);
                setCattles([]);
            }
        }
        fetchCattles();
    }, []);

    return (
        <div className="overflow-x-auto shadow-lg rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gradient-to-r from-blue-500 to-blue-700">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Nombre</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Raza</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Fecha Ingreso</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Potrero</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Fecha Nac.</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Peso (kg)</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Clasificación</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Estado</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Activo</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {cattles.map((cattle: any) => (
                        <tr key={cattle.id}>
                            <td className="px-6 py-4 whitespace-nowrap">{cattle.id}</td>
                            <td className="px-6 py-4 whitespace-nowrap font-medium">{cattle.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{cattle.raze}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{cattle.entrydate}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{cattle.paddock}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{cattle.birthdate}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{cattle.currentweight} kg</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                    cattle.classificationbytype === 'Lechero' ? 'bg-blue-100 text-blue-800' :
                                    cattle.classificationbytype === 'Carne' ? 'bg-red-100 text-red-800' :
                                    'bg-green-100 text-green-800'
                                }`}>
                                    {cattle.classificationbytype}
                                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                    cattle.state === 'Saludable' ? 'bg-green-100 text-green-800' :
                                    cattle.state === 'Enfermo' ? 'bg-red-100 text-red-800' :
                                    cattle.state === 'En tratamiento' ? 'bg-yellow-100 text-yellow-800' :
                                    'bg-gray-100 text-gray-800'
                                }`}>
                                    {cattle.state}
                                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                {cattle.active ? 'Activo' : 'Inactivo'}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}