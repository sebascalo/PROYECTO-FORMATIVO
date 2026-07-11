function FormCreationWeighing() {
    return (
        <form>
            {/* Formulario para crear un registro de pesaje */}
            <label htmlFor="animalidentification">Identificación del animal:</label>
            <input type="text" id="animalidentification" name="animalidentification" />

            <label htmlFor="weighingdate">Fecha de pesaje:</label>
            <input type="date" id="weighingdate" name="weighingdate" />

            <label htmlFor="currentweight">Peso actual:</label>
            <input type="text" id="currentweight" name="currentweight" />

            <label htmlFor="profitorloss">Ganancia o pérdida:</label>
            <input type="text" id="profitorloss" name="profitorloss" />

            <label htmlFor="bodycondition">Condición corporal:</label>
            <input type="text" id="bodycondition" name="bodycondition" />

            <label htmlFor="observations">Observaciones:</label>
            <input type="text" id="observations" name="observations" />

            <label htmlFor="responsible">Responsable:</label>
            <input type="text" id="responsible" name="responsible" />

            <button type="submit">Create Weighing</button>
        </form>
    )
}

export default FormCreationWeighing;