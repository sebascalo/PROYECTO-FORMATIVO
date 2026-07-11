export default function TableAlimentation() {
  return (
    <table>
      <thead>
        <tr>
          <th>identificador del animal</th>
          <th>codigo del alimento</th>
          <th>tipo decomida</th>
          <th>cantidad de comida (g)</th>
          <th>frecuencia</th>
          <th>responsable</th>
          <th>fecha de alimentacion</th>
          <th>hora de alimentacion</th>
      

        </tr>
      </thead>
      <tbody>
        <tr>
          <td>35</td>
          <td>Alimento 1</td>
          <td>Comida 1</td>
          <td>500</td>
          <td>Diaria</td>
          <td>Dr. López</td>
          <td>2023-01-01</td>
          <td>08:00</td>
        </tr>
        <tr>
          <td>36</td>
          <td>Alimento 2</td>
          <td>Comida 2</td>
          <td>300</td>
          <td>Diaria</td>
          <td>Dr. García</td>
          <td>2023-01-01</td>
          <td>12:00</td>
        </tr>
        <tr>
          <td>37</td>
          <td>Alimento 3</td>
          <td>Comida 3</td>
          <td>400</td>
          <td>Diaria</td>
          <td>Dr. Martínez</td>
          <td>2023-01-01</td>
          <td>18:00</td>
        </tr>
        <tr>
          <th>38</th>
          <th>Alimento 4</th>
          <th>Comida 4</th>
          <th>600</th>
          <th>Diaria</th>
          <th>Dr. Rodríguez</th>
          <th>2023-01-01</th>
          <th>20:00</th>
        </tr>
      </tbody>
    </table>
  );
}