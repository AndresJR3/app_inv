const express = require('express');
const pool = require('../config/database');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Obtener todos los items del inventario del usuario
router.get('/', authenticateToken, async (req, res) => {
  try {
    const items = await pool.query(
      'SELECT * FROM inventory WHERE user_id = $1 ORDER BY created_at DESC',
      [req.user.userId]
    );
    res.json(items.rows);
  } catch (error) {
    console.error('Error al obtener inventario:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// Crear nuevo item en el inventario
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { name, description, quantity, price } = req.body;

    if (!name || !quantity) {
      return res.status(400).json({ 
        message: 'Nombre y cantidad son requeridos' 
      });
    }

    const newItem = await pool.query(
      'INSERT INTO inventory (name, description, quantity, price, user_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [name, description, quantity, price, req.user.userId]
    );

    res.status(201).json({
      message: 'Item creado exitosamente',
      item: newItem.rows[0]
    });
  } catch (error) {
    console.error('Error al crear item:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// Actualizar item del inventario
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, quantity, price } = req.body;

    // Verificar que el item pertenece al usuario
    const item = await pool.query(
      'SELECT * FROM inventory WHERE id = $1 AND user_id = $2',
      [id, req.user.userId]
    );

    if (item.rows.length === 0) {
      return res.status(404).json({ message: 'Item no encontrado' });
    }

    const updatedItem = await pool.query(
      'UPDATE inventory SET name = $1, description = $2, quantity = $3, price = $4, updated_at = CURRENT_TIMESTAMP WHERE id = $5 AND user_id = $6 RETURNING *',
      [name, description, quantity, price, id, req.user.userId]
    );

    res.json({
      message: 'Item actualizado exitosamente',
      item: updatedItem.rows[0]
    });
  } catch (error) {
    console.error('Error al actualizar item:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// Eliminar item del inventario
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    // Verificar que el item pertenece al usuario
    const item = await pool.query(
      'SELECT * FROM inventory WHERE id = $1 AND user_id = $2',
      [id, req.user.userId]
    );

    if (item.rows.length === 0) {
      return res.status(404).json({ message: 'Item no encontrado' });
    }

    await pool.query(
      'DELETE FROM inventory WHERE id = $1 AND user_id = $2',
      [id, req.user.userId]
    );

    res.json({ message: 'Item eliminado exitosamente' });
  } catch (error) {
    console.error('Error al eliminar item:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// Obtener un item específico
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    const item = await pool.query(
      'SELECT * FROM inventory WHERE id = $1 AND user_id = $2',
      [id, req.user.userId]
    );

    if (item.rows.length === 0) {
      return res.status(404).json({ message: 'Item no encontrado' });
    }

    res.json(item.rows[0]);
  } catch (error) {
    console.error('Error al obtener item:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

module.exports = router;

