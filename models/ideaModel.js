/*Aquí se toman cuatro propiedades del objeto data que se espera que tenga la información de la idea:*/

export const validateIdea = (data) => {
    const { nombreIdea, descripcionIdea, nombreEmpleado, numeroEmpleado, businessUnitOptions, businessZone, phoneNumber, area } = data

    // Este bloque verifica que ninguno de los campos esté vacío, undefined o null.
    if (!nombreIdea || !descripcionIdea || !nombreEmpleado || !numeroEmpleado || !businessUnitOptions || !businessZone || !phoneNumber || !area) {
        throw new Error('Todos los campos son obligatorios')
    }

    if (isNaN(numeroEmpleado)) {
        throw new Error('El número de empleado debe ser numérico')
    }

    if (isNaN(phoneNumber)) {
        throw new Error('El número de teléfono debe ser numérico')
    }
}
