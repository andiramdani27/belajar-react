import { create } from 'zustand';
import Swal from 'sweetalert2'; // Impor SweetAlert2

const useSiswaStore = create((set, get) => ({
  listSiswa: [],
  totalSiswa: 0,
  searchTerm: "",
  isLoading: false, // State untuk loading

  setSearchTerm: (term) => set({ searchTerm: term }),

   fetchTotal: async () => {
        try {
        const res = await fetch('http://localhost:5000/siswa');
        const data = await res.json();
        // Update list DAN total sekaligus
        set({ listSiswa: data, totalSiswa: data.length }); 
        } catch (err) {
        console.error(err);
        }
    },

  fetchSiswa: async () => {
    set({ isLoading: true }); // Mulai loading
    try {
      const res = await fetch('http://localhost:5000/siswa');
      const data = await res.json();
      set({ listSiswa: data, totalSiswa: data.length });
    } finally {
      set({ isLoading: false }); // Selesai loading
    }
  },

  addSiswa: async (inputData) => {
    const res = await fetch('http://localhost:5000/tambah', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(inputData)
    });
    if (res.ok) {
      await get().fetchSiswa();
      Swal.fire('Berhasil!', 'Data siswa telah ditambahkan.', 'success');
    }
  },

  deleteSiswa: async (id) => {
    // Konfirmasi ala SweetAlert2
    const result = await Swal.fire({
      title: 'Apakah anda yakin?',
      text: "Data yang dihapus tidak bisa dikembalikan!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, hapus!',
      cancelButtonText: 'Batal'
    });

    if (result.isConfirmed) {
      const res = await fetch(`http://localhost:5000/hapus/${id}`, { method: 'DELETE' });
      if (res.ok) {
        await get().fetchSiswa();
        Swal.fire('Terhapus!', 'Data berhasil dibuang.', 'success');
      }
    }
  },

  updateSiswa: async (id, dataUpdate) => {
    const res = await fetch(`http://localhost:5000/update/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dataUpdate)
    });
    if (res.ok) {
      await get().fetchSiswa();
      Swal.fire('Updated!', 'Data berhasil diperbarui.', 'success');
    }
  }
}));

export default useSiswaStore;