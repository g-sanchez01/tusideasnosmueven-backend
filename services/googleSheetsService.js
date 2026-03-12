import { google } from "googleapis";
import fs from "fs";
import path from "path";

const serviceAccount = JSON.parse(
    fs.readFileSync(path.resolve("tus-ideas-nos-mueven.json"))
)

const auth = new google.auth.GoogleAuth({
    credentials: serviceAccount,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"]
})

export async function appendToSheet(data) {

    const client = await auth.getClient();

    const sheets = google.sheets({
        version: "v4",
        auth: client
    });

    const spreadsheetId = process.env.SHEET_GOOGLE_ID

    // Leer columna de IDs
    const response = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range: "Ideas!A:I"
    });

    const rows = response.data.values || [];

    // Generar siguiente id
    const nextId = rows.length

    // Insertar nueva fila
    await sheets.spreadsheets.values.append({
        spreadsheetId,
        range: "Ideas!A:I",
        valueInputOption: "USER_ENTERED",
        requestBody: {
            values: [
                [
                    nextId,
                    data.nombreEmpleado,
                    data.numeroEmpleado,
                    data.phoneNumber,
                    data.businessUnitOptions,
                    data.businessZone,
                    data.area,
                    data.nombreIdea,
                    data.descripcionIdea

                ]
            ]
        }
    })

    console.log("Fila agregada a Google Sheets")
}