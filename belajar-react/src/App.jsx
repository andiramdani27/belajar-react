import './index.css'

import DaftarSiswa from './DaftarSiswa';

function App() {
  return (
    // Kita berikan class Tailwind di sini untuk mengatur background seluruh halaman
    <div className="min-h-screen bg-gray-100">
      <DaftarSiswa />
    </div>
  );
}

export default App;