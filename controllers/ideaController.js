import { sendIdeaEmail } from '../services/ideaService.js' // pertenece al service. Se encarga de la lógica de negocio (enviar correo).
import { validateIdea } from '../models/ideaModel.js'  // pertenece al modelo. Se encarga de validar datos.
import { saveIdeaToOneDrive } from '../services/excelCloudService.js'

/*  req = request → lo que viene del cliente (tu formulario Vue).
    res = response → lo que le vas a devolver al cliente.
    async → porque vas a usar await (operaciones asíncronas como enviar un correo). */

export async function createIdea(req, res) {
    try {
        validateIdea(req.body) // Aquí validas los datos que vienen del frontend.

        newId = await saveIdeaToOneDrive(req.body) // Espera la validacion. Aqui guarda las ideas generadas.
        console.log('Idea guardada con ID:', newId)

        try {
            await sendIdeaEmail(req.body) // espera a que termine de enviarse el correo antes de continuar
        } catch (emailError) {
            console.error('Error enviando email:', emailError.message)
        }

        res.status(200).json({ message: 'Tus ideas han sido enviadas con exito' }) // Devuelve un JSON

    } catch (error) {
        res.status(400).json({ error: error.message }) // Si algo falla en validación o envío
    }
}