import XLSX from 'xlsx' // es una librería que permite leer y escribir archivos Excel sin abrir Excel.
import { uploadFileToOneDrive, downloadFileFromOneDrive } from './graphService.js'

// Aquí empieza la transformación: de JSON web a Excel estructurado.
export async function saveIdeaToOneDrive(data) {

  const fileBuffer = await downloadFileFromOneDrive() //

  let workbook
  let worksheet
  let rows = []

  if (fileBuffer) {
    workbook = XLSX.read(fileBuffer, { type: 'buffer' })
    worksheet = workbook.Sheets[workbook.SheetNames[0]]
    rows = XLSX.utils.sheet_to_json(worksheet)
  } else {
    workbook = XLSX.utils.book_new()
  }

  const newId = rows.length > 0
    ? Math.max(...rows.map(r => r.ID || 0)) + 1
    : 1

  const now = new Date()
  const fechaRegistro = now.toLocaleString('es-MX')

  const newRow = {
    ID: newId,
    Fecha_Registro: fechaRegistro,
    Nombre_Idea: data.nombreIdea,
    Descripcion_Idea: data.descripcionIdea,
    Nombre_Empleado: data.nombreEmpleado,
    Numero_Nomina: data.numeroEmpleado,
    Unidad_Negocio: data.businessUnitOptions,
    Zona_Negocio: data.businessZone,
    Area: data.area,
    Telefono: data.phoneNumber
  }

  rows.push(newRow)

  const newWorksheet = XLSX.utils.json_to_sheet(rows)

  if (workbook.SheetNames.includes('Ideas')) {
    workbook.Sheets['Ideas'] = newWorksheet
  } else {
    XLSX.utils.book_append_sheet(workbook, newWorksheet, 'Ideas')
  }

  const newBuffer = XLSX.write(workbook, {
    type: 'buffer',
    bookType: 'xlsx'
  })

  await uploadFileToOneDrive(newBuffer)

  return newId
}