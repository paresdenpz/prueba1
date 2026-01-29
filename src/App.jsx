import { useState, useEffect } from 'react';

function App() {
    const [stores, setStores] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchStores = async () => {
        try {
            const response = await fetch('/api/stores');
            const data = await response.json();
            if (Array.isArray(data)) {
                setStores(data);
            }
        } catch (error) {
            console.error('Error fetching stores:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStores();
    }, []);

    return (
        <div style={{
            minHeight: '100vh',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            backgroundColor: '#0f172a',
            color: 'white',
            padding: '2rem',
        }}>
            <div style={{
                maxWidth: '1200px',
                margin: '0 auto',
                backgroundColor: '#1e293b',
                padding: '2rem',
                borderRadius: '1rem',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
            }}>
                <h1 style={{
                    textAlign: 'center',
                    marginBottom: '2rem',
                    fontSize: '2.5rem',
                    background: 'linear-gradient(to right, #38bdf8, #818cf8)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    fontWeight: 'bold'
                }}>
                    Panel de Tiendas (Railway)
                </h1>

                {loading ? (
                    <p style={{ textAlign: 'center', color: '#94a3b8' }}>Cargando datos de la base de datos...</p>
                ) : (
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
                            <thead>
                                <tr style={{ backgroundColor: '#334155', color: '#f8fafc' }}>
                                    <th style={{ padding: '12px', border: '1px solid #475569' }}>ID</th>
                                    <th style={{ padding: '12px', border: '1px solid #475569' }}>Nombre</th>
                                    <th style={{ padding: '12px', border: '1px solid #475569' }}>Dirección</th>
                                    <th style={{ padding: '12px', border: '1px solid #475569' }}>Teléfono</th>
                                    <th style={{ padding: '12px', border: '1px solid #475569' }}>Email Alerta</th>
                                    <th style={{ padding: '12px', border: '1px solid #475569' }}>Estado</th>
                                    <th style={{ padding: '12px', border: '1px solid #475569' }}>Max Horas Turno</th>
                                </tr>
                            </thead>
                            <tbody>
                                {stores.map((store) => (
                                    <tr key={store.id} style={{ borderBottom: '1px solid #334155', hover: { backgroundColor: '#1e293b' } }}>
                                        <td style={{ padding: '12px', border: '1px solid #334155' }}>{store.id}</td>
                                        <td style={{ padding: '12px', border: '1px solid #334155', fontWeight: 'bold' }}>{store.name}</td>
                                        <td style={{ padding: '12px', border: '1px solid #334155' }}>{store.address || '-'}</td>
                                        <td style={{ padding: '12px', border: '1px solid #334155' }}>{store.phone || '-'}</td>
                                        <td style={{ padding: '12px', border: '1px solid #334155' }}>{store.alertEmail || '-'}</td>
                                        <td style={{ padding: '12px', border: '1px solid #334155' }}>
                                            <span style={{
                                                padding: '4px 8px',
                                                borderRadius: '4px',
                                                backgroundColor: store.status === 'active' ? '#065f46' : '#7f1d1d',
                                                color: '#ecfdf5',
                                                fontSize: '0.8rem'
                                            }}>
                                                {store.status || 'N/A'}
                                            </span>
                                        </td>
                                        <td style={{ padding: '12px', border: '1px solid #334155', textAlign: 'center' }}>{store.maxShiftHours || 0}h</td>
                                    </tr>
                                ))}
                                {stores.length === 0 && (
                                    <tr>
                                        <td colSpan="7" style={{ padding: '30px', textAlign: 'center', color: '#94a3b8' }}>
                                            No se encontraron tiendas en la tabla public."Store".
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;
