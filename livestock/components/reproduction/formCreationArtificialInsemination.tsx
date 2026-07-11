function FormCreationArtificialInsemination() {
    return (
        <form>
            {/* Campos específicos para Inseminación Artificial (RF06) */}
            <label htmlFor="animalID">ID de la Vaca:</label>
            <input type="number" id="animalID" name="animalID" />

            <label htmlFor="inseminationDate">Fecha de Inseminación:</label>
            <input type="date" id="inseminationDate" name="inseminationDate"/>

            <label htmlFor="semenID">Identificación del Semen:</label>
            <input type="text" id="semenID" name="semenID" />

            <label htmlFor="donorBull">Toro Donante:</label>
            <input type="text" id="donorBull" name="donorBull" />

            <label htmlFor="semenDose">Dosis de Semen:</label>
            <input type="number" step="0.01" id="semenDose" name="semenDose"/>

            <label htmlFor="observations">Observaciones:</label>
            <textarea id="observations" name="observations"></textarea>

            <label htmlFor="responsible">Responsable:</label>
            <input type="text" id="responsible" name="responsible" />

            <button type="submit">Registrar Inseminación</button>
        </form>
    );
}

export default FormCreationArtificialInsemination;