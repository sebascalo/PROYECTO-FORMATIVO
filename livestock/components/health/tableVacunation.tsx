export default function TableVacunation() {
  return (
<div className="overflow-x-auto shadow-lg rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gradient-to-r from-blue-500 to-blue-700">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                            identificador del animal
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                            fecha de vacunacion
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                            dosis aplicada
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                            lugar de aplicacion
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                            condicion de aplicacion
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                            responsable
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                            observaciones
                        </th>
                    </tr>
                </thead>

                <tbody className="bg-white divide-y divide-gray-200">
                    <tr className="hover:bg-gray-50 transition-colors duration-200">
                        <td className="px-6 py-4 text-sm text-gray-900">3</td>
                        <td className="px-6 py-4 text-sm text-gray-900">2023-01-01</td>
                        <td className="px-6 py-4 text-sm text-gray-900">2 mL</td>
                        <td className="px-6 py-4 text-sm text-gray-900">Establo A</td>
                        <td className="px-6 py-4 text-sm text-gray-900">Buena</td>
                        <td className="px-6 py-4 text-sm text-gray-900">Dr. Pérez</td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                            Animal en buen estado
                        </td>
                    </tr>

                    <tr className="hover:bg-gray-50 transition-colors duration-200">
                        <td className="px-6 py-4 text-sm text-gray-900">5</td>
                        <td className="px-6 py-4 text-sm text-gray-900">2023-01-15</td>
                        <td className="px-6 py-4 text-sm text-gray-900">1 mL</td>
                        <td className="px-6 py-4 text-sm text-gray-900">Establo B</td>
                        <td className="px-6 py-4 text-sm text-gray-900">Regular</td>
                        <td className="px-6 py-4 text-sm text-gray-900">Dr. García</td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                            Requiere seguimiento
                        </td>
                    </tr>

                    <tr className="hover:bg-gray-50 transition-colors duration-200">
                        <td className="px-6 py-4 text-sm text-gray-900">7</td>
                        <td className="px-6 py-4 text-sm text-gray-900">2023-02-01</td>
                        <td className="px-6 py-4 text-sm text-gray-900">3 mL</td>
                        <td className="px-6 py-4 text-sm text-gray-900">Establo C</td>
                        <td className="px-6 py-4 text-sm text-gray-900">Excelente</td>
                        <td className="px-6 py-4 text-sm text-gray-900">Dr. López</td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                            Animal en excelente estado
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
  );
}