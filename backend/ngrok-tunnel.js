const ngrok = require('ngrok');
require('dotenv').config();

async function createTunnel() {
  try {
    const PORT = process.env.PORT || 5000;
    
    console.log('🚀 Iniciando túnel ngrok...');
    
    // Crear el túnel
    const url = await ngrok.connect({
      addr: PORT,
      proto: 'http',
      // Opcional: puedes agregar tu authtoken aquí si tienes cuenta de ngrok
      // authtoken: process.env.NGROK_AUTHTOKEN,
    });
    
    console.log('✅ Túnel ngrok creado exitosamente!');
    console.log(`🌐 URL pública: ${url}`);
    console.log(`🔗 Tu API está disponible en: ${url}/api`);
    console.log('📝 Comparte esta URL para que otros puedan acceder a tu aplicación');
    console.log('\n⚠️  Nota: Este túnel se cerrará cuando termines el proceso (Ctrl+C)');
    
    // Mantener el proceso activo
    process.on('SIGINT', async () => {
      console.log('\n🛑 Cerrando túnel ngrok...');
      await ngrok.kill();
      console.log('✅ Túnel cerrado');
      process.exit(0);
    });
    
  } catch (error) {
    console.error('❌ Error al crear túnel ngrok:', error.message);
    console.log('\n💡 Soluciones posibles:');
    console.log('1. Asegúrate de que el servidor backend esté corriendo');
    console.log('2. Verifica que el puerto esté disponible');
    console.log('3. Si tienes problemas, instala ngrok globalmente: npm install -g ngrok');
    process.exit(1);
  }
}

createTunnel();
