import { useState } from 'react'
import KartuSkor from './KartuSkor' // Import komponen buatan kita
import './App.css'

function App() {
  const [skorBudi, setSkorBudi] = useState(0);
  const [skorAndi, setSkorAndi] = useState(0);

  return (
    <div style={{padding: '20px'}}>
      <h1>Dashboard Pertandingan</h1>
      
      {/* Kita mengirim data melalui 'Props' */}
      <KartuSkor nama="Budi" poin={skorBudi} />
      <KartuSkor nama="Andi" poin={skorAndi} />

      <button style={{margin: '10px'}} onClick={() => setSkorBudi(prev => prev + 1)}>Tambah Skor Budi</button>
      <button style={{margin: '10px'}} onClick={() => setSkorAndi(prev => prev + 1)}>Tambah Skor Andi</button>
    </div>
  );
}

export default App;