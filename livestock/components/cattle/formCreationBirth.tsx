function FormCreationBirth() {
    return (
        <form>
            {/* formulario para crear un nuevo nacimiento */}
            <label htmlFor="motheridentification">Identificación de la madre:</label>
            <input type="text" id="motheridentification" name="motheridentification" />

            <label htmlFor="motherName">Nombre de la madre:</label>
            <input type="text" id="motherName" name="motherName" />

            <label htmlFor="calfName">Nombre del ternero:</label>
            <input type="text" id="calfName" name="calfName" />

            <label htmlFor="birthdate">Fecha de nacimiento:</label>
            <input type="date" id="birthdate" name="birthdate" />

            <label htmlFor="sex">Sexo:</label>
            <input type="text" id="sex" name="sex" />

            <label htmlFor="race">Raza:</label>
            <input type="text" id="race" name="race" />

            <label htmlFor="birthweight">Peso al nacer:</label>
            <input type="text" id="birthweight" name="birthweight" />

            <label htmlFor="conditionatbirth">Condición al nacer:</label>
            <input type="text" id="conditionatbirth" name="conditionatbirth" />

            <label htmlFor="observations">Observaciones:</label>
            <input type="text" id="observations" name="observations" />

            <label htmlFor="responsible">Responsable:</label>
            <input type="text" id="responsible" name="responsible" />

            <button type="submit">Crear Nacimiento</button>
        </form>
    )
}

export default FormCreationBirth;