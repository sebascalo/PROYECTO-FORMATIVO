function formcreationNutrition() {
    return (
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2">
                Formulario de creación de nutrición
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
                        htmlFor="date"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Fecha de tratamiento:
                    </label>
                    <input
                        type="date"
                        id="date"
                        name="date"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <div>
                    <label
                        htmlFor="dose"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Dosis aplicada:
                    </label>
                    <textarea
                        id="dose"
                        name="dose"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    ></textarea>
                </div>

                <div>
                    <label
                        htmlFor="application_place"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Lugar de aplicación:
                    </label>
                    <textarea
                        id="application_place"
                        name="application_place"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    ></textarea>
                </div>

                <div>
                    <label
                        htmlFor="condition"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Condición de aplicación:
                    </label>
                    <textarea
                        id="condition"
                        name="condition"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    ></textarea>
                </div>

                <div>
                    <label
                        htmlFor="responsible"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Responsable:
                    </label>
                    <textarea
                        id="responsible"
                        name="responsible"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    ></textarea>
                </div>

                <div>
                    <label
                        htmlFor="observations"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Observaciones:
                    </label>
                    <textarea
                        id="observations"
                        name="observations"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    ></textarea>
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    Crear registro de nutrición
                </button>
            </form>
        </div>
    );
}

export default formcreationNutrition;