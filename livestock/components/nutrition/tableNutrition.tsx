"use client";
import { useEffect, useState } from "react";

export default function tableNutrition() {
    const [nutritions, setNutritions] = useState([]);

    useEffect(() => {
        const fetchNutritions = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/nutrition/NutritionAll');
                let resJson = await response.json();
                setNutritions(resJson.info);
            } catch (error) {
                console.error('Error:', error);
                setNutritions([]);
            }
        }
        fetchNutritions();
    }, []);

    return (
        <div className="overflow-x-auto shadow-lg rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gradient-to-r from-blue-500 to-blue-700">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Bovino</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Alimento</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Tipo</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Cantidad</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Frecuencia</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Responsable</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {nutritions.map((nutrition: any) => (
                        <tr key={nutrition.id}>
                            <td className="px-6 py-4 whitespace-nowrap">{nutrition.id}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{nutrition.idBovine || '-'}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{nutrition.idFood || '-'}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                    nutrition.food_type === 'Pasto' ? 'bg-green-100 text-green-800' :
                                    nutrition.food_type === 'Concentrado' ? 'bg-yellow-100 text-yellow-800' :
                                    nutrition.food_type === 'Silo' ? 'bg-orange-100 text-orange-800' :
                                    nutrition.food_type === 'Forraje' ? 'bg-blue-100 text-blue-800' :
                                    'bg-gray-100 text-gray-800'
                                }`}>
                                    {nutrition.food_type}
                                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">{nutrition.quantity}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                    nutrition.frequency === 'Mañana' ? 'bg-yellow-100 text-yellow-800' :
                                    nutrition.frequency === 'Tarde' ? 'bg-orange-100 text-orange-800' :
                                    nutrition.frequency === 'Noche' ? 'bg-indigo-100 text-indigo-800' :
                                    'bg-gray-100 text-gray-800'
                                }`}>
                                    {nutrition.frequency}
                                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">{nutrition.idResponsible || '-'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}