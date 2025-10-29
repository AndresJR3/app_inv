import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.css';

const Register = () => {
  const { register: registerUser, loading } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm();

  const password = watch('password');

  const onSubmit = async (data) => {
    setIsLoading(true);
    setError('');
    setSuccess('');
    
    const result = await registerUser(data.username, data.email, data.password);
    
    if (result.success) {
      setSuccess(result.message);
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } else {
      setError(result.message);
    }
    
    setIsLoading(false);
  };

  if (loading) {
    return <div className="loading">Cargando...</div>;
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Registrarse</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}
          
          <div className="form-group">
            <label htmlFor="username">Nombre de usuario</label>
            <input
              type="text"
              id="username"
              {...register('username', {
                required: 'El nombre de usuario es requerido',
                minLength: {
                  value: 3,
                  message: 'El nombre debe tener al menos 3 caracteres'
                },
                maxLength: {
                  value: 30,
                  message: 'El nombre no puede tener más de 30 caracteres'
                },
                pattern: {
                  value: /^[a-zA-Z0-9]+$/,
                  message: 'Solo se permiten letras y números'
                }
              })}
            />
            {errors.username && (
              <span className="error">{errors.username.message}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              {...register('email', {
                required: 'El email es requerido',
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: 'Email inválido'
                }
              })}
            />
            {errors.email && (
              <span className="error">{errors.email.message}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              {...register('password', {
                required: 'La contraseña es requerida',
                minLength: {
                  value: 6,
                  message: 'La contraseña debe tener al menos 6 caracteres'
                }
              })}
            />
            {errors.password && (
              <span className="error">{errors.password.message}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirmar contraseña</label>
            <input
              type="password"
              id="confirmPassword"
              {...register('confirmPassword', {
                required: 'Confirma tu contraseña',
                validate: value => value === password || 'Las contraseñas no coinciden'
              })}
            />
            {errors.confirmPassword && (
              <span className="error">{errors.confirmPassword.message}</span>
            )}
          </div>

          <button 
            type="submit" 
            className="btn-primary"
            disabled={isLoading}
          >
            {isLoading ? 'Registrando...' : 'Registrarse'}
          </button>
        </form>

        <p className="auth-link">
          ¿Ya tienes cuenta? <Link to="/login">Inicia sesión aquí</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
