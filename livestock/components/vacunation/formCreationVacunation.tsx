"use client";
import { useState } from "react";

export default function FormCreationVacunation() {
    const [formData, setFormData] = useState({
        idBovine: '',
        vaccination_date: '',
        applied_dose: '',
        application_site: '',
        application_condition: '',
        idResponsible: '',
        observations: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const limpiarFormulario = () => {
        setFormData({
            idBovine: '',
            vaccination_date: '',
            applied_dose: '',
            application_site: '',
            application_condition: '',
            idResponsible: '',
            observations: ''
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3000/api/vacunation/CreateVacunation', {
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
                Crear Vacunación
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
                        <label htmlFor="vaccination_date" className="block text-sm font-medium text-gray-700 mb-1">
                            Fecha de Vacunación:
                        </label>
                        <input
                            type="date"
                            id="vaccination_date"
                            name="vaccination_date"
                            value={formData.vaccination_date}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="applied_dose" className="block text-sm font-medium text-gray-700 mb-1">
                            Dosis Aplicada:
                        </label>
                        <input
                            type="text"
                            id="applied_dose"
                            name="applied_dose"
                            value={formData.applied_dose}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Ej: 5 ml"
                        />
                    </div>

                    <div>
                        <label htmlFor="application_site" className="block text-sm font-medium text-gray-700 mb-1">
                            Lugar de Aplicación:
                        </label>
                        <select
                            id="application_site"
                            name="application_site"
                            value={formData.application_site}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                        >
                            <option value="">Seleccione un lugar</option>
                            <option value="Intramuscular">Intramuscular</option>
                            <option value="Subcutánea">Subcutánea</option>
                            <option value="Intravenosa">Intravenosa</option>
                            <option value="Oral">Oral</option>
                            <option value="Tópica">Tópica</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="application_condition" className="block text-sm font-medium text-gray-700 mb-1">
                            Condición de Aplicación:
                        </label>
                        <select
                            id="application_condition"
                            name="application_condition"
                            value={formData.application_condition}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                        >
                            <option value="">Seleccione una condición</option>
                            <option value="Sana">Sana</option>
                            <option value="Enferma">Enferma</option>
                            <option value="Gestante">Gestante</option>
                            <option value="Lactante">Lactante</option>
                            <option value="Recuperación">Recuperación</option>
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
                            placeholder="Ej: Dr. Juan Pérez"
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
                    Guardar Vacunación
                </button>
            </form>
        </div>
    );
}