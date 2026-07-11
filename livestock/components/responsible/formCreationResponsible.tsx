function FormCreationResponsible() {
  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl md:text-3xl font-semibold text-blue-700 mb-4 border-b border-gray-200 pb-2">
          Formulario de Responsable
        </h2>

        <form className="space-y-4">
          <div>
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Nombre completo:
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 text-base"
              placeholder="Ej: Juan Pérez"
            />
          </div>

          <div>
            <label
              htmlFor="roleType"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Tipo de rol:
            </label>
            <input
              id="roleType"
              name="roleType"
              type="text"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 text-base"
              placeholder="Ej: Administrator, Operario"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Correo electrónico:
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 text-base"
              placeholder="correo@ejemplo.com"
            />
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Teléfono:
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 text-base"
              placeholder="Ej: +34 600 000 000"
            />
          </div>

          <div>
            <label
              htmlFor="status"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Estado:
            </label>
            <select
              id="status"
              name="status"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 bg-white text-base"
          >
              <option value="">Seleccione estado...</option>
              <option value="Activo">Activo</option>
              <option value="Inactivo">Inactivo</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white text-lg font-medium py-3 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2"
          >
            Crear responsable
          </button>
        </form>
      </div>
    </div>
  );
}

export default FormCreationResponsible;
