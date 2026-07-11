export default function tableBovine() {
    return (
        <div className="overflow-x-auto shadow-lg rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gradient-to-r from-blue-500 to-blue-700">
                    <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">ID</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Nombre</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Raza</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Fecha Ingreso</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Potrero</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Fecha Nac.</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Foto</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Peso Actual</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Clasificación</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Estado</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    <tr className="hover:bg-gray-50 transition-colors duration-200">
                        <td className="px-4 py-4 text-sm text-gray-900 font-medium">100</td>
                        <td className="px-4 py-4 text-sm text-gray-900 font-medium">Vaca 1</td>
                        <td className="px-4 py-4 text-sm text-gray-600">
                            <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">Holstein</span>
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-600">2023-01-01</td>
                        <td className="px-4 py-4 text-sm text-gray-600">Potrero A</td>
                        <td className="px-4 py-4 text-sm text-gray-600">2020-01-01</td>
                        <td className="px-4 py-4 text-sm text-gray-600">
                            <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-600">📷 foto 1</span>
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-900 font-semibold">500 kg</td>
                        <td className="px-4 py-4 text-sm">
                            <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Leche</span>
                        </td>
                        <td className="px-4 py-4 text-sm">
                            <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">✓ Activa</span>
                        </td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition-colors duration-200">
                        <td className="px-4 py-4 text-sm text-gray-900 font-medium">120</td>
                        <td className="px-4 py-4 text-sm text-gray-900 font-medium">Vaca 2</td>
                        <td className="px-4 py-4 text-sm text-gray-600">
                            <span className="px-2 py-1 text-xs rounded-full bg-purple-100 text-purple-800">Jersey</span>
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-600">2023-02-01</td>
                        <td className="px-4 py-4 text-sm text-gray-600">Potrero B</td>
                        <td className="px-4 py-4 text-sm text-gray-600">2021-02-01</td>
                        <td className="px-4 py-4 text-sm text-gray-600">
                            <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-600">📷 foto 2</span>
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-900 font-semibold">450 kg</td>
                        <td className="px-4 py-4 text-sm">
                            <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Leche</span>
                        </td>
                        <td className="px-4 py-4 text-sm">
                            <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">✓ Activa</span>
                        </td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition-colors duration-200">
                        <td className="px-4 py-4 text-sm text-gray-900 font-medium">150</td>
                        <td className="px-4 py-4 text-sm text-gray-900 font-medium">Vaca 3</td>
                        <td className="px-4 py-4 text-sm text-gray-600">
                            <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800">Angus</span>
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-600">2023-03-01</td>
                        <td className="px-4 py-4 text-sm text-gray-600">Potrero C</td>
                        <td className="px-4 py-4 text-sm text-gray-600">2022-03-01</td>
                        <td className="px-4 py-4 text-sm text-gray-600">
                            <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-600">📷 foto 3</span>
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-900 font-semibold">400 kg</td>
                        <td className="px-4 py-4 text-sm">
                            <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800">Carne</span>
                        </td>
                        <td className="px-4 py-4 text-sm">
                            <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">⏳ En descanso</span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}