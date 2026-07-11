function formCreationMilk() {
  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2">
        Formulario de registro de leche
      </h2>

      <form className="space-y-4">
        <div>
          <label
            htmlFor="idvaca"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            ID de la vaca:
          </label>
          <input
            type="text"
            id="idvaca"
            name="idvaca"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Ej: 100"
          />
        </div>

        <div>
          <label
            htmlFor="fecha"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Fecha de ordeño:
          </label>
          <input
            type="date"
            id="fecha"
            name="fecha"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="turno"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Turno:
          </label>
          <select
            id="turno"
            name="turno"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
          >
            <option value="">Seleccione un turno</option>
            <option value="mañana">Mañana</option>
            <option value="tarde">Tarde</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="cantidad"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Cantidad (L):
          </label>
          <input
            type="number"
            id="cantidad"
            name="cantidad"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="0"
            step="0.1"
          />
        </div>

        <div>
          <label
            htmlFor="calidad"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Calidad:
          </label>
          <select
            id="calidad"
            name="calidad"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
          >
            <option value="">Seleccione una calidad</option>
            <option value="buena">Buena</option>
            <option value="regular">Regular</option>
            <option value="mala">Mala</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="observaciones"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Observaciones:
          </label>
          <textarea
            id="observaciones"
            name="observaciones"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Escriba alguna observación si es necesario..."></textarea>
        </div>

        <div>
          <label
            htmlFor="responsable"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Responsable:
          </label>
          <input
            type="text"
            id="responsable"
            name="responsable"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Nombre completo"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Guardar registro
        </button>
      </form>
    </div>
  );
}

export default formCreationMilk;
