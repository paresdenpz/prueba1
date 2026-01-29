import { useState } from 'react';

function App() {
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const testConnection = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/test');
            const data = await response.json();
            setMessage(data.message);
        } catch (error) {
            setMessage('Error al conectar con el servidor');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            backgroundColor: '#0f172a',
            color: 'white',
            margin: 0
        }}>
            <div style={{
                padding: '2rem',
                borderRadius: '1rem',
                backgroundColor: '#1e293b',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                textAlign: 'center'
            }}>
                <h1 style={{ marginBottom: '1.5rem', fontSize: '2rem' }}>Railway Project</h1>
                <button
                    onClick={testConnection}
                    disabled={loading}
                    style={{
                        padding: '0.75rem 1.5rem',
                        fontSize: '1rem',
                        fontWeight: '600',
                        backgroundColor: '#3b82f6',
                        color: 'white',
                        border: 'none',
                        borderRadius: '0.5rem',
                        cursor: 'pointer',
                        transition: 'background-color 0.2s',
                        opacity: loading ? 0.7 : 1
                    }}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#2563eb'}
                    onMouseOut={(e) => e.target.style.backgroundColor = '#3b82f6'}
                >
                    {loading ? 'Cargando...' : 'Probar Conexión'}
                </button>
                {message && (
                    <p style={{
                        marginTop: '1.5rem',
                        fontSize: '1.1rem',
                        color: '#10b981',
                        fontWeight: '500'
                    }}>
                        {message}
                    </p>
                )}
            </div>
        </div>
    );
}

export default App;
