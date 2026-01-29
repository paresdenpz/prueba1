import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { PrismaClient } from '@prisma/client';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL
    }
  }
});
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
    console.error("DEBUG ERROR:", error);
    res.status(500).json({
      error: "Error al obtener las tiendas",
      details: error.message,
    });
  }
});

app.get('/api/returns', async (req, res) => {
  try {
    const returns = await prisma.return.findMany({
      include: {
        Store: true,
        User: true,
        ReturnItem: {
          include: {
            Product: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
    res.json(returns);
  } catch (error) {
    console.error("GET Returns Error:", error);
    res.status(500).json({ error: "Error al obtener devoluciones" });
  }
});

app.post('/api/returns', async (req, res) => {
  try {
    const { originalSaleId, storeId, userId, totalRefund, reason, notes, paymentMethod, items } = req.body;

    const result = await prisma.$transaction(async (tx) => {
      return await tx.return.create({
        data: {
          originalSaleId: parseInt(originalSaleId),
          storeId: parseInt(storeId),
          userId: parseInt(userId),
          totalRefund: parseFloat(totalRefund),
          reason,
          notes,
          paymentMethod: paymentMethod || "CASH",
          ReturnItem: {
            create: (items || []).map(item => ({
              productId: parseInt(item.productId),
              quantity: parseInt(item.quantity),
              unitPrice: parseFloat(item.unitPrice),
              total: parseFloat(item.total),
              serials: item.serials || []
            }))
          }
        }
      });
    });

    res.json(result);
  } catch (error) {
    console.error("POST Returns Error:", error);
    res.status(500).json({ error: "Error al crear la devolución", details: error.message });
  }
});

// Capturar todas las demás rutas y servir el index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor corriendo en http://0.0.0.0:${PORT}`);
});
