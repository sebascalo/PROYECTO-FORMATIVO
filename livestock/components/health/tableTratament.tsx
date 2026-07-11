export default function TableTratament() {
  return (

    <table>
      <thead>
        <tr>
          <th>identificador del animal</th>
          <th>fecha de tratamiento </th>
          <th>dosis aplicada</th>
          <th>lugar de aplicacion</th>
          <th>condicion de aplicacion</th>
          <th>responsable</th>
          <th>observaciones</th>
        
        </tr>
      </thead>
      <tbody>
        
        <tr>
          <td>3</td>
          <td>2023-01-01</td>
          <td>2 mL</td>
          <td>Establo A</td>
          <td>Buena</td>
          <td>Dr. Pérez</td>
          <td>Animal en buen estado</td>
        </tr>
        <tr>
          <td>5</td>
          <td>2023-01-15</td>
          <td>1 mL</td>
          <td>Establo B</td>
          <td>Regular</td>
          <td>Dr. García</td>
          <td>Requiere seguimiento</td>
        </tr>
        <th>
          <th>7</th>
          <th>2023-02-01</th>
          <th>3 mL</th>
          <th>Establo C</th>
          <th>Excelente</th>
          <th>Dr. López</th>
          <th>Animal en excelente estado</th>
        </th>
      </tbody>
    </table>
    
 
  );
}