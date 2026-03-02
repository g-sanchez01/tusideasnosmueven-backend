import express from 'express' // Traemos Express, que es el framework que nos permite crear un servidor web y manejar rutas, peticiones HTTP, middleware, etc.
import { createIdea } from '../controllers/ideaController.js' // Esta función es la que realmente se encargará de procesar la petición cuando alguien quiera “crear una idea”.

const router = express.Router() // Un router funciona como un mini-servidor dentro de tu servidor principal, que solo se encarga de un conjunto de rutas relacionadas (en este caso, todas las rutas relacionadas con “ideas”).

router.post('/', createIdea) // Eso significa que si tu servidor principal monta este router en /ideas, esta ruta será accesible en POST /ideas.

export default router // Exportamos el router para que pueda ser usado en nuestro servidor principal (app.js o server.js).
