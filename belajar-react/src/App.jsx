// src/App.jsx
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import DaftarSiswa from './DaftarSiswa';
import './index.css';

function App() {
  return (
    <BrowserRouter>
      {/* NAVBAR */}
      <nav className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-blue-600">SisfoSiswa</h1>
          <div className="flex gap-6">
            <Link to="/" className="text-gray-600 hover:text-blue-600 font-medium">Beranda</Link>
            <Link to="/siswa" className="text-gray-600 hover:text-blue-600 font-medium">Data Siswa</Link>
          </div>
        </div>
      </nav>

      {/* HALAMAN YANG BERUBAH-UBAH */}
      <div className="pt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/siswa" element={<DaftarSiswa />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;