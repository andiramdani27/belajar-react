import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import useAuthStore from './store/useAuthStore';
import Login from './page/login';
import DaftarSiswa from './DaftarSiswa';

// Komponen Pembungkus untuk memproteksi halaman
const ProtectedRoute = ({ children }) => {
  const token = useAuthStore((state) => state.token);
  return token ? children : <Navigate to="/login" />;
};

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        {/* Halaman utama diproteksi */}
        <Route path="/" element={
          <ProtectedRoute>
            <DaftarSiswa />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}