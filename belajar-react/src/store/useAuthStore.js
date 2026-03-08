import { create } from 'zustand';
import Swal from 'sweetalert2';

const useAuthStore = create((set) => ({
    token: localStorage.getItem('token') || null,
    user: null,

    login: async (username, password) => {
        try {
            const res = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            const data = await res.json();

            if (res.ok) {
                localStorage.setItem('token', data.token); // Simpan token di browser
                set({ token: data.token, user: username });
                Swal.fire('Berhasil!', 'Selamat datang kembali, Admin.', 'success');
                return true;
            } else {
                Swal.fire('Gagal!', data.message, 'error');
                return false;
            }
        } catch (err) {
            console.error(err);
            Swal.fire('Error!', 'Server tidak merespon.', 'error');
            return false;
        }
    },

    logout: async () => {
        const result = await Swal.fire({
            title: 'Mau keluar?',
            text: "Anda harus login kembali untuk mengelola data.",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#e11d48', // warna rose-600
            cancelButtonColor: '#64748b', // warna slate-500
            confirmButtonText: 'Ya, Logout',
            cancelButtonText: 'Batal'
        });

        if (result.isConfirmed) {
            localStorage.removeItem('token');
            set({ token: null, user: null });
            // Gunakan navigate jika di komponen, atau window.location jika di store
            window.location.href = '/login';
        }
    }
}));

export default useAuthStore;