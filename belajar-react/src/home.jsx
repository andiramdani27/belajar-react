import useSiswaStore from './store/useSiswaStore';
import { useEffect } from 'react';

export default function Home() {
  const { totalSiswa, fetchTotal } = useSiswaStore();

  useEffect(() => {
    fetchTotal();
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <h1 className="text-4xl font-bold text-blue-600 mb-4 text-center">
        Sistem Informasi Siswa
      </h1>
      <p className="text-gray-600 text-lg mb-8 text-center max-w-lg">
        Selamat datang di dashboard manajemen data siswa sekolah.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl">
        {/* CARD TOTAL SISWA */}
        <div className="p-8 bg-white shadow-lg rounded-2xl border-t-4 border-blue-500 flex flex-col items-center">
          <h2 className="font-semibold text-gray-500 uppercase tracking-wider">
            Total Siswa Terdaftar
          </h2>
          <p className="text-6xl font-black text-blue-600 mt-2">
            {totalSiswa}
          </p>
          <p className="text-gray-400 text-sm mt-2">Siswa aktif di database</p>
        </div>

        {/* CARD STATUS SERVER */}
        <div className="p-8 bg-white shadow-lg rounded-2xl border-t-4 border-green-500 flex flex-col items-center">
          <h2 className="font-semibold text-gray-500 uppercase tracking-wider">
            Status Database
          </h2>
          <div className="flex items-center gap-2 mt-6">
            <span className="relative flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-green-500"></span>
            </span>
            <p className="text-2xl font-bold text-green-600">Terhubung</p>
          </div>
          <p className="text-gray-400 text-sm mt-4">MySQL Port 3306</p>
        </div>
      </div>
    </div>
  );
}