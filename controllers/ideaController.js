import { sendIdeaEmail } from '../services/ideaService.js' // pertenece al service. Se encarga de la lógica de negocio (enviar correo).
import { appendToSheet } from '../services/googleSheetsService.js'
import { validateIdea } from '../models/ideaModel.js'

/*  req = request → lo que viene del cliente (tu formulario Vue).
    res = response → lo que le vas a devolver al cliente.
    async → porque vas a usar await (operaciones asíncronas como enviar un correo). */

export async function createIdea(req, res) {
    try {

        validateIdea(req.body)
        
        await appendToSheet(req.body)

        try {
            await sendIdeaEmail(req.body)
        } catch (emailError) {
            console.error('Error enviando email:', emailError.message)
        }

        res.status(200).json({
            message: 'Tus ideas han sido enviadas con exito'
        })

    } catch (error) {
        console.error(error)
        res.status(400).json({ error: error.message })
    }
}