const { spawn } = require('child_process');
require('dotenv').config();

async function createTunnel() {
  try {
    const PORT = process.env.PORT || 5000;
    
    console.log('🚀 Iniciando túnel ngrok...');
    console.log(`📡 Exponiendo puerto ${PORT}`);
    
    // Usar ngrok global
    const ngrokProcess = spawn('ngrok', ['http', PORT.toString()], {
      stdio: 'pipe'
    });
    
    let output = '';
    
    ngrokProcess.stdout.on('data', (data) => {
      output += data.toString();
      console.log(data.toString());
    });
    
    ngrokProcess.stderr.on('data', (data) => {
      console.error('Error:', data.toString());
    });
    
    ngrokProcess.on('close', (code) => {
      console.log(`\n🛑 Túnel ngrok cerrado con código ${code}`);
    });
    
    // Manejar Ctrl+C
    process.on('SIGINT', () => {
      console.log('\n🛑 Cerrando túnel ngrok...');
      ngrokProcess.kill();
      process.exit(0);
    });
    
    // Esperar un poco para que ngrok se inicie
    setTimeout(() => {
      console.log('\n✅ Túnel ngrok iniciado!');
      console.log('🌐 Revisa la consola para ver la URL pública');
      console.log('📝 Usa esa URL para configurar el frontend con: npm run set-api <url>');
      console.log('\n⚠️  Presiona Ctrl+C para cerrar el túnel');
    }, 2000);
    
  } catch (error) {
    console.error('❌ Error al crear túnel ngrok:', error.message);
    console.log('\n💡 Soluciones posibles:');
    console.log('1. Instala ngrok globalmente: npm install -g ngrok');
    console.log('2. O usa: ngrok http 5000 (manualmente)');
    process.exit(1);
  }
}

createTunnel();
