"use client";
import { useState, useEffect } from "react";

export default function FormCreationMilk() {
    const [bovinos, setBovinos] = useState([]);
    const [usuarios, setUsuarios] = useState([]);
    const [formData, setFormData] = useState({
        idBovine: '',
        milkingDate: new Date().toISOString().split('T')[0],
        shift: 'Mañana',
        litersQuantity: '',
        milkQuality: '',
        observations: '',
        idResponsible: ''
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const bovineRes = await fetch('http://localhost:3000/api/bovine/all');
                const bovineResult = await bovineRes.json();
                setBovinos(bovineResult.info || []);

                const userRes = await fetch('http://localhost:3000/api/user/UserAll');
                const userResult = await userRes.json();
                setUsuarios(userResult.info || []);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const limpiarFormulario = () => {
        setFormData({
            idBovine: '',
            milkingDate: new Date().toISOString().split('T')[0],
            shift: 'Mañana',
            litersQuantity: '',
            milkQuality: '',
            observations: '',
            idResponsible: ''
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const datosEnviar = {
            ...formData,
            litersQuantity: parseFloat(formData.litersQuantity),
            idBovine: parseInt(formData.idBovine),
            idResponsible: parseInt(formData.idResponsible)
        };

        try {
            const response = await fetch('http://localhost:3000/api/milk/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(datosEnviar),
            });

            // Siempre limpia el formulario
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
                Crear Producción de Leche
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="idBovine" className="block text-sm font-medium text-gray-700 mb-1">
                            Bovino:
                        </label>
                        <select
                            id="idBovine"
                            name="idBovine"
                            value={formData.idBovine}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                        >
                            <option value="">Seleccione un bovino</option>
                            {bovinos.map((bovino: any) => (
                                <option key={bovino.id} value={bovino.id}>
                                    {bovino.earTag} - {bovino.name || 'Sin nombre'}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="milkingDate" className="block text-sm font-medium text-gray-700 mb-1">
                            Fecha de Ordeño:
                        </label>
                        <input
                            type="date"
                            id="milkingDate"
                            name="milkingDate"
                            value={formData.milkingDate}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="shift" className="block text-sm font-medium text-gray-700 mb-1">
                            Turno:
                        </label>
                        <select
                            id="shift"
                            name="shift"
                            value={formData.shift}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                        >
                            <option value="Mañana">Mañana</option>
                            <option value="Tarde">Tarde</option>
                            <option value="Noche">Noche</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="litersQuantity" className="block text-sm font-medium text-gray-700 mb-1">
                            Cantidad (Litros):
                        </label>
                        <input
                            type="number"
                            id="litersQuantity"
                            name="litersQuantity"
                            value={formData.litersQuantity}
                            onChange={handleChange}
                            step="0.1"
                            min="0"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Ej: 25.5"
                        />
                    </div>

                    <div>
                        <label htmlFor="milkQuality" className="block text-sm font-medium text-gray-700 mb-1">
                            Calidad de Leche:
                        </label>
                        <select
                            id="milkQuality"
                            name="milkQuality"
                            value={formData.milkQuality}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                        >
                            <option value="">Seleccione una calidad</option>
                            <option value="Excelente">Excelente</option>
                            <option value="Buena">Buena</option>
                            <option value="Regular">Regular</option>
                            <option value="Mala">Mala</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="idResponsible" className="block text-sm font-medium text-gray-700 mb-1">
                            Responsable:
                        </label>
                        <select
                            id="idResponsible"
                            name="idResponsible"
                            value={formData.idResponsible}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                        >
                            <option value="">Seleccione un responsable</option>
                            {usuarios.map((usuario: any) => (
                                <option key={usuario.id} value={usuario.id}>
                                    {usuario.name} - {usuario.postJob}
                                </option>
                            ))}
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
                    Guardar Producción
                </button>
            </form>
        </div>
    );
}
