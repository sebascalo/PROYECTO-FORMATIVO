export default function TableMilk(){
    return (
        <div className="overflow-x-auto shadow-lg rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gradient-to-r from-blue-500 to-blue-700">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">id</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">idvaca</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">fecha de ordeño</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">turno</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">cantidad (L)</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">calidad</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">observaciones</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">responsable</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    <tr className="hover:bg-gray-50 transition-colors duration-200">
                        <td className="px-6 py-4 text-sm text-gray-900">3001</td>
                        <td className="px-6 py-4 text-sm text-gray-900">100</td>
                        <td className="px-6 py-4 text-sm text-gray-900">2023-01-01</td>
                        <td className="px-6 py-4 text-sm">
                            <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">Mañana</span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">10</td>
                        <td className="px-6 py-4 text-sm">
                            <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Buena</span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">Ninguna</td>
                        <td className="px-6 py-4 text-sm text-gray-900">Juan Pérez</td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition-colors duration-200">
                        <td className="px-6 py-4 text-sm text-gray-900">3002</td>
                        <td className="px-6 py-4 text-sm text-gray-900">120</td>
                        <td className="px-6 py-4 text-sm text-gray-900">2023-01-02</td>
                        <td className="px-6 py-4 text-sm">
                            <span className="px-2 py-1 text-xs rounded-full bg-orange-100 text-orange-800">Tarde</span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">15</td>
                        <td className="px-6 py-4 text-sm">
                            <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">Regular</span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">Algunas manchas</td>
                        <td className="px-6 py-4 text-sm text-gray-900">María García</td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition-colors duration-200">
                        <td className="px-6 py-4 text-sm text-gray-900">3003</td>
                        <td className="px-6 py-4 text-sm text-gray-900">150</td>
                        <td className="px-6 py-4 text-sm text-gray-900">2023-01-03</td>
                        <td className="px-6 py-4 text-sm">
                            <span className="px-2 py-1 text-xs rounded-full bg-purple-100 text-purple-800">Noche</span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">12</td>
                        <td className="px-6 py-4 text-sm">
                            <span className="px-2 py-1 text-xs rounded-full bg-emerald-100 text-emerald-800">Excelente</span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">Ninguna</td>
                        <td className="px-6 py-4 text-sm text-gray-900">Carlos López</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}