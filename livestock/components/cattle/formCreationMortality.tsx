function FormCreationMortality() {
    return (
        <form>
            {/* Formulario para crear un registro de mortalidad */}
            <label htmlFor="animalidentification">Identificación del animal:</label>
            <input type="text" id="animalidentification" name="animalidentification" />

            <label htmlFor="dateofdeath">Fecha de muerte:</label>
            <input type="date" id="dateofdeath" name="dateofdeath" />

            <label htmlFor="causeofdeath">Causa de muerte:</label>
            <input type="text" id="causeofdeath" name="causeofdeath" />

            <label htmlFor="responsible">Responsable:</label>
            <input type="text" id="responsible" name="responsible" />

            <label htmlFor="fateoftheanimal">Destino del animal:</label>
            <input type="text" id="fateoftheanimal" name="fateoftheanimal" />

            <label htmlFor="observations">Observaciones:</label>
            <input type="text" id="observations" name="observations" />

            <button type="submit">Create Mortality</button>
        </form>
    )
}

export default FormCreationMortality;