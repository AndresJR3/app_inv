# 📦 Aplicación de Inventarios

Una aplicación web completa para gestión de inventarios con autenticación de usuarios, desarrollada con React (frontend) y Node.js/Express (backend).

## 🚀 Características

- **Autenticación JWT**: Registro, login y logout de usuarios
- **Gestión de Inventario**: CRUD completo para items de inventario
- **Rutas Protegidas**: Acceso restringido a usuarios autenticados
- **Base de Datos PostgreSQL**: Almacenamiento seguro de datos
- **Interfaz Responsiva**: Diseño moderno y adaptable
- **Validación de Formularios**: Validación tanto en frontend como backend

## 🛠️ Tecnologías Utilizadas

### Backend
- Node.js
- Express.js
- PostgreSQL
- JWT (jsonwebtoken)
- bcryptjs (hashing de contraseñas)
- Joi (validación)
- CORS

### Frontend
- React
- React Router
- React Hook Form
- Axios
- Context API

## 📋 Prerrequisitos

Antes de comenzar, asegúrate de tener instalado:

- [Node.js](https://nodejs.org/) (versión 14 o superior)
- [PostgreSQL](https://www.postgresql.org/) (versión 12 o superior)
- npm o yarn

## 🔧 Instalación y Configuración

### 1. Clonar el Repositorio

```bash
git clone <tu-repositorio>
cd app_inv
```

### 2. Configurar la Base de Datos

1. **Instalar PostgreSQL** (si no lo tienes):
   - Windows: Descargar desde [postgresql.org](https://www.postgresql.org/download/windows/)
   - macOS: `brew install postgresql`
   - Ubuntu: `sudo apt-get install postgresql postgresql-contrib`

2. **Crear la base de datos**:
   ```sql
   -- Conectar a PostgreSQL como superusuario
   psql -U postgres
   
   -- Crear la base de datos
   CREATE DATABASE inventory_db;
   
   -- Conectar a la nueva base de datos
   \c inventory_db
   
   -- Ejecutar el script de inicialización
   \i backend/init.sql
   ```

3. **Configurar variables de entorno**:
   - Copia el archivo `.env.example` en la carpeta `backend` y renómbralo a `.env`
   - Edita las variables según tu configuración:
   ```env
   PORT=5000
   JWT_SECRET=tu_jwt_secret_muy_seguro_aqui_cambiar_en_produccion
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=inventory_db
   DB_USER=postgres
   DB_PASSWORD=tu_password_aqui
   ```

### 3. Configurar el Backend

```bash
# Navegar a la carpeta del backend
cd backend

# Instalar dependencias
npm install

# Iniciar el servidor en modo desarrollo
npm run dev

# O iniciar en modo producción
npm start
```

El servidor estará disponible en `http://localhost:5000`

### 4. Configurar el Frontend

```bash
# Navegar a la carpeta del frontend
cd frontend

# Instalar dependencias
npm install

# Iniciar la aplicación
npm start
```

La aplicación estará disponible en `http://localhost:3000`

## 🗂️ Estructura del Proyecto

```
app_inv/
├── backend/
│   ├── config/
│   │   └── database.js          # Configuración de PostgreSQL
│   ├── middleware/
│   │   ├── auth.js              # Middleware de autenticación JWT
│   │   └── validation.js        # Validación con Joi
│   ├── routes/
│   │   ├── auth.js              # Rutas de autenticación
│   │   └── inventory.js         # Rutas de inventario
│   ├── init.sql                 # Script de inicialización de BD
│   ├── package.json
│   └── server.js                # Servidor principal
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Auth.css
│   │   │   ├── Dashboard.css
│   │   │   ├── Navbar.css
│   │   │   ├── Dashboard.js
│   │   │   ├── Login.js
│   │   │   ├── Navbar.js
│   │   │   ├── ProtectedRoute.js
│   │   │   └── Register.js
│   │   ├── context/
│   │   │   └── AuthContext.js   # Context para autenticación
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.js
│   └── package.json
└── README.md
```

## 🔐 API Endpoints

### Autenticación
- `POST /api/auth/register` - Registro de usuario
- `POST /api/auth/login` - Login de usuario
- `GET /api/auth/verify` - Verificar token

### Inventario (Rutas Protegidas)
- `GET /api/inventory` - Obtener todos los items
- `POST /api/inventory` - Crear nuevo item
- `GET /api/inventory/:id` - Obtener item específico
- `PUT /api/inventory/:id` - Actualizar item
- `DELETE /api/inventory/:id` - Eliminar item

## 🧪 Cómo Probar la Aplicación

1. **Iniciar ambos servidores**:
   ```bash
   # Terminal 1 - Backend
   cd backend
   npm run dev
   
   # Terminal 2 - Frontend
   cd frontend
   npm start
   ```

2. **Registrar un usuario**:
   - Ve a `http://localhost:3000`
   - Serás redirigido a `/login`
   - Haz clic en "Regístrate aquí"
   - Completa el formulario de registro

3. **Iniciar sesión**:
   - Usa las credenciales que acabas de crear
   - Serás redirigido al dashboard

4. **Gestionar inventario**:
   - Agrega nuevos items con el botón "+ Agregar Item"
   - Edita items existentes haciendo clic en el ícono de editar
   - Elimina items con el ícono de basura

## 🔒 Seguridad

- Las contraseñas se hashean con bcrypt
- Los tokens JWT expiran en 24 horas
- Validación de datos en frontend y backend
- Rutas protegidas con middleware de autenticación
- CORS configurado para el frontend

## 🐛 Solución de Problemas

### Error de conexión a la base de datos
- Verifica que PostgreSQL esté ejecutándose
- Confirma las credenciales en el archivo `.env`
- Asegúrate de que la base de datos `inventory_db` existe

### Error CORS
- Verifica que el backend esté ejecutándose en el puerto 5000
- Confirma que la URL del frontend en `server.js` sea correcta

### Error de token
- Verifica que `JWT_SECRET` esté configurado en `.env`
- Asegúrate de que el token no haya expirado

## 📝 Notas de Desarrollo

- El proyecto usa Context API para el manejo de estado global
- Los formularios están validados con React Hook Form
- El diseño es completamente responsivo
- Se siguen las mejores prácticas de seguridad

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.
