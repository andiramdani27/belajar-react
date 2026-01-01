import { useState, useEffect } from 'react';

function DaftarSiswa() {
  // 1. STATE UNTUK DATA
  const [listSiswa, setListSiswa] = useState([]);
  
  // 2. STATE UNTUK INPUT TAMBAH
  const [inputNama, setInputNama] = useState("");
  const [inputKelas, setInputKelas] = useState("");
  const [inputStatus, setInputStatus] = useState("");
  
  // 3. STATE UNTUK EDIT
  const [idSedangEdit, setIdSedangEdit] = useState(null);
  const [namaEdit, setNamaEdit] = useState("");
  const [kelasEdit, setKelasEdit] = useState("");
  const [statusEdit, setStatusEdit] = useState("");

  // 4. FUNGSI AMBIL DATA (READ)
  const ambilData = () => {
    fetch('http://localhost:5000/siswa')
      .then(res => res.json())
      .then(data => setListSiswa(data))
      .catch(err => console.error("Gagal ambil data:", err));
  };

  useEffect(() => {
    ambilData();
  }, []);

  // 5. FUNGSI TAMBAH (CREATE)
  const tambahSiswa = async (e) => {
    e.preventDefault();
    if (!inputNama) return;
    
    const respon = await fetch('http://localhost:5000/tambah', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nama: inputNama, kelas: inputKelas, status: inputStatus })
    });

    if (respon.ok) {
      ambilData(); // Refresh data tanpa reload halaman
      setInputNama(""); setInputKelas(""); setInputStatus("");
    }
  };

  // 6. FUNGSI HAPUS (DELETE)
  const hapusSiswa = async (id) => {
    if (confirm("Yakin ingin menghapus?")) {
      await fetch(`http://localhost:5000/hapus/${id}`, { method: 'DELETE' });
      setListSiswa(listSiswa.filter(item => item.id !== id));
    }
  };

  // 7. FUNGSI SIMPAN EDIT (UPDATE)
  const simpanEdit = async (id) => {
    const respon = await fetch(`http://localhost:5000/update/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nama: namaEdit, kelas: kelasEdit, status: statusEdit })
    });

    if (respon.ok) {
      setIdSedangEdit(null);
      ambilData();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto bg-white rounded-xl shadow-md p-6 max-w-4xl">
        <h1 className="text-2xl font-bold text-center mb-8">Manajemen Siswa (MySQL)</h1>

        {/* Form Tambah */}
        <form onSubmit={tambahSiswa} className="flex gap-2 mb-8">
          <input className="flex-1 border p-2 rounded" placeholder="Nama..." value={inputNama} onChange={(e) => setInputNama(e.target.value)} />
          <input className="flex-1 border p-2 rounded" placeholder="Kelas..." value={inputKelas} onChange={(e) => setInputKelas(e.target.value)} />
          <input className="flex-1 border p-2 rounded" placeholder="Status..." value={inputStatus} onChange={(e) => setInputStatus(e.target.value)} />
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Tambah</button>
        </form>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-100">
                <th className="py-3 px-2">Nama</th>
                <th className="py-3 px-2">Kelas</th>
                <th className="py-3 px-2">Status</th>
                <th className="py-3 px-2 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {listSiswa.map((siswa) => (
                <tr key={siswa.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-2">
                    {idSedangEdit === siswa.id ? 
                      <input className="border p-1 w-full" value={namaEdit} onChange={(e) => setNamaEdit(e.target.value)} /> : 
                      siswa.nama}
                  </td>
                  <td className="py-3 px-2">
                    {idSedangEdit === siswa.id ? 
                      <input className="border p-1 w-full" value={kelasEdit} onChange={(e) => setKelasEdit(e.target.value)} /> : 
                      siswa.kelas}
                  </td>
                  <td className="py-3 px-2">
                    {idSedangEdit === siswa.id ? 
                      <input className="border p-1 w-full" value={statusEdit} onChange={(e) => setStatusEdit(e.target.value)} /> : 
                      siswa.status}
                  </td>
                  <td className="py-3 px-2 text-right">
                    {idSedangEdit === siswa.id ? (
                      <button onClick={() => simpanEdit(siswa.id)} className="text-green-600 font-bold">Simpan</button>
                    ) : (
                      <div className="flex justify-end gap-2">
                        <button className="text-amber-500" onClick={() => {
                          setIdSedangEdit(siswa.id);
                          setNamaEdit(siswa.nama);
                          setKelasEdit(siswa.kelas);
                          setStatusEdit(siswa.status);
                        }}>Edit</button>
                        <button className="text-red-500" onClick={() => hapusSiswa(siswa.id)}>Hapus</button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default DaftarSiswa;