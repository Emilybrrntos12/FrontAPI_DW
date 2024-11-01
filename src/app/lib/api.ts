// src/app/lib/api.ts
import { parseStringPromise } from 'xml2js';

function formatTipoCambioData(data: any) {
    // Realiza cualquier transformación necesaria aquí.
    return {
        id: data.id,
        numeroSolicitud: data.numeroSolicitud,
        tipoCambio: data.tipoCambio.InfoVariable.CambioDolar[0].VarDolar[0].referencia[0],
        fechaConsulta: data.fechaConsulta,
    };
}


export async function fetchTipoCambio() {
    const response = await fetch('http://localhost:8080/api/tipo-cambio/consultar');
    if (!response.ok) {
        throw new Error('Error al consultar el tipo de cambio');
    }

    // Obtén el JSON directamente
    const jsonData = await response.json();

    // Ahora analiza el XML contenido en `tipoCambio`
    const xmlData = await parseStringPromise(jsonData.tipoCambio);

    // Si necesitas procesar el XML para extraer ciertos valores, hazlo aquí
    return formatTipoCambioData({
        ...jsonData,
        tipoCambio: xmlData
    });
}

export async function fetchUltimoTipoCambio() {
    const response = await fetch('http://localhost:8080/api/tipo-cambio/ultimo');
    if (!response.ok) {
        throw new Error('Error al obtener el último tipo de cambio');
    }

    const jsonData = await response.json();
    const xmlData = await parseStringPromise(jsonData.tipoCambio);

    return formatTipoCambioData({
        ...jsonData,
        tipoCambio: xmlData
    });
}
