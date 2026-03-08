import { create } from 'zustand';

const useDataStore = create((set) => ({
    data: [],
    loading: false,
    error: null,

    // Fungsi untuk memanggil API
    fetchData: async () => {
        set({ loading: true, error: null }); // Mulai loading, hapus error lama
        try {
            const res = await fetch('http://localhost:5000/siswa');

            if (!res.ok) {
                throw new Error('Gagal menyambung ke server');
            }

            const hasil = await res.json();
            set({ data: hasil, loading: false }); // Simpan data & matikan loading
        } catch (err) {
            set({ error: err.message, loading: false }); // Simpan pesan error
        }
    }
}));

export default useDataStore;