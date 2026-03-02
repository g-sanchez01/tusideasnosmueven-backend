import axios from 'axios' // es tu cliente HTTP. Básicamente un mensajero elegante que hace peticiones REST.
import { getAccessToken } from './authService.js' // el generador de credenciales temporales

// Esta función recibe un buffer.
// Un buffer en Node.js es memoria binaria cruda. No texto bonito. No JSON. Bytes. Perfecto para archivos como Excel.
export async function uploadFileToOneDrive(buffer) {

  const accessToken = await getAccessToken() // Primero pides el token.
  console.log('TOKEN:', accessToken)

  // Quiero escribir directamente este archivo Excel en esta carpeta del OneDrive de este usuario”.
  const url = `https://graph.microsoft.com/v1.0/users/${process.env.ONEDRIVE_USER}/drive/root:/Ideas/ideas.xlsx:/content`

  await axios.put(url, buffer, { // PUT significa “crear o reemplazar”.
    headers: {
      Authorization: `Bearer ${accessToken}`, // prueba criptográfica de que tu app tiene permiso.
      'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' // estás enviando un archivo Excel moderno (.xlsx).
    }
  })
}

// Función de descarga:
export async function downloadFileFromOneDrive() {

  const accessToken = await getAccessToken()

  const url = `https://graph.microsoft.com/v1.0/users/${process.env.ONEDRIVE_USER}/drive/root:/Ideas/ideas.xlsx:/content`

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      responseType: 'arraybuffer' // es clave.
    })

    // Transformas esos bytes en un Buffer de Node.js.
    // Eso te permite manipularlo con librerías como xlsx, guardarlo en disco o volverlo a subir modificado.
    return Buffer.from(response.data)

  } catch (error) {
    // Si no existe el archivo todavía
    if (error.response?.status === 404) {
      return null
    }
    throw error
  }
}