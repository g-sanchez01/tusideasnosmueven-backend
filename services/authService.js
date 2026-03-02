import { ConfidentialClientApplication } from '@azure/msal-node' // Esta clase se usa cuando tu aplicación tiene un secreto (client secret) y puede autenticarse de forma segura en el backend.
import dotenv from 'dotenv'

dotenv.config() // Este método carga el contenido del archivo .env en process.env.

// Este bloque define cómo se va a autenticar tu aplicación.
const msalConfig = {
    auth: {
        clientId: process.env.AZURE_CLIENT_ID, // es el Application (client) ID que te da Azure cuando registras tu app.
        authority: `https://login.microsoftonline.com/${process.env.AZURE_TENANT_ID}`, // identifica tu organización en Azure AD.
        clientSecret: process.env.AZURE_CLIENT_SECRET // es la contraseña privada de la aplicación.
    }
}

const cca = new ConfidentialClientApplication(msalConfig) // con estos datos, créame un cliente capaz de pedir tokens de acceso

// Defines y exportas una función asíncrona que devolverá un access token
export async function getAccessToken() {
  try {
    const response = await cca.acquireTokenByClientCredential({ // usa el flujo Client Credentials.
      scopes: ['https://graph.microsoft.com/.default'] // dame los permisos configurados en Azure para Microsoft Graph.
    })

    console.log('MSAL RESPONSE:', response)

    // Validas que realmente exista accessToken.
    if (!response?.accessToken) {
      throw new Error('No se recibió accessToken')
    }

    return response.accessToken // Devuelves el token para que otra parte del backend lo use

    // Captura cualquier error en el proceso.
  } catch (error) {
    console.error('ERROR MSAL:', error)
    throw error
  }
}