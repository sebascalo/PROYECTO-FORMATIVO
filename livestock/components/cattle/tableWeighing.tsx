export default function TableWeighing() {
    return (
        <table>
            {/* Tabla para mostrar los registros de pesaje */}
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Identificación</th>
                    <th>Fecha de pesaje</th>
                    <th>Peso actual</th>
                    <th>Ganancia/Pérdida</th>
                    <th>Condición corporal</th>
                    <th>Observaciones</th>
                    <th>Responsable</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td>12345</td>
                    <td>2024-01-10</td>
                    <td>500 kg</td>
                    <td>+20 kg</td>
                    <td>Normal</td>
                    <td>Buen progreso</td>
                    <td>Juan</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>67890</td>
                    <td>2024-02-15</td>
                    <td>450 kg</td>
                    <td>-10 kg</td>
                    <td>Delgado</td>
                    <td>Revisar alimentación</td>
                    <td>María</td>
                </tr>
                <tr>
                    <td>3</td>
                    <td>54321</td>
                    <td>2024-03-20</td>
                    <td>520 kg</td>
                    <td>+15 kg</td>
                    <td>Gordo</td>
                    <td>Excelente estado</td>
                    <td>Carlos</td>
                </tr>
            </tbody>
        </table>
    );
}