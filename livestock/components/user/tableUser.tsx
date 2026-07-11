export default function tableUser() {
    return (
         <div className="overflow-x-auto shadow-lg rounded-lg">
    <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gradient-to-r from-blue-500 to-blue-700">
            <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Nombre</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Correo</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Documento</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Cargo</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">VerificacionEmail</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Activo</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Fecha creacion</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Fecha actualizacion</th>
            </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
            <tr className="hover:bg-gray-50 transition-colors duration-200">
                <td className="px-6 py-4 text-sm text-gray-900 font-medium">1</td>
                <td className="px-6 py-4 text-sm text-gray-900">Juan Pérez</td>
                <td className="px-6 py-4 text-sm text-gray-600">juan@gmail.com</td>
                <td className="px-6 py-4 text-sm text-gray-600">123456789</td>
                <td className="px-6 py-4 text-sm">
                    <span className="px-2 py-1 text-xs rounded-full bg-purple-100 text-purple-800">Administrador</span>
                </td>
                <td className="px-6 py-4 text-sm">
                    <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">✓ Sí</span>
                </td>
                <td className="px-6 py-4 text-sm">
                    <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">✓ Sí</span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">2024-01-15 10:30</td>
                <td className="px-6 py-4 text-sm text-gray-600">2024-01-20 14:25</td>
            </tr>
            <tr className="hover:bg-gray-50 transition-colors duration-200">
                <td className="px-6 py-4 text-sm text-gray-900 font-medium">2</td>
                <td className="px-6 py-4 text-sm text-gray-900">María Gómez</td>
                <td className="px-6 py-4 text-sm text-gray-600">maria@gmail.com</td>
                <td className="px-6 py-4 text-sm text-gray-600">987654321</td>
                <td className="px-6 py-4 text-sm">
                    <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">Veterinaria</span>
                </td>
                <td className="px-6 py-4 text-sm">
                    <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800">✗ No</span>
                </td>
                <td className="px-6 py-4 text-sm">
                    <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">✓ Sí</span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">2024-01-16 09:15</td>
                <td className="px-6 py-4 text-sm text-gray-600">2024-01-18 16:45</td>
            </tr>
            <tr className="hover:bg-gray-50 transition-colors duration-200">
                <td className="px-6 py-4 text-sm text-gray-900 font-medium">3</td>
                <td className="px-6 py-4 text-sm text-gray-900">Carlos Ruiz</td>
                <td className="px-6 py-4 text-sm text-gray-600">carlos@gmail.com</td>
                <td className="px-6 py-4 text-sm text-gray-600">456123789</td>
                <td className="px-6 py-4 text-sm">
                    <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">Operario</span>
                </td>
                <td className="px-6 py-4 text-sm">
                    <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">✓ Sí</span>
                </td>
                <td className="px-6 py-4 text-sm">
                    <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">✗ No</span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">2024-01-10 08:00</td>
                <td className="px-6 py-4 text-sm text-gray-600">2024-01-15 11:30</td>
            </tr>
        </tbody>
    </table>
</div>
    );
}