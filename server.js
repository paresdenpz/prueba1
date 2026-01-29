import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { PrismaClient } from '@prisma/client';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Servir archivos estáticos del frontend
app.use(express.static(path.join(__dirname, 'dist')));

// API Routes
app.get('/api/test', (req, res) => {
  res.json({ message: "Conexión exitosa" });
});

app.get('/api/stores', async (req, res) => {
  try {
    const stores = await prisma.store.findMany();
    res.json(stores);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener las tiendas" });
  }
});

// Capturar todas las demás rutas y servir el index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor corriendo en http://0.0.0.0:${PORT}`);
});
