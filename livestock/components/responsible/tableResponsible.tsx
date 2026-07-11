export default function TableResponsible() {
  return (
    <div className="overflow-x-auto shadow-lg rounded-lg">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gradient-to-r from-blue-500 to-blue-700">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Nombre completo</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Tipo de rol</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Correo electrónico</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Teléfono</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Estado</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          <tr className="hover:bg-gray-50 transition-colors duration-200">
            <td className="px-6 py-4 text-sm text-gray-900">1</td>
            <td className="px-6 py-4 text-sm text-gray-900">Carlos Gómez</td>
            <td className="px-6 py-4 text-sm text-gray-900">Administrador</td>
            <td className="px-6 py-4 text-sm text-gray-900">carlos.gomez@correo.com</td>
            <td className="px-6 py-4 text-sm text-gray-900">555-1234</td>
            <td className="px-6 py-4 text-sm">
              <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Activo</span>
            </td>
          </tr>
          
          <tr className="hover:bg-gray-50 transition-colors duration-200">
            <td className="px-6 py-4 text-sm text-gray-900">2</td>
            <td className="px-6 py-4 text-sm text-gray-900">Juan Pérez</td>
            <td className="px-6 py-4 text-sm text-gray-900">Usuario</td>
            <td className="px-6 py-4 text-sm text-gray-900">juan.perez@correo.com</td>
            <td className="px-6 py-4 text-sm text-gray-900">555-5678</td>
            <td className="px-6 py-4 text-sm">
              <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Activo</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}