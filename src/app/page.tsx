"use client";

import { useEffect, useState } from 'react';
import { fetchTipoCambio, fetchUltimoTipoCambio } from './lib/api';
import { TipoCambioRegistro } from './types';

export default function HomePage() {
    const [tipoCambio, setTipoCambio] = useState<TipoCambioRegistro | null>(null);
    const [ultimoTipoCambio, setUltimoTipoCambio] = useState<TipoCambioRegistro | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [showConsulta, setShowConsulta] = useState(false); // Nuevo estado para mostrar "Última Consulta"

    async function loadData() {
        try {
            const data = await fetchTipoCambio();
            setTipoCambio(data);
            setShowConsulta(true); // Muestra la consulta al hacer clic en el botón
        } catch (err) {
            setError((err as Error).message);
        }
    }

    useEffect(() => {
        // Cargar solo el último registro al inicio
        async function loadUltimoTipoCambio() {
            try {
                const ultimoData = await fetchUltimoTipoCambio();
                setUltimoTipoCambio(ultimoData);
            } catch (err) {
                setError((err as Error).message);
            }
        }
        loadUltimoTipoCambio();
    }, []);

    if (error) {
        return <div style={{ color: 'red', fontWeight: 'bold', textAlign: 'center' }}>Error: {error}</div>;
    }

    return (
        <main style={{
            padding: '40px',
            fontFamily: 'Arial, sans-serif',
            background: 'linear-gradient(135deg, #ffffff, #e8f0ff)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            minHeight: '100vh'
        }}>
            <h1 style={{ color: '#2E3A59', textAlign: 'center', fontSize: '2.5em', marginBottom: '40px', fontWeight: 'bold' }}>
                Consulta de Tipo de Cambio
            </h1>

            <button 
                onClick={loadData} 
                style={{
                    padding: '10px 20px',
                    fontSize: '1em',
                    color: '#FFFFFF',
                    backgroundColor: '#4CAF50',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    marginBottom: '20px',
                    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
                    transition: 'background-color 0.3s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#45A049'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#4CAF50'}
            >
                Consultar
            </button>
            
            {showConsulta && tipoCambio ? (
                <section style={{
                    backgroundColor: '#F5F8FF',
                    padding: '20px',
                    borderRadius: '15px',
                    maxWidth: '600px',
                    width: '100%',
                    boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.1)',
                    marginBottom: '20px',
                    color: '#374785'
                }}>
                    <h2 style={{ color: '#374785', fontSize: '1.8em', marginBottom: '15px', textAlign: 'center' }}>Última Consulta</h2>
                    <p><strong>Número de Solicitud:</strong> {tipoCambio.numeroSolicitud}</p>
                    <p><strong>Tipo de Cambio:</strong> {tipoCambio.tipoCambio}</p>
                    <p><strong>Fecha de Consulta:</strong> {new Date(tipoCambio.fechaConsulta).toLocaleString()}</p>
                </section>
            ) : (
                showConsulta && <p style={{ textAlign: 'center', color: '#374785', fontSize: '1.2em' }}>Cargando datos...</p>
            )}

            {ultimoTipoCambio ? (
                <section style={{
                    backgroundColor: '#E6FAE6',
                    padding: '20px',
                    borderRadius: '15px',
                    maxWidth: '600px',
                    width: '100%',
                    boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.1)',
                    color: '#374785'
                }}>
                    <h2 style={{ color: '#374785', fontSize: '1.8em', marginBottom: '15px', textAlign: 'center' }}>Último Registro</h2>
                    <p><strong>Número de Solicitud:</strong> {ultimoTipoCambio.numeroSolicitud}</p>
                    <p><strong>Tipo de Cambio:</strong> {ultimoTipoCambio.tipoCambio}</p>
                    <p><strong>Fecha de Consulta:</strong> {new Date(ultimoTipoCambio.fechaConsulta).toLocaleString()}</p>
                </section>
            ) : (
                <p style={{ textAlign: 'center', color: '#374785', fontSize: '1.2em' }}>Cargando último registro...</p>
            )}
        </main>
    );
}
