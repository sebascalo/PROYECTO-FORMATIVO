"use client";
import { useState } from "react";

export default function FormCreationTreatment() {
    const [formData, setFormData] = useState({
        idBovine: '',
        treatment_date: new Date().toISOString().split('T')[0],
        medication_used: '',
        applied_dose: '',
        application_route: '',
        associated_diagnosis: '',
        treatment_duration: '',
        treatment_result: '',
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
            treatment_date: new Date().toISOString().split('T')[0],
            medication_used: '',
            applied_dose: '',
            application_route: '',
            associated_diagnosis: '',
            treatment_duration: '',
            treatment_result: '',
            observations: '',
            idResponsible: ''
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3000/api/treatment/create', {
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
                Crear Tratamiento
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
                        <label htmlFor="treatment_date" className="block text-sm font-medium text-gray-700 mb-1">
                            Fecha de Tratamiento:
                        </label>
                        <input
                            type="date"
                            id="treatment_date"
                            name="treatment_date"
                            value={formData.treatment_date}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="medication_used" className="block text-sm font-medium text-gray-700 mb-1">
                            Medicamento:
                        </label>
                        <input
                            type="text"
                            id="medication_used"
                            name="medication_used"
                            value={formData.medication_used}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Ej: Ivermectina"
                        />
                    </div>

                    <div>
                        <label htmlFor="applied_dose" className="block text-sm font-medium text-gray-700 mb-1">
                            Dosis Administrada:
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
                        <label htmlFor="application_route" className="block text-sm font-medium text-gray-700 mb-1">
                            Vía de Administración:
                        </label>
                        <select
                            id="application_route"
                            name="application_route"
                            value={formData.application_route}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                        >
                            <option value="">Seleccione una vía</option>
                            <option value="Oral">Oral</option>
                            <option value="Intramuscular">Intramuscular</option>
                            <option value="Intravenosa">Intravenosa</option>
                            <option value="Tópica">Tópica</option>
                            <option value="Subcutánea">Subcutánea</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="associated_diagnosis" className="block text-sm font-medium text-gray-700 mb-1">
                            Diagnóstico Asociado:
                        </label>
                        <input
                            type="text"
                            id="associated_diagnosis"
                            name="associated_diagnosis"
                            value={formData.associated_diagnosis}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Ej: Parásitos internos"
                        />
                    </div>

                    <div>
                        <label htmlFor="treatment_duration" className="block text-sm font-medium text-gray-700 mb-1">
                            Duración del Tratamiento:
                        </label>
                        <input
                            type="text"
                            id="treatment_duration"
                            name="treatment_duration"
                            value={formData.treatment_duration}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Ej: 5 días"
                        />
                    </div>

                    <div>
                        <label htmlFor="treatment_result" className="block text-sm font-medium text-gray-700 mb-1">
                            Resultado del Tratamiento:
                        </label>
                        <select
                            id="treatment_result"
                            name="treatment_result"
                            value={formData.treatment_result}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                        >
                            <option value="">Seleccione un resultado</option>
                            <option value="Exitoso">Exitoso</option>
                            <option value="Parcial">Parcial</option>
                            <option value="Fallido">Fallido</option>
                            <option value="En Proceso">En Proceso</option>
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
                    Guardar Tratamiento
                </button>
            </form>
        </div>
    );
}