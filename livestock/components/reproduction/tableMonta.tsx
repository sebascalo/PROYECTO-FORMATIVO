import React from "react";

export default function TableMonta() {
  return (
    <div className="overflow-x-auto shadow-lg rounded-lg">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gradient-to-r from-blue-500 to-blue-700">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">id de la vaca</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">identificador del toro</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">fecha de la monta</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">numero de servico</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">condicion de la vaca</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">responsable</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">observaciones</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          <tr className="hover:bg-gray-50 transition-colors duration-200">
            <td className="px-6 py-4 text-sm text-gray-900">1</td>
            <td className="px-6 py-4 text-sm text-gray-900">Bovino-045 (Vaca)</td>
            <td className="px-6 py-4 text-sm text-gray-900">Bovino-008 (Toro)</td>
            <td className="px-6 py-4 text-sm text-gray-900">2026-06-09</td>
            <td className="px-6 py-4 text-sm">
              <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">sana</span>
            </td>
            <td className="px-6 py-4 text-sm text-gray-900">Carlos Gómez</td>
            <td className="px-6 py-4 text-sm text-gray-500">monta exitosa sin novedades.</td>
          </tr>
          <tr className="hover:bg-gray-50 transition-colors duration-200">
            <td className="px-6 py-4 text-sm text-gray-900">2</td>
            <td className="px-6 py-4 text-sm text-gray-900">Bovino-102 (Vaca)</td>
            <td className="px-6 py-4 text-sm text-gray-900">Bovino-008 (Toro)</td>
            <td className="px-6 py-4 text-sm text-gray-900">2026-06-08</td>
            <td className="px-6 py-4 text-sm">
              <span className="px-2 py-1 text-xs rounded-full bg-purple-100 text-purple-800">Celo</span>
            </td>
            <td className="px-6 py-4 text-sm text-gray-900">Juan Pérez</td>
            <td className="px-6 py-4 text-sm text-gray-500">Monta</td>
          </tr>
          <tr className="hover:bg-gray-50 transition-colors duration-200">
            <td className="px-6 py-4 text-sm text-gray-900">3</td>
            <td className="px-6 py-4 text-sm text-gray-900">Bovino-205 (Vaca)</td>
            <td className="px-6 py-4 text-sm text-gray-900">Bovino-008 (Toro)</td>
            <td className="px-6 py-4 text-sm text-gray-900">2026-06-10</td>
            <td className="px-6 py-4 text-sm">
              <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">sana</span>
            </td>
            <td className="px-6 py-4 text-sm text-gray-900">Ana Martínez</td>
            <td className="px-6 py-4 text-sm text-gray-500">Monta exitosa sin novedades.</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}