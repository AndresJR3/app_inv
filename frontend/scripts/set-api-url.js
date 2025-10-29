#!/usr/bin/env node

/**
 * Script para cambiar la URL de la API en el frontend
 * Uso: node scripts/set-api-url.js <url>
 * Ejemplo: node scripts/set-api-url.js https://abc123.ngrok-free.app
 */

const fs = require('fs');
const path = require('path');

const newApiUrl = process.argv[2];

if (!newApiUrl) {
  console.log('❌ Error: Debes proporcionar una URL');
  console.log('Uso: node scripts/set-api-url.js <url>');
  console.log('Ejemplo: node scripts/set-api-url.js https://abc123.ngrok-free.app');
  process.exit(1);
}

// Validar que la URL sea válida
try {
  new URL(newApiUrl);
} catch (error) {
  console.log('❌ Error: La URL proporcionada no es válida');
  process.exit(1);
}

const envPath = path.join(__dirname, '..', '.env');

// Crear o actualizar el archivo .env
const envContent = `# Configuración de la API
REACT_APP_API_URL=${newApiUrl}
`;

try {
  fs.writeFileSync(envPath, envContent);
  console.log('✅ Archivo .env actualizado exitosamente');
  console.log(`🔗 URL de la API configurada a: ${newApiUrl}`);
  console.log('🔄 Reinicia el servidor de desarrollo para aplicar los cambios');
} catch (error) {
  console.log('❌ Error al escribir el archivo .env:', error.message);
  process.exit(1);
}
