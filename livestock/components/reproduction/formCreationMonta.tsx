function FormCreationMonta() {
  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
      <h2 className="text-2xl md:text-3xl font-semibold text-blue-700 mb-4 border-b border-gray-200 pb-2">
        Formulario de Monta
      </h2>

      <form className="space-y-4">
        <div>
          <label
            htmlFor="cowID"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Identificador de la vaca:
          </label>
          <input
            type="number"
            id="cowID"
            name="cowID"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 text-base"
            placeholder="Ej: 123"
          />
        </div>

        <div>
          <label
            htmlFor="bullId"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Identificador del toro:
          </label>
          <input
            type="number"
            id="bullId"
            name="bullId"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 text-base"
            placeholder="Ej: 456"
          />
        </div>

        <div>
          <label
            htmlFor="breedingDate"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Fecha de la monta:
          </label>
          <input
            type="date"
            id="breedingDate"
            name="breedingDate"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 text-base"
          />
        </div>

        <div>
          <label
            htmlFor="serviceNumber"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Número de servicio:
          </label>
          <input
            type="text"
            id="serviceNumber"
            name="serviceNumber"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 text-base"
            placeholder="Ej: Servicio Nº 1"
          />
        </div>

        <div>
          <label
            htmlFor="cowCondition"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Condición de la vaca:
          </label>
          <input
            type="text"
            id="cowCondition"
            name="cowCondition"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 text-base"
            placeholder="Ej: Sano"
          />
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
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 text-base"
            placeholder="Nombre del encargado"
          />
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
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 text-base"
            placeholder="Detalle adicional..."
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white text-lg font-medium py-3 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2"
        >
          Crear registro de monta
        </button>
      </form>
    </div>
  );
}

export default FormCreationMonta;
