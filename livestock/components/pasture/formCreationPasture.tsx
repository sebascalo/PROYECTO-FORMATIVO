"use client";
import { useState } from "react";

export default function FormCreationPasture() {
    const [formData, setFormData] = useState({
        name: '',
        extension: '',
        maxCapacity: '',
        pastureType: '',
        currentStatus: '',
        restDays: '',
        occupationDays: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const limpiarFormulario = () => {
        setFormData({
            name: '',
            extension: '',
            maxCapacity: '',
            pastureType: '',
            currentStatus: '',
            restDays: '',
            occupationDays: ''
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // Primero guardamos los datos para enviarlos
        const datosEnviar = {
            ...formData,
            extension: parseFloat(formData.extension),
            maxCapacity: parseInt(formData.maxCapacity),
            restDays: parseInt(formData.restDays),
            occupationDays: parseInt(formData.occupationDays)
        };

        try {
            const response = await fetch('http://localhost:3000/api/pasture/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(datosEnviar),
            });

            // Siempre limpia el formulario, sin importar la respuesta
            limpiarFormulario();

        } catch (error) {
            console.error('Error:', error);
            // También limpia si hay error
            limpiarFormulario();
        }
    };

    return (
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2">
                Crear Potrero
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Nombre:
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Extensión (ha):
                        </label>
                        <input
                            type="number"
                            name="extension"
                            value={formData.extension}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Capacidad de bovinos:
                        </label>
                        <input
                            type="number"
                            name="maxCapacity"
                            value={formData.maxCapacity}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Tipo de Pastura:
                        </label>
                        <select
                            name="pastureType"
                            value={formData.pastureType}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 bg-white"
                        >
                            <option value="">Seleccione</option>
                            <option value="hierba">Hierba</option>
                            <option value="leguminosa">Leguminosa</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Estado Actual:
                        </label>
                        <select
                            name="currentStatus"
                            value={formData.currentStatus}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 bg-white"
                        >
                            <option value="">Seleccione</option>
                            <option value="activa">Activa</option>
                            <option value="descanso">En Descanso</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Días de Descanso:
                        </label>
                        <input
                            type="number"
                            name="restDays"
                            value={formData.restDays}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Días de Ocupación:
                        </label>
                        <input
                            type="number"
                            name="occupationDays"
                            value={formData.occupationDays}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
                >
                    Guardar Potrero
                </button>
            </form>
        </div>
    );
}
