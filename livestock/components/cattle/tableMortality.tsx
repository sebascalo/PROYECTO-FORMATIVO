export default function TableMortality() {
    return (
        <table>
            {/* Tabla para mostrar los registros de mortalidad */}
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Identificación</th>
                    <th>Fecha de muerte</th>
                    <th>Causa</th>
                    <th>Responsable</th>
                    <th>Destino</th>
                    <th>Observaciones</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td>12345</td>
                    <td>2024-01-10</td>
                    <td>Enfermedad</td>
                    <td>Juan</td>
                    <td>Enterrado</td>
                    <td>Se detectó tarde</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>67890</td>
                    <td>2024-02-05</td>
                    <td>Accidente</td>
                    <td>María</td>
                    <td>Incinerado</td>
                    <td>Caída en potrero</td>
                </tr>
                <tr>
                    <td>3</td>
                    <td>54321</td>
                    <td>2024-03-12</td>
                    <td>Desconocida</td>
                    <td>Carlos</td>
                    <td>Venta para consumo</td>
                    <td>En revisión</td>
                </tr>
            </tbody>
        </table>
    );
}