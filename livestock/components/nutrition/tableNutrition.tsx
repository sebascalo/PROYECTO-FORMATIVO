export default function TableNutrition() {
  return (
<div className="overflow-x-auto shadow-lg rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gradient-to-r from-blue-500 to-blue-700">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                            Identificador del animal
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                            Código del alimento
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                            Tipo de comida
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                            Cantidad de comida (g)
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                            Frecuencia
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                            Responsable
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                            Fecha de alimentación
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                            Hora de alimentación
                        </th>
                    </tr>
                </thead>

                <tbody className="bg-white divide-y divide-gray-200">
                    <tr className="hover:bg-gray-50 transition-colors duration-200">
                        <td className="px-6 py-4 text-sm text-gray-900">35</td>
                        <td className="px-6 py-4 text-sm text-gray-900">Alimento 1</td>
                        <td className="px-6 py-4 text-sm text-gray-900">Comida 1</td>
                        <td className="px-6 py-4 text-sm text-gray-900">500</td>
                        <td className="px-6 py-4 text-sm text-gray-900">Diaria</td>
                        <td className="px-6 py-4 text-sm text-gray-900">Dr. López</td>
                        <td className="px-6 py-4 text-sm text-gray-900">2023-01-01</td>
                        <td className="px-6 py-4 text-sm text-gray-900">08:00</td>
                    </tr>

                    <tr className="hover:bg-gray-50 transition-colors duration-200">
                        <td className="px-6 py-4 text-sm text-gray-900">36</td>
                        <td className="px-6 py-4 text-sm text-gray-900">Alimento 2</td>
                        <td className="px-6 py-4 text-sm text-gray-900">Comida 2</td>
                        <td className="px-6 py-4 text-sm text-gray-900">300</td>
                        <td className="px-6 py-4 text-sm text-gray-900">Diaria</td>
                        <td className="px-6 py-4 text-sm text-gray-900">Dr. García</td>
                        <td className="px-6 py-4 text-sm text-gray-900">2023-01-01</td>
                        <td className="px-6 py-4 text-sm text-gray-900">12:00</td>
                    </tr>

                    <tr className="hover:bg-gray-50 transition-colors duration-200">
                        <td className="px-6 py-4 text-sm text-gray-900">37</td>
                        <td className="px-6 py-4 text-sm text-gray-900">Alimento 3</td>
                        <td className="px-6 py-4 text-sm text-gray-900">Comida 3</td>
                        <td className="px-6 py-4 text-sm text-gray-900">400</td>
                        <td className="px-6 py-4 text-sm text-gray-900">Diaria</td>
                        <td className="px-6 py-4 text-sm text-gray-900">Dr. Martínez</td>
                        <td className="px-6 py-4 text-sm text-gray-900">2023-01-01</td>
                        <td className="px-6 py-4 text-sm text-gray-900">18:00</td>
                    </tr>

                    <tr className="hover:bg-gray-50 transition-colors duration-200">
                        <td className="px-6 py-4 text-sm text-gray-900">38</td>
                        <td className="px-6 py-4 text-sm text-gray-900">Alimento 4</td>
                        <td className="px-6 py-4 text-sm text-gray-900">Comida 4</td>
                        <td className="px-6 py-4 text-sm text-gray-900">600</td>
                        <td className="px-6 py-4 text-sm text-gray-900">Diaria</td>
                        <td className="px-6 py-4 text-sm text-gray-900">Dr. Rodríguez</td>
                        <td className="px-6 py-4 text-sm text-gray-900">2023-01-01</td>
                        <td className="px-6 py-4 text-sm text-gray-900">20:00</td>
                    </tr>
                </tbody>
            </table>
        </div>
  );
}