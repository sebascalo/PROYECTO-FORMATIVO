export default function TableBirth() {
    return (
        <table>
            {/* Tabla para mostrar los registros de nacimiento */}
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Identificación Madre</th>
                    <th>Nombre Madre</th>
                    <th>Nombre Ternero</th>
                    <th>Fecha Nacimiento</th>
                    <th>Sexo</th>
                    <th>Raza</th>
                    <th>Peso al Nacer</th>
                    <th>Condición</th>
                    <th>Observaciones</th>
                    <th>Responsable</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td>12345</td>
                    <td>Vaca Rosa</td>
                    <td>Ternero 1</td>
                    <td>2024-01-01</td>
                    <td>Macho</td>
                    <td>Holstein</td>
                    <td>35 kg</td>
                    <td>Normal</td>
                    <td>Sin problemas</td>
                    <td>Juan</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>67890</td>
                    <td>Vaca Luna</td>
                    <td>Ternero 2</td>
                    <td>2024-02-10</td>
                    <td>Hembra</td>
                    <td>Jersey</td>
                    <td>30 kg</td>
                    <td>Prematuro</td>
                    <td>Requirió ayuda</td>
                    <td>María</td>
                </tr>
                <tr>
                    <td>3</td>
                    <td>54321</td>
                    <td>Vaca Estrella</td>
                    <td>Ternero 3</td>
                    <td>2024-03-15</td>
                    <td>Macho</td>
                    <td>Angus</td>
                    <td>40 kg</td>
                    <td>Normal</td>
                    <td>Buen estado</td>
                    <td>Carlos</td>
                </tr>
            </tbody>
        </table>
    );
}