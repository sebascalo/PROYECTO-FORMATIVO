function formcreationAlimentation() {
    return (
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2">
                Formulario de creación de alimento
            </h2>

            <form className="space-y-4">
                <div>
                    <label
                        htmlFor="animal_identifier"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Identificador del animal:
                    </label>
                    <input
                        type="text"
                        id="animal_identifier"
                        name="animal_identifier"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <div>
                    <label
                        htmlFor="calories"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Calorías:
                    </label>
                    <input
                        type="number"
                        id="calories"
                        name="calories"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <div>
                    <label
                        htmlFor="protein"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Proteínas (g):
                    </label>
                    <input
                        type="number"
                        id="protein"
                        name="protein"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <div>
                    <label
                        htmlFor="quantity"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Cantidad de comida (g):
                    </label>
                    <input
                        type="number"
                        id="quantity"
                        name="quantity"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <div>
                    <label
                        htmlFor="frequency"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Frecuencia:
                    </label>
                    <input
                        type="text"
                        id="frequency"
                        name="frequency"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <div>
                    <label
                        htmlFor="responsible"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Responsable:
                    </label>
                    <input
                        type="text"
                        id="responsible"
                        name="responsible"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <div>
                    <label
                        htmlFor="feedingDate"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Fecha de alimentación:
                    </label>
                    <input
                        type="date"
                        id="feedingDate"
                        name="feedingDate"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <div>
                    <label
                        htmlFor="feedingTime"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Hora de alimentación:
                    </label>
                    <input
                        type="time"
                        id="feedingTime"
                        name="feedingTime"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    Crear alimento
                </button>
            </form>
        </div>
    );
}

export default formcreationAlimentation;