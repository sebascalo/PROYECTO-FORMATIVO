"use client";
import { useState } from "react";

export default function FormCreationCattle() {
    const [formData, setFormData] = useState({
        name: '',
        raze: '',
        entrydate: '',
        paddock: '',
        birthdate: '',
        photo: '',
        currentweight: '',
        classificationbytype: '',
        state: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const limpiarFormulario = () => {
        setFormData({
            name: '',
            raze: '',
            entrydate: '',
            paddock: '',
            birthdate: '',
            photo: '',
            currentweight: '',
            classificationbytype: '',
            state: ''
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const datosEnviar = {
            ...formData,
            currentweight: parseFloat(formData.currentweight)
        };

        try {
            const response = await fetch('http://localhost:3000/api/cattle/create', {
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
                Crear Bovino
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                            Nombre:
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Ej: Lola"
                        />
                    </div>

                    <div>
                        <label htmlFor="raze" className="block text-sm font-medium text-gray-700 mb-1">
                            Raza:
                        </label>
                        <select
                            id="raze"
                            name="raze"
                            value={formData.raze}
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
                        <label htmlFor="entrydate" className="block text-sm font-medium text-gray-700 mb-1">
                            Fecha de Ingreso:
                        </label>
                        <input
                            type="date"
                            id="entrydate"
                            name="entrydate"
                            value={formData.entrydate}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="paddock" className="block text-sm font-medium text-gray-700 mb-1">
                            Potrero:
                        </label>
                        <input
                            type="text"
                            id="paddock"
                            name="paddock"
                            value={formData.paddock}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Ej: Potrero Norte"
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
                        <label htmlFor="classificationbytype" className="block text-sm font-medium text-gray-700 mb-1">
                            Clasificación:
                        </label>
                        <select
                            id="classificationbytype"
                            name="classificationbytype"
                            value={formData.classificationbytype}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                        >
                            <option value="">Seleccione una clasificación</option>
                            <option value="Lechero">Lechero</option>
                            <option value="Carne">Carne</option>
                            <option value="Doble propósito">Doble propósito</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                            Estado:
                        </label>
                        <select
                            id="state"
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                        >
                            <option value="">Seleccione un estado</option>
                            <option value="Saludable">Saludable</option>
                            <option value="Enfermo">Enfermo</option>
                            <option value="En tratamiento">En tratamiento</option>
                            <option value="En recuperación">En recuperación</option>
                            <option value="Gestante">Gestante</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="photo" className="block text-sm font-medium text-gray-700 mb-1">
                            Foto (URL):
                        </label>
                        <input
                            type="text"
                            id="photo"
                            name="photo"
                            value={formData.photo}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="https://ejemplo.com/foto.jpg"
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    Guardar Bovino
                </button>
            </form>
        </div>
    );
}