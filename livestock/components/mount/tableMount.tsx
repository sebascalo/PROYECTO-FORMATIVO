"use client";
import { useEffect, useState } from "react";

export default function tableMount() {
    const [mounts, setMounts] = useState([]);

    useEffect(() => {
        const fetchMounts = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/mount/MountAll');
                let resJson = await response.json();
                setMounts(resJson.info);
            } catch (error) {
                console.error('Error:', error);
                setMounts([]);
            }
        }
        fetchMounts();
    }, []);

    return (
        <div className="overflow-x-auto shadow-lg rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gradient-to-r from-blue-500 to-blue-700">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Vaca</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Toro</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Fecha</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Servicio</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Responsable</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Observaciones</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {mounts.map((mount: any) => (
                        <tr key={mount.id}>
                            <td className="px-6 py-4 whitespace-nowrap">{mount.id}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{mount.idBovine || '-'}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{mount.bullId || '-'}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{mount.breedingDate || '-'}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{mount.serviceNumber || '-'}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{mount.idResponsible || '-'}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{mount.observations || '-'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}