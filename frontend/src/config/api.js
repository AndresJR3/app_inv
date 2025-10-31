// Configuración de la API
const API_CONFIG = {
  // URL base de la API - se puede cambiar según el entorno
  BASE_URL: process.env.REACT_APP_API_URL || 'https://test-inventory-app.netlify.app/',
  
  // Endpoints
  ENDPOINTS: {
    AUTH: {
      LOGIN: '/api/auth/login',
      REGISTER: '/api/auth/register',
      VERIFY: '/api/auth/verify'
    },
    INVENTORY: {
      BASE: '/api/inventory',
      BY_ID: (id) => `/api/inventory/${id}`
    }
  }
};

// Función para construir URLs completas
export const buildApiUrl = (endpoint) => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};

// URLs pre-construidas para uso común
export const API_URLS = {
  LOGIN: buildApiUrl(API_CONFIG.ENDPOINTS.AUTH.LOGIN),
  REGISTER: buildApiUrl(API_CONFIG.ENDPOINTS.AUTH.REGISTER),
  VERIFY: buildApiUrl(API_CONFIG.ENDPOINTS.AUTH.VERIFY),
  INVENTORY: buildApiUrl(API_CONFIG.ENDPOINTS.INVENTORY.BASE),
  INVENTORY_BY_ID: (id) => buildApiUrl(API_CONFIG.ENDPOINTS.INVENTORY.BY_ID(id))
};

export default API_CONFIG;
