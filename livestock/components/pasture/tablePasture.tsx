export default function tablePasture(){
    return (
        <div className="overflow-x-auto shadow-lg rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gradient-to-r from-blue-500 to-blue-700">
                    <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">id</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">nombre</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">extencion (ha)</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">capacidad maxima</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">tipo de pastura</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">estado actual</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">dias de descanzo</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">dias de ocupacion</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    <tr className="hover:bg-gray-50 transition-colors duration-200">
                        <td className="px-4 py-3 text-sm">1</td>
                        <td className="px-4 py-3 text-sm font-medium text-gray-900">Pastura A</td>
                        <td className="px-4 py-3 text-sm">10</td>
                        <td className="px-4 py-3 text-sm">20</td>
                        <td className="px-4 py-3 text-sm">Hierba</td>
                        <td className="px-4 py-3 text-sm">
                            <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Activa</span>
                        </td>
                        <td className="px-4 py-3 text-sm">5</td>
                        <td className="px-4 py-3 text-sm">10</td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition-colors duration-200">
                        <td className="px-4 py-3 text-sm">2</td>
                        <td className="px-4 py-3 text-sm font-medium text-gray-900">Pastura B</td>
                        <td className="px-4 py-3 text-sm">15</td>
                        <td className="px-4 py-3 text-sm">30</td>
                        <td className="px-4 py-3 text-sm">Hierba</td>
                        <td className="px-4 py-3 text-sm">
                            <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">En descanso</span>
                        </td>
                        <td className="px-4 py-3 text-sm">10</td>
                        <td className="px-4 py-3 text-sm">0</td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition-colors duration-200">
                        <td className="px-4 py-3 text-sm">3</td>
                        <td className="px-4 py-3 text-sm font-medium text-gray-900">Pastura C</td>
                        <td className="px-4 py-3 text-sm">20</td>
                        <td className="px-4 py-3 text-sm">40</td>
                        <td className="px-4 py-3 text-sm">Hierba</td>
                        <td className="px-4 py-3 text-sm">
                            <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Activa</span>
                        </td>
                        <td className="px-4 py-3 text-sm">0</td>
                        <td className="px-4 py-3 text-sm">15</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}