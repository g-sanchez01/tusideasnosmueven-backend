/* Es un servicio que encapsula toda la lógica de envío de correos, separándola del controlador y de la vista. */
import { createTransport } from '../config/nodemailer.js' // Esta función se encarga de configurar el cliente de correo con tus credenciales y datos del servidor SMTP (

export async function sendIdeaEmail(data) { // Recibe un parámetro data, que es un objeto con la información de la idea y del empleado que la registra

    const transporter = createTransport( // devuelve un objeto que sabe enviar correos.
        // Se usan variables de entorno (process.env) para no exponer tus credenciales en el código.
        process.env.EMAIL_HOST, 
        Number(process.env.EMAIL_PORT), // asegura que el puerto se pase como número.
        process.env.EMAIL_USER,
        process.env.EMAIL_PASS
    )

    // El await asegura que Node espere hasta que el correo se envíe antes de continuar.
    await transporter.sendMail({
        from: `"Sistema de Ideas" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_RECEIVER,
        subject: `Nueva idea: ${data.nombreIdea}`,
        html: `
            <h2>Nueva Idea Registrada</h2>
            <p><strong>Nombre del Empleado:</strong> ${data.nombreEmpleado}</p>
            <p><strong>Número de Nomina:</strong> ${data.numeroEmpleado}</p>
            <p><strong>Número de Telefono:</strong> ${data.phoneNumber}</p>
            <p><strong>Unidad de Negocio:</strong> ${data.businessUnitOptions}</p>
            <p><strong>Zona:</strong> ${data.businessZone}</p>
            <p><strong>Area a la que va dirigida:</strong> ${data.area}</p>
            <p><strong>Nombre de la idea:</strong> ${data.nombreIdea}</p>
            <p><strong>Descripción:</strong> ${data.descripcionIdea}</p>
            
        `
    })
}
