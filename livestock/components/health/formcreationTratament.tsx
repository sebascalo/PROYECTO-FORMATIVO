function FormcreationTratament() {
    return (
            <form>
                {/* Formulario para crear un registro de tratamiento */}
                <label htmlFor="name">identificador del animal:</label>
                <input type="text" id="name" name="name" required />
                <label htmlFor="date">Fecha de tratamiento:</label>
                <input type="date" id="date" name="date" required />
                <label htmlFor="dose">dosis aplicada:</label>
                <textarea id="dose" name="dose" required></textarea>
                <label htmlFor="location">lugar de aplicacion:</label>
                <textarea id="location" name="location" required></textarea>
                <label htmlFor="condition">condicion de aplicacion:</label>
                <textarea id="condition" name="condition" required></textarea>
                <label htmlFor="responsible">responsable:</label>
                <textarea id="responsible" name="responsible" required></textarea>
                <label htmlFor="observations">observaciones:</label>
                <textarea id="observations" name="observations" required></textarea>
                <button type="submit">Crear registro de tratamiento</button>
            </form>
    );
}
export default FormcreationTratament;