"use client";
import { useState } from "react";

export default function FormCreationMortality() {
    const [formData, setFormData] = useState({
        idBovine: '',
        dateofdeath: '',
        causeofdeath: '',
        responsible: '',
        fateoftheanimal: '',
        observations: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const limpiarFormulario = () => {
        setFormData({
            idBovine: '',
            dateofdeath: '',
            causeofdeath: '',
            responsible: '',
            fateoftheanimal: '',
            observations: ''
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3000/api/mortality/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
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
                Crear Mortalidad
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
                        <label htmlFor="dateofdeath" className="block text-sm font-medium text-gray-700 mb-1">
                            Fecha de Muerte:
                        </label>
                        <input
                            type="date"
                            id="dateofdeath"
                            name="dateofdeath"
                            value={formData.dateofdeath}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="causeofdeath" className="block text-sm font-medium text-gray-700 mb-1">
                            Causa de Muerte:
                        </label>
                        <select
                            id="causeofdeath"
                            name="causeofdeath"
                            value={formData.causeofdeath}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                        >
                            <option value="">Seleccione una causa</option>
                            <option value="Enfermedad">Enfermedad</option>
                            <option value="Accidente">Accidente</option>
                            <option value="Parto">Complicaciones de parto</option>
                            <option value="Vejez">Vejez</option>
                            <option value="Parásitos">Parásitos</option>
                            <option value="Desnutrición">Desnutrición</option>
                            <option value="Intoxicación">Intoxicación</option>
                            <option value="Depredador">Depredador</option>
                            <option value="Desconocida">Desconocida</option>
                            <option value="Otra">Otra</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="responsible" className="block text-sm font-medium text-gray-700 mb-1">
                            Responsable:
                        </label>
                        <input
                            type="text"
                            id="responsible"
                            name="responsible"
                            value={formData.responsible}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Ej: Dr. Juan Pérez"
                        />
                    </div>

                    <div>
                        <label htmlFor="fateoftheanimal" className="block text-sm font-medium text-gray-700 mb-1">
                            Destino del Animal:
                        </label>
                        <select
                            id="fateoftheanimal"
                            name="fateoftheanimal"
                            value={formData.fateoftheanimal}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                        >
                            <option value="">Seleccione un destino</option>
                            <option value="Enterrado">Enterrado</option>
                            <option value="Incinerado">Incinerado</option>
                            <option value="Vendido para consumo">Vendido para consumo</option>
                            <option value="Desechado">Desechado</option>
                            <option value="Estudio">Estudio/Investigación</option>
                        </select>
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
                    Guardar Mortalidad
                </button>
            </form>
        </div>
    );
}