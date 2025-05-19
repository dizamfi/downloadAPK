// import { useState } from 'react';

// function App() {
//   const [isDownloading, setIsDownloading] = useState(false);
  
//   const handleDownload = async () => {
//     try {
//       setIsDownloading(true);
      
//       // API endpoint URL
//       const API_URL = import.meta.env.VITE_API_URL || 'https://apkbackend.onrender.com';
      
//       // Using fetch to get the file as a blob
//       const response = await fetch(`${API_URL}/download/1747628237371-base.apk`);
      
//       if (!response.ok) {
//         throw new Error('Download failed');
//       }
      
//       const blob = await response.blob();
      
//       // Create a download link and trigger it
//       const downloadUrl = window.URL.createObjectURL(blob);
//       const a = document.createElement('a');
//       a.style.display = 'none';
//       a.href = downloadUrl;
      
//       // Get filename from Content-Disposition header if available
//       const contentDisposition = response.headers.get('Content-Disposition');
//       const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
//       const matches = filenameRegex.exec(contentDisposition);
//       const filename = matches && matches[1] ? matches[1].replace(/['"]/g, '') : 'app.apk';
      
//       a.download = filename;
//       document.body.appendChild(a);
//       a.click();
      
//       // Cleanup
//       window.URL.revokeObjectURL(downloadUrl);
//       document.body.removeChild(a);
//     } catch (error) {
//       console.error('Download error:', error);
//       alert('Error downloading the APK. Please try again later.');
//     } finally {
//       setIsDownloading(false);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-100 to-blue-200 p-8">
//       <h1 className="text-4xl font-bold mb-4 text-gray-800">¡Descarga nuestra App!</h1>
//       <p className="text-lg text-gray-700 mb-6 text-center max-w-xl">
//         Esta es la aplicación oficial. Descárgala haciendo clic en el botón de abajo e instálala en tu dispositivo Android.
//       </p>
//       <button
//         onClick={handleDownload}
//         disabled={isDownloading}
//         className={`bg-green-600 text-white px-8 py-3 rounded-lg text-lg shadow transition ${
//           isDownloading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-green-700'
//         }`}
//       >
//         {isDownloading ? 'Descargando...' : 'Descargar APK'}
//       </button>
//       <p className="mt-4 text-sm text-gray-500">
//         * Asegúrate de permitir instalaciones de fuentes desconocidas en tu dispositivo.
//       </p>
//     </div>
//   );
// }

// export default App;




import { useState } from 'react';

function App() {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = () => {
    setIsDownloading(true);

    // URL del backend donde está el archivo
    const API_URL = import.meta.env.VITE_API_URL || 'https://apkbackend.onrender.com';
    const downloadUrl = `${API_URL}/download/1747670791202-base.apk`;

    // Crear y disparar un enlace para descargar
    const a = document.createElement('a');
    a.href = downloadUrl;
    a.download = ''; // Usará el nombre del archivo desde el backend
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    setTimeout(() => {
      setIsDownloading(false);
    }, 1000); // Simula una espera mientras el navegador maneja la descarga
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-100 to-blue-200 p-8">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">¡Descarga nuestra App!</h1>
      <p className="text-lg text-gray-700 mb-6 text-center max-w-xl">
        Esta es la aplicación oficial. Descárgala haciendo clic en el botón de abajo e instálala en tu dispositivo Android.
      </p>
      <button
        onClick={handleDownload}
        disabled={isDownloading}
        className={`bg-green-600 text-white px-8 py-3 rounded-lg text-lg shadow transition ${
          isDownloading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-green-700'
        }`}
      >
        {isDownloading ? 'Preparando descarga...' : 'Descargar APK'}
      </button>
      <p className="mt-4 text-sm text-gray-500">
        * Asegúrate de permitir instalaciones de fuentes desconocidas en tu dispositivo.
      </p>
    </div>
  );
}

export default App;
