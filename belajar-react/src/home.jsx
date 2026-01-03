// src/Home.jsx
export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <h1 className="text-4xl font-bold text-blue-600 mb-4">Selamat Datang!</h1>
      <p className="text-gray-600 text-lg mb-8 text-center">
        Ini adalah aplikasi Sistem Informasi Siswa berbasis React, Express, dan MySQL.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-6 bg-white shadow-md rounded-lg border-l-4 border-blue-500">
          <h2 className="font-bold text-xl text-gray-800">Total Siswa</h2>
          <p className="text-3xl font-bold text-blue-600 mt-2">Lihat di menu data...</p>
        </div>
        <div className="p-6 bg-white shadow-md rounded-lg border-l-4 border-green-500">
          <h2 className="font-bold text-xl text-gray-800">Status Server</h2>
          <p className="text-lg text-green-600 mt-2 font-semibold">Online (Port 5000)</p>
        </div>
      </div>
    </div>
  );
}