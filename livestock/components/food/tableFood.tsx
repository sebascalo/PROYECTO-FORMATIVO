"use client";
import { useEffect, useState } from "react";

export default function tableFood() {
    const [foods, setFoods] = useState([]);

    useEffect(() => {
        const fetchFoods = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/food/FoodAll');
                let resJson = await response.json();
                setFoods(resJson.info);
            } catch (error) {
                console.error('Error:', error);
                setFoods([]);
            }
        }
        fetchFoods();
    }, []);

    return (
        <div className="overflow-x-auto shadow-lg rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gradient-to-r from-blue-500 to-blue-700">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Nombre</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Tipo</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Unidad</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Stock</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Costo/Unidad</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Proveedor</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Activo</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {foods.map((food: any) => (
                        <tr key={food.id}>
                            <td className="px-6 py-4 whitespace-nowrap">{food.id}</td>
                            <td className="px-6 py-4 whitespace-nowrap font-medium">{food.food_name}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                    food.food_type === 'Pasto' ? 'bg-green-100 text-green-800' :
                                    food.food_type === 'Concentrado' ? 'bg-yellow-100 text-yellow-800' :
                                    food.food_type === 'Silo' ? 'bg-orange-100 text-orange-800' :
                                    food.food_type === 'Forraje' ? 'bg-blue-100 text-blue-800' :
                                    'bg-gray-100 text-gray-800'
                                }`}>
                                    {food.food_type}
                                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">{food.unit_measure}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{food.stock_quantity}</td>
                            <td className="px-6 py-4 whitespace-nowrap">${food.cost_per_unit}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{food.supplier || '-'}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{food.active ? 'Activo' : 'Inactivo'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}