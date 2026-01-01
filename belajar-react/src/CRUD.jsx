import { useState } from 'react';
import { DATA_SISWA } from './data';

function DaftarSiswa() {
  const [listSiswa, setListSiswa] = useState(DATA_SISWA);
  const [inputNama, setInputNama] = useState("");
  const [inputKelas, setInputKelas] = useState("");
  const [inputStatus, setInputStatus] = useState("");
  
  // State tambahan untuk melacak siapa yang sedang diedit
    const [idSedangEdit, setIdSedangEdit] = useState(null);
    const [namaEdit, setNamaEdit] = useState("");
    const [kelasEdit, setKelasEdit] = useState(""); 
    const [statusEdit, setStatusEdit] = useState("");   

  const tambahSiswa = (e) => {
    e.preventDefault();
    if (!inputNama) return;
    setListSiswa([...listSiswa, { id: Date.now(), nama: inputNama, kelas: inputKelas, status: inputStatus }]);
    setInputNama("");
    setInputKelas("");
    setInputStatus("");
  };

  const hapusSiswa = (id) => {
    setListSiswa(listSiswa.filter(item => item.id !== id));
  };

  // FUNGSI BARU: Simpan Perubahan
  const simpanEdit = (id) => {
    const dataTerupdate = listSiswa.map((siswa) => {
      if (siswa.id === id) {
        return { ...siswa, nama: namaEdit, kelas: kelasEdit, status: statusEdit };
      }
      return siswa; // Tetap gunakan data lama untuk siswa lain
    });
    
    setListSiswa(dataTerupdate);
    setIdSedangEdit(null); // Keluar dari mode edit
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
        <div className="mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6">
        <h1 className="text-2xl font-bold text-gray-800 mt-6 mb-12 text-center">Manajemen Siswa</h1>

        {/* Input Form yang lebih cantik */}
        <form onSubmit={tambahSiswa} className="flex gap-2 mb-8">
            <input 
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            value={inputNama} 
            onChange={(e) => setInputNama(e.target.value)} 
            placeholder="Nama siswa baru..." 
            />
            <input 
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            value={inputKelas} 
            onChange={(e) => setInputKelas(e.target.value)} 
            placeholder="Kelas siswa baru..." 
            />
              <input 
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            value={inputStatus} 
            onChange={(e) => setInputStatus(e.target.value)} 
            placeholder="Status siswa baru..." 
            />
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition-colors">
            Tambah
            </button>
        </form>

        {/* Tabel Modern */}
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
            <thead>
                <tr className="border-b-2 border-gray-100">
                <th className="py-3 px-2 text-gray-600 font-semibold">Nama Siswa</th>
                <th className="py-3 px-2 text-gray-600 font-semibold">Kelas</th>
                <th className="py-3 px-2 text-gray-600 font-semibold">Status</th>
                <th className="py-3 px-2 text-gray-600 font-semibold text-right">Aksi</th>
                </tr>
            </thead>
            <tbody>
                {listSiswa.map((siswa) => (
                <tr key={siswa.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-2">
                    {idSedangEdit === siswa.id ? (
                        <input 
                        className="border border-blue-400 rounded px-2 py-1 outline-none w-full"
                        value={namaEdit} 
                        onChange={(e) => setNamaEdit(e.target.value)} 
                        autoFocus
                        />
                    ) : (
                        <span className="text-gray-700 font-medium">{siswa.nama}</span>
                    )}
                    </td>
                    <td className="py-4 px-2">
                    {idSedangEdit === siswa.id ? (
                        <input 
                        className="border border-blue-400 rounded px-2 py-1 outline-none w-full"
                        value={kelasEdit} 
                        onChange={(e) => setKelasEdit(e.target.value)} 
                        autoFocus
                        />
                    ) : (
                        <span className="text-gray-700 font-medium">{siswa.kelas}</span>
                    )}
                    </td>
                     <td className="py-4 px-2">
                    {idSedangEdit === siswa.id ? (
                        <input 
                        className="border border-blue-400 rounded px-2 py-1 outline-none w-full"
                        value={statusEdit} 
                        onChange={(e) => setStatusEdit(e.target.value)} 
                        autoFocus
                        />
                    ) : (
                        <span className="text-gray-700 font-medium">{siswa.status}</span>
                    )}
                    </td>
                    <td className="py-4 px-2 text-right">
                    {idSedangEdit === siswa.id ? (
                        <button onClick={() => simpanEdit(siswa.id)} className="text-green-600 hover:text-green-800 font-bold px-3">Simpan</button>
                    ) : (
                        <div className="flex justify-end gap-3">
                        <button 
                            onClick={() => { setIdSedangEdit(siswa.id); 
                            setNamaEdit(siswa.nama);
                            setKelasEdit(siswa.kelas);
                            setStatusEdit(siswa.status);                        
                        }} 
                            className="text-amber-500 hover:text-amber-700 text-sm font-semibold"
                        >
                            Edit
                        </button>
                        <button 
                            onClick={() => hapusSiswa(siswa.id)} 
                            className="text-red-500 hover:text-red-700 text-sm font-semibold"
                        >
                            Hapus
                        </button>
                        </div>
                    )}
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>

        {listSiswa.length === 0 && (
            <p className="text-center text-gray-400 mt-8 italic">Belum ada data siswa.</p>
        )}
        </div>
    </div>
  );
}

export default DaftarSiswa;