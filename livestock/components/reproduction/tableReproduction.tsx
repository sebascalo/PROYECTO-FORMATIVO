export default function TableArtificialInsemination() {
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>ID Animal / Vaca</th>
          <th>ID Toro / Semen</th>
          <th>Fecha Servicio</th>
          <th>Dosis / N° Servicio</th>
          <th>Condición</th>
          <th>Responsable</th>
          <th>Observaciones</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Bovino-045 (Vaca)</td>
          <td>SEM-992 (Pajilla)</td>
          <td>2026-06-09</td>
          <td>1.5 cc</td>
          <td>---</td>
          <td>Carlos Gómez</td>
          <td>Inseminación exitosa sin novedades.</td>
        </tr>
        <tr>
          <td>2</td>
          <td>Bovino-102 (Vaca)</td>
          <td>Bovino-008 (Toro)</td>
          <td>2026-06-08</td>
          <td>Servicio N° 2</td>
          <td>Celo</td>
          <td>Juan Pérez</td>
          <td>Monta </td>
        </tr>
        {/* Aquí puedes modificar los datos de la tercera fila como quieras */}
        <tr>
          <td>3</td>
          <td>Bovino-205 (Vaca)</td>
          <td>SEM-554 (Pajilla)</td>
          <td>2026-06-10</td>
          <td>2.0 cc</td>
          <td>Anestro</td>
          <td>Ana Martínez</td>
          <td>Se aplicó protocolo de sincronización previamente.</td>
        </tr>
      </tbody>
    </table>
  );
}