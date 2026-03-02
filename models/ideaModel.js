/*Aquí se toman cuatro propiedades del objeto data que se espera que tenga la información de la idea:*/

export const validateIdea = (data) => {
    const { nombreIdea, descripcionIdea, nombreEmpleado, numeroEmpleado, businessUnitOptions, businessZone, phoneNumber, area } = data

    // Este bloque verifica que ninguno de los campos esté vacío, undefined o null.
    if (!nombreIdea || !descripcionIdea || !nombreEmpleado || !numeroEmpleado || !businessUnitOptions || !businessZone || !phoneNumber || !area) {
        throw new Error('Todos los campos son obligatorios')
    }

    // Si no es numérico, lanza un error indicando que debe ser un número.
    if (isNaN(numeroEmpleado, phoneNumber)) {
        throw new Error('El número de empleado debe ser numérico')
    }
}
