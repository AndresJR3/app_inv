import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { API_URLS } from '../config/api';
import './Dashboard.css';

const Dashboard = () => {
  // eslint-disable-next-line no-unused-vars
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    quantity: '',
    price: ''
  });

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get(API_URLS.INVENTORY);
      setItems(response.data);
    } catch (error) {
      console.error('Error al cargar items:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (editingItem) {
        // Actualizar item
        await axios.put(API_URLS.INVENTORY_BY_ID(editingItem.id), formData);
      } else {
        // Crear nuevo item
        await axios.post(API_URLS.INVENTORY, formData);
      }
      
      fetchItems();
      resetForm();
    } catch (error) {
      console.error('Error al guardar item:', error);
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      description: item.description || '',
      quantity: item.quantity,
      price: item.price || ''
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este item?')) {
      try {
        await axios.delete(API_URLS.INVENTORY_BY_ID(id));
        fetchItems();
      } catch (error) {
        console.error('Error al eliminar item:', error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      quantity: '',
      price: ''
    });
    setEditingItem(null);
    setShowForm(false);
  };

  if (loading) {
    return <div className="loading">Cargando inventario...</div>;
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Mi Inventario</h1>
        <button 
          className="btn-primary"
          onClick={() => setShowForm(true)}
        >
          + Agregar Item
        </button>
      </div>

      {showForm && (
        <div className="form-overlay">
          <div className="form-modal">
            <h3>{editingItem ? 'Editar Item' : 'Nuevo Item'}</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Nombre *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Descripción</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="3"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Cantidad *</label>
                  <input
                    type="number"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleInputChange}
                    min="0"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Precio</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    min="0"
                    step="0.01"
                  />
                </div>
              </div>

              <div className="form-actions">
                <button type="submit" className="btn-primary">
                  {editingItem ? 'Actualizar' : 'Crear'}
                </button>
                <button type="button" className="btn-secondary" onClick={resetForm}>
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="items-grid">
        {items.length === 0 ? (
          <div className="empty-state">
            <p>No tienes items en tu inventario aún.</p>
            <p>¡Agrega tu primer item!</p>
          </div>
        ) : (
          items.map(item => (
            <div key={item.id} className="item-card">
              <div className="item-header">
                <h3>{item.name}</h3>
                <div className="item-actions">
                  <button 
                    className="btn-edit"
                    onClick={() => handleEdit(item)}
                  >
                    ✏️
                  </button>
                  <button 
                    className="btn-delete"
                    onClick={() => handleDelete(item.id)}
                  >
                    🗑️
                  </button>
                </div>
              </div>
              
              {item.description && (
                <p className="item-description">{item.description}</p>
              )}
              
              <div className="item-details">
                <div className="detail">
                  <span className="label">Cantidad:</span>
                  <span className="value">{item.quantity}</span>
                </div>
                {item.price && (
                  <div className="detail">
                    <span className="label">Precio:</span>
                    <span className="value">${parseFloat(item.price).toFixed(2)}</span>
                  </div>
                )}
              </div>
              
              <div className="item-footer">
                <small>
                  Creado: {new Date(item.created_at).toLocaleDateString()}
                </small>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;
