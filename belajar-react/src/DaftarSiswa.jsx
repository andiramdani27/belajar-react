import { useState, useEffect } from 'react';
import useSiswaStore from './store/useSiswaStore';

function DaftarSiswa() {
  const { 
    listSiswa, 
    fetchSiswa, 
    addSiswa, 
    deleteSiswa, 
    updateSiswa,
    searchTerm,
    setSearchTerm,
    isLoading // 1. Ambil state isLoading dari Zustand
  } = useSiswaStore();

  const [input, setInput] = useState({ nama: "", kelas: "", status: "" });
  const [idSedangEdit, setIdSedangEdit] = useState(null);
  const [dataEdit, setDataEdit] = useState({ nama: "", kelas: "", status: "" });

  useEffect(() => {
    fetchSiswa();
  }, []);

  const dataTerfilter = listSiswa.filter((siswa) => 
    siswa.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
    siswa.kelas.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleTambah = (e) => {
    e.preventDefault();
    if (!input.nama) return;
    addSiswa(input);
    setInput({ nama: "", kelas: "", status: "" });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto bg-white rounded-xl shadow-md p-6 max-w-4xl">
        <h1 className="text-2xl font-bold text-center mb-8 text-gray-800">Manajemen Siswa</h1>

        {/* Search Bar */}
        <div className="mb-6">
          <input 
            type="text"
            className="w-full border-2 border-blue-50 p-3 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all"
            placeholder="Cari nama atau kelas siswa..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Form Tambah */}
        <form onSubmit={handleTambah} className="flex gap-2 mb-8 bg-blue-50 p-4 rounded-lg shadow-inner">
          <input className="flex-1 border p-2 rounded focus:bg-white" placeholder="Nama..." value={input.nama} onChange={(e) => setInput({...input, nama: e.target.value})} />
          <input className="flex-1 border p-2 rounded focus:bg-white" placeholder="Kelas..." value={input.kelas} onChange={(e) => setInput({...input, kelas: e.target.value})} />
          <select 
            className="flex-1 border p-2 rounded focus:bg-white bg-white" 
            value={input.status} 
            onChange={(e) => setInput({...input, status: e.target.value})}
          >
            <option value="">Pilih Status...</option>
            <option value="Aktif">Aktif</option>
            <option value="Tidak Aktif">Tidak Aktif</option>
          </select>
          <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 font-bold transition-colors">Tambah</button>
        </form>

        <div className="overflow-x-auto relative min-h-[200px]">
          {/* 2. LOGIKA LOADING STATE */}
          {isLoading ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-white bg-opacity-80 z-10">
              <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-600"></div>
              <p className="mt-4 text-blue-600 font-medium italic">Menghubungkan ke database...</p>
            </div>
          ) : null}

          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-100 bg-gray-50 text-gray-600">
                <th className="py-3 px-2">Nama</th>
                <th className="py-3 px-2">Kelas</th>
                <th className="py-3 px-2">Status</th>
                <th className="py-3 px-2 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {dataTerfilter.length > 0 ? (
                dataTerfilter.map((siswa) => (
                  <tr key={siswa.id} className="border-b hover:bg-blue-50 transition-colors">
                    <td className="py-3 px-2">
                      {idSedangEdit === siswa.id ? 
                        <input className="border p-1 w-full rounded" value={dataEdit.nama} onChange={(e) => setDataEdit({...dataEdit, nama: e.target.value})} /> : 
                        <span className="font-medium text-gray-700">{siswa.nama}</span>}
                    </td>
                    <td className="py-3 px-2 text-gray-600">
                      {idSedangEdit === siswa.id ? 
                        <input className="border p-1 w-full rounded" value={dataEdit.kelas} onChange={(e) => setDataEdit({...dataEdit, kelas: e.target.value})} /> : 
                        siswa.kelas}
                    </td>
                    <td className="py-3 px-2">
                      {idSedangEdit === siswa.id ? 
                        <input className="border p-1 w-full rounded" value={dataEdit.status} onChange={(e) => setDataEdit({...dataEdit, status: e.target.value})} /> : 
                        <span className={`px-2 py-1 rounded-full text-xs ${siswa.status === 'Aktif' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{siswa.status}</span>}
                    </td>
                    <td className="py-3 px-2 text-right">
                      {idSedangEdit === siswa.id ? (
                        <button onClick={() => { updateSiswa(siswa.id, dataEdit); setIdSedangEdit(null); }} className="text-green-600 font-bold hover:underline">Simpan</button>
                      ) : (
                        <div className="flex justify-end gap-3">
                          <button className="text-amber-500 hover:text-amber-700 font-medium" onClick={() => {
                            setIdSedangEdit(siswa.id);
                            setDataEdit({ nama: siswa.nama, kelas: siswa.kelas, status: siswa.status });
                          }}>Edit</button>
                          <button className="text-red-500 hover:text-red-700 font-medium" onClick={() => deleteSiswa(siswa.id)}>Hapus</button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                !isLoading && (
                  <tr>
                    <td colSpan="4" className="text-center py-10 text-gray-400 italic">Data tidak ditemukan...</td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default DaftarSiswa;