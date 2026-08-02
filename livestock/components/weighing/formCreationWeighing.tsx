"use client";
import { useState } from "react";

export default function FormCreationWeighing() {
    const [formData, setFormData] = useState({
        idBovine: '',
        weighingdate: new Date().toISOString().split('T')[0],
        currentweight: '',
        profitorloss: '',
        bodycondition: '',
        observations: '',
        idResponsible: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const limpiarFormulario = () => {
        setFormData({
            idBovine: '',
            weighingdate: new Date().toISOString().split('T')[0],
            currentweight: '',
            profitorloss: '',
            bodycondition: '',
            observations: '',
            idResponsible: ''
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const datosEnviar = {
            ...formData,
            currentweight: formData.currentweight ? parseFloat(formData.currentweight) : null,
            profitorloss: formData.profitorloss ? parseFloat(formData.profitorloss) : null
        };

        try {
            const response = await fetch('http://localhost:3000/api/weighing/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(datosEnviar),
            });

            limpiarFormulario();

        } catch (error) {
            console.error('Error:', error);
            limpiarFormulario();
        }
    };

    return (
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2">
                Registrar Pesaje
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="idBovine" className="block text-sm font-medium text-gray-700 mb-1">
                            Bovino:
                        </label>
                        <input
                            type="text"
                            id="idBovine"
                            name="idBovine"
                            value={formData.idBovine}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Ej: G-001"
                        />
                    </div>

                    <div>
                        <label htmlFor="weighingdate" className="block text-sm font-medium text-gray-700 mb-1">
                            Fecha de Pesaje:
                        </label>
                        <input
                            type="date"
                            id="weighingdate"
                            name="weighingdate"
                            value={formData.weighingdate}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="currentweight" className="block text-sm font-medium text-gray-700 mb-1">
                            Peso Actual (kg):
                        </label>
                        <input
                            type="number"
                            id="currentweight"
                            name="currentweight"
                            value={formData.currentweight}
                            onChange={handleChange}
                            step="0.1"
                            min="0"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Ej: 450.5"
                        />
                    </div>

                    <div>
                        <label htmlFor="profitorloss" className="block text-sm font-medium text-gray-700 mb-1">
                            Ganancia/Pérdida (kg):
                        </label>
                        <input
                            type="number"
                            id="profitorloss"
                            name="profitorloss"
                            value={formData.profitorloss}
                            onChange={handleChange}
                            step="0.1"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Ej: 5.5"
                        />
                    </div>

                    <div>
                        <label htmlFor="bodycondition" className="block text-sm font-medium text-gray-700 mb-1">
                            Condición Corporal:
                        </label>
                        <select
                            id="bodycondition"
                            name="bodycondition"
                            value={formData.bodycondition}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                        >
                            <option value="">Seleccione</option>
                            <option value="Delgado">Delgado</option>
                            <option value="Normal">Normal</option>
                            <option value="Gordo">Gordo</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="idResponsible" className="block text-sm font-medium text-gray-700 mb-1">
                            Responsable:
                        </label>
                        <input
                            type="text"
                            id="idResponsible"
                            name="idResponsible"
                            value={formData.idResponsible}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Ej: Juan Pérez"
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="observations" className="block text-sm font-medium text-gray-700 mb-1">
                        Observaciones:
                    </label>
                    <textarea
                        id="observations"
                        name="observations"
                        value={formData.observations}
                        onChange={handleChange}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Observaciones adicionales..."
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    Guardar Pesaje
                </button>
            </form>
        </div>
    );
}