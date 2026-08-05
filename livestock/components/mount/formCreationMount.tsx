"use client";
import { useState, useEffect } from "react";

export default function FormCreationMount() {
    const [bovinos, setBovinos] = useState([]);
    const [formData, setFormData] = useState({
        idBovine: '',
        bullId: '',
        breedingDate: '',
        serviceNumber: '',
        bovineCondition: '',
        observations: '',
        idResponsible: ''
    });

    useEffect(() => {
        const fetchBovinos = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/cattle/CattleAll');
                let resJson = await response.json();
                setBovinos(resJson.info || []);
            } catch (error) {
                console.error('Error fetching bovinos:', error);
            }
        };
        fetchBovinos();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const limpiarFormulario = () => {
        setFormData({
            idBovine: '',
            bullId: '',
            breedingDate: '',
            serviceNumber: '',
            bovineCondition: '',
            observations: '',
            idResponsible: ''
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const datosEnviar = {
            ...formData,
            idBovine: parseInt(formData.idBovine),
            bullId: parseInt(formData.bullId),
            serviceNumber: parseInt(formData.serviceNumber)
        };

        try {
            const response = await fetch('http://localhost:3000/api/mount/create', {
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
                Crear Monta Natural
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="idBovine" className="block text-sm font-medium text-gray-700 mb-1">
                            Vaca (Hembra):
                        </label>
                        <select
                            id="idBovine"
                            name="idBovine"
                            value={formData.idBovine}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                        >
                            <option value="">Seleccione una vaca</option>
                            {bovinos.map((bovino: any) => (
                                <option key={bovino.id} value={bovino.id}>
                                    {bovino.name || `ID: ${bovino.id}`}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="bullId" className="block text-sm font-medium text-gray-700 mb-1">
                            Toro (Macho):
                        </label>
                        <select
                            id="bullId"
                            name="bullId"
                            value={formData.bullId}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                        >
                            <option value="">Seleccione un toro</option>
                            {bovinos.map((bovino: any) => (
                                <option key={bovino.id} value={bovino.id}>
                                    {bovino.name || `ID: ${bovino.id}`}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="breedingDate" className="block text-sm font-medium text-gray-700 mb-1">
                            Fecha de Monta:
                        </label>
                        <input
                            type="date"
                            id="breedingDate"
                            name="breedingDate"
                            value={formData.breedingDate}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="serviceNumber" className="block text-sm font-medium text-gray-700 mb-1">
                            Número de Servicio:
                        </label>
                        <input
                            type="number"
                            id="serviceNumber"
                            name="serviceNumber"
                            value={formData.serviceNumber}
                            onChange={handleChange}
                            min="1"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Ej: 1"
                        />
                    </div>

                    <div>
                        <label htmlFor="bovineCondition" className="block text-sm font-medium text-gray-700 mb-1">
                            Condición de la Vaca:
                        </label>
                        <select
                            id="bovineCondition"
                            name="bovineCondition"
                            value={formData.bovineCondition}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                        >
                            <option value="">Seleccione una condición</option>
                            <option value="Celo">Celo</option>
                            <option value="Quieta">Quieta</option>
                            <option value="Rechaza">Rechaza</option>
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
                    Guardar Monta
                </button>
            </form>
        </div>
    );
}