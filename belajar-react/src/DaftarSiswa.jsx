import { useState, useEffect } from 'react';
import useSiswaStore from './store/useSiswaStore';
import useAuthStore from './store/useAuthStore'; // 1. Impor store auth

function DaftarSiswa() {
  const {
    listSiswa,
    fetchSiswa,
    addSiswa,
    deleteSiswa,
    updateSiswa,
    searchTerm,
    setSearchTerm,
    isLoading
  } = useSiswaStore();

  const logout = useAuthStore((state) => state.logout); // 2. Ambil fungsi logout

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
    if (!input.nama || !input.status) return;
    addSiswa(input);
    setInput({ nama: "", kelas: "", status: "" });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="mx-auto bg-white rounded-2xl shadow-xl p-6 max-w-5xl border border-gray-100">

        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight">Manajemen Siswa</h1>
            <p className="text-gray-500 text-sm">Dashboard Admin - Terproteksi Token</p>
          </div>

          {/* Tombol Logout */}
          <button
            onClick={logout}
            className="flex items-center gap-2 bg-rose-50 text-rose-600 px-5 py-2 rounded-xl font-bold hover:bg-rose-600 hover:text-white transition-all duration-200 shadow-sm active:scale-95"
          >
            <span>🚪</span> Logout
          </button>
        </div>

        {/* SEARCH BAR */}
        <div className="mb-6">
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">🔍</span>
            <input
              type="text"
              className="w-full border-2 border-gray-50 pl-10 pr-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none focus:bg-white bg-gray-50 transition-all"
              placeholder="Cari nama atau kelas siswa..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* FORM TAMBAH */}
        <form onSubmit={handleTambah} className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-8 bg-blue-50/50 p-5 rounded-2xl border border-blue-100">
          <input className="border border-blue-200 p-2.5 rounded-xl focus:bg-white outline-none" placeholder="Nama..." value={input.nama} onChange={(e) => setInput({ ...input, nama: e.target.value })} />
          <input className="border border-blue-200 p-2.5 rounded-xl focus:bg-white outline-none" placeholder="Kelas..." value={input.kelas} onChange={(e) => setInput({ ...input, kelas: e.target.value })} />
          <select
            className="border border-blue-200 p-2.5 rounded-xl focus:bg-white bg-white outline-none cursor-pointer"
            value={input.status}
            onChange={(e) => setInput({ ...input, status: e.target.value })}
          >
            <option value="">Pilih Status...</option>
            <option value="Aktif">Aktif</option>
            <option value="Tidak Aktif">Tidak Aktif</option>
          </select>
          <button className="bg-blue-600 text-white p-2.5 rounded-xl hover:bg-blue-700 font-bold transition-all shadow-lg shadow-blue-200 active:scale-95">
            + Tambah Siswa
          </button>
        </form>

        {/* TABLE SECTION */}
        <div className="overflow-x-auto relative min-h-[300px] rounded-xl border border-gray-50">
          {isLoading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm z-10">
              <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600 border-gray-200"></div>
              <p className="mt-4 text-blue-600 font-bold animate-pulse">Sinkronisasi Data...</p>
            </div>
          )}

          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-widest font-bold border-b border-gray-100">
                <th className="py-4 px-4">Nama Siswa</th>
                <th className="py-4 px-4">Kelas</th>
                <th className="py-4 px-4">Status</th>
                <th className="py-4 px-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {dataTerfilter.length > 0 ? (
                dataTerfilter.map((siswa) => (
                  <tr key={siswa.id} className="hover:bg-blue-50/50 transition-colors group">
                    <td className="py-4 px-4">
                      {idSedangEdit === siswa.id ?
                        <input className="border-2 border-blue-200 p-2 w-full rounded-lg outline-none focus:bg-white" value={dataEdit.nama} onChange={(e) => setDataEdit({ ...dataEdit, nama: e.target.value })} /> :
                        <span className="font-semibold text-gray-700">{siswa.nama}</span>}
                    </td>
                    <td className="py-4 px-4 text-gray-600">
                      {idSedangEdit === siswa.id ?
                        <input className="border-2 border-blue-200 p-2 w-full rounded-lg outline-none focus:bg-white" value={dataEdit.kelas} onChange={(e) => setDataEdit({ ...dataEdit, kelas: e.target.value })} /> :
                        <span className="bg-gray-100 px-2 py-1 rounded text-sm">{siswa.kelas}</span>}
                    </td>
                    <td className="py-4 px-4">
                      {idSedangEdit === siswa.id ?
                        <select
                          className="border-2 border-blue-200 p-2 w-full rounded-lg outline-none bg-white"
                          value={dataEdit.status}
                          onChange={(e) => setDataEdit({ ...dataEdit, status: e.target.value })}
                        >
                          <option value="Aktif">Aktif</option>
                          <option value="Tidak Aktif">Tidak Aktif</option>
                        </select> :
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${siswa.status === 'Aktif' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                          }`}>
                          <span className={`w-1.5 h-1.5 rounded-full mr-2 ${siswa.status === 'Aktif' ? 'bg-green-500' : 'bg-red-500'}`}></span>
                          {siswa.status}
                        </span>}
                    </td>
                    <td className="py-4 px-4 text-right">
                      {idSedangEdit === siswa.id ? (
                        <button onClick={() => { updateSiswa(siswa.id, dataEdit); setIdSedangEdit(null); }} className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-green-700 shadow-md">Simpan</button>
                      ) : (
                        <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="p-2 text-amber-500 hover:bg-amber-50 rounded-lg transition-colors" title="Edit" onClick={() => {
                            setIdSedangEdit(siswa.id);
                            setDataEdit({ nama: siswa.nama, kelas: siswa.kelas, status: siswa.status });
                          }}>✏️</button>
                          <button className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="Hapus" onClick={() => deleteSiswa(siswa.id)}>🗑️</button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                !isLoading && (
                  <tr>
                    <td colSpan="4" className="text-center py-20">
                      <div className="text-4xl mb-3">isEmpty</div>
                      <p className="text-gray-400 italic">Data tidak ditemukan dalam database</p>
                    </td>
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