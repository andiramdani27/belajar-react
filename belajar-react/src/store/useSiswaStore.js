import { create } from 'zustand';
import Swal from 'sweetalert2';

// 1. Helper Header (Tetap Sama)
const getHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };
};

// 2. Helper untuk handle response Error (Centralized)
const handleResponse = async (res) => {
  if (res.status === 401 || res.status === 403) {
    localStorage.removeItem('token');
    Swal.fire('Sesi Berakhir', 'Silakan login kembali.', 'warning');
    window.location.href = '/login';
    return false;
  }
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || 'Terjadi kesalahan pada server');
  }
  return res.json();
};

const useSiswaStore = create((set, get) => ({
  listSiswa: [],
  totalSiswa: 0,
  searchTerm: "",
  isLoading: false,

  setSearchTerm: (term) => set({ searchTerm: term }),

  // Ambil Data
  fetchSiswa: async () => {
    set({ isLoading: true });
    try {
      const res = await fetch('http://localhost:5000/siswa', { headers: getHeaders() });
      const data = await handleResponse(res);
      if (data) set({ listSiswa: data, totalSiswa: data.length });
    } catch (err) {
      console.error("Fetch Error:", err.message);
    } finally {
      set({ isLoading: false });
    }
  },

  // Tambah Data
  addSiswa: async (inputData) => {
    try {
      const res = await fetch('http://localhost:5000/tambah', {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(inputData)
      });
      await handleResponse(res); // Validasi token & error
      await get().fetchSiswa();
      Swal.fire('Berhasil!', 'Data siswa telah ditambahkan.', 'success');
    } catch (err) {
      Swal.fire('Gagal!', err.message, 'error');
    }
  },

  // Hapus Data
  deleteSiswa: async (id) => {
    const result = await Swal.fire({
      title: 'Apakah anda yakin?',
      text: "Data tidak bisa dikembalikan!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      confirmButtonText: 'Ya, hapus!'
    });

    if (result.isConfirmed) {
      try {
        const res = await fetch(`http://localhost:5000/hapus/${id}`, {
          method: 'DELETE',
          headers: getHeaders()
        });
        await handleResponse(res);
        await get().fetchSiswa();
        Swal.fire('Terhapus!', 'Data berhasil dibuang.', 'success');
      } catch (err) {
        Swal.fire('Gagal!', err.message, 'error');
      }
    }
  },

  // Update Data
  updateSiswa: async (id, dataUpdate) => {
    try {
      const res = await fetch(`http://localhost:5000/update/${id}`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(dataUpdate)
      });
      await handleResponse(res);
      await get().fetchSiswa();
      Swal.fire('Updated!', 'Data berhasil diperbarui.', 'success');
    } catch (err) {
      Swal.fire('Gagal!', err.message, 'error');
    }
  }
}));

export default useSiswaStore;