/* Es el punto de entrada de tu aplicación Node.js con Express. */

import express from 'express' // Importa el framework Express, que facilita crear un servidor web en Node.js
import cors from 'cors' // Importa el middleware CORS, que permite controlar qué dominios pueden hacer peticiones a tu servidor.
import dotenv from 'dotenv' // Permite cargar variables de entorno desde un archivo .env, como el puerto o credenciales de correo.
import ideasRoute from './routes/ideasRoute.js' // Se usarán para manejar peticiones relacionadas con “ideas”.

dotenv.config() // Esto lee el archivo .env y carga sus variables en process.env

// Configurar la aplicacion
const app = express() // Crea una instancia de la aplicación Express. Es tu “servidor” principal.


app.use(cors()) // Activa CORS, para permitir que tu API reciba peticiones desde otros dominios.
app.use(express.json()) // Permite que Express pueda interpretar peticiones con contenido JSON. Esto es útil cuando envías datos desde un formulario o front-end.
app.use('/api/ideas', ideasRoute) // Definir ruta


// Definir puerto
const PORT = process.env.PORT || 8080

// Arrancar app
app.listen(PORT, () => {
    console.log('El servidor se esta ejecutando en el puerto:', PORT)
})