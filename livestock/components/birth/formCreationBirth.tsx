"use client";
import { useState } from "react";

export default function FormCreationBirth() {
    const [formData, setFormData] = useState({
        motheridentification: '',
        landidentification: '',
        birthdate: '',
        sex: '',
        race: '',
        birthweight: '',
        conditionatbirth: '',
        observations: '',
        responsible: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const limpiarFormulario = () => {
        setFormData({
            motheridentification: '',
            landidentification: '',
            birthdate: '',
            sex: '',
            race: '',
            birthweight: '',
            conditionatbirth: '',
            observations: '',
            responsible: ''
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const datosEnviar = {
            ...formData,
            birthweight: formData.birthweight ? parseFloat(formData.birthweight) : null
        };

        try {
            const response = await fetch('http://localhost:3000/api/birth/create', {
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
                Crear Nacimiento
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="motheridentification" className="block text-sm font-medium text-gray-700 mb-1">
                            Identificación de la Madre:
                        </label>
                        <input
                            type="text"
                            id="motheridentification"
                            name="motheridentification"
                            value={formData.motheridentification}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Ej: G-001"
                        />
                    </div>

                    <div>
                        <label htmlFor="landidentification" className="block text-sm font-medium text-gray-700 mb-1">
                            Identificación del Potrero:
                        </label>
                        <input
                            type="text"
                            id="landidentification"
                            name="landidentification"
                            value={formData.landidentification}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Ej: P-001"
                        />
                    </div>

                    <div>
                        <label htmlFor="birthdate" className="block text-sm font-medium text-gray-700 mb-1">
                            Fecha de Nacimiento:
                        </label>
                        <input
                            type="date"
                            id="birthdate"
                            name="birthdate"
                            value={formData.birthdate}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="sex" className="block text-sm font-medium text-gray-700 mb-1">
                            Sexo:
                        </label>
                        <select
                            id="sex"
                            name="sex"
                            value={formData.sex}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                        >
                            <option value="">Seleccione</option>
                            <option value="Macho">Macho</option>
                            <option value="Hembra">Hembra</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="race" className="block text-sm font-medium text-gray-700 mb-1">
                            Raza:
                        </label>
                        <select
                            id="race"
                            name="race"
                            value={formData.race}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                        >
                            <option value="">Seleccione una raza</option>
                            <option value="Holstein">Holstein</option>
                            <option value="Jersey">Jersey</option>
                            <option value="Brahmán">Brahmán</option>
                            <option value="Hereford">Hereford</option>
                            <option value="Angus">Angus</option>
                            <option value="Cebú">Cebú</option>
                            <option value="Criolla">Criolla</option>
                            <option value="Otra">Otra</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="birthweight" className="block text-sm font-medium text-gray-700 mb-1">
                            Peso al Nacer (kg):
                        </label>
                        <input
                            type="number"
                            id="birthweight"
                            name="birthweight"
                            value={formData.birthweight}
                            onChange={handleChange}
                            step="0.1"
                            min="0"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Ej: 35.5"
                        />
                    </div>

                    <div>
                        <label htmlFor="conditionatbirth" className="block text-sm font-medium text-gray-700 mb-1">
                            Condición al Nacer:
                        </label>
                        <select
                            id="conditionatbirth"
                            name="conditionatbirth"
                            value={formData.conditionatbirth}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                        >
                            <option value="">Seleccione</option>
                            <option value="Sano">Sano</option>
                            <option value="Debil">Débil</option>
                            <option value="Prematuro">Prematuro</option>
                            <option value="Con complicaciones">Con complicaciones</option>
                            <option value="Fallecido">Fallecido</option>
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
                    Guardar Nacimiento
                </button>
            </form>
        </div>
    );
}