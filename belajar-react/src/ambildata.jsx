import { useEffect } from 'react';
import useDataStore from './store/useDataStore';


function AmbilData() {
    // Ambil apa saja yang dibutuhkan dari "Gudang" Zustand
    const { data, loading, error, fetchData } = useDataStore();

    useEffect(() => {
        fetchData(); // Jalankan perintah ambil data saat komponen muncul
    }, []);

    // 1. Tampilan jika Loading
    if (loading) return (
        <div className="p-4 text-blue-500 animate-pulse font-bold">
            Sedang mengambil data dari Gudang Zustand...
        </div>
    );

    // 2. Tampilan jika Error (Misal: Server mati)
    if (error) return (
        <div className="p-4 bg-red-100 text-red-600 rounded-lg border border-red-200">
            ⚠️ Waduh! {error}
        </div>
    );

    // 3. Tampilan Utama (Success)
    return (
        <div className="bg-white shadow-xl rounded-2xl p-6 border border-slate-100">
            <h2 className="text-xl font-bold text-slate-800 mb-4">Daftar Siswa (via Zustand)</h2>
            <ul className="space-y-3">
                {data.map((item) => (
                    <li key={item.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200 hover:shadow-md transition-all">
                        <span className="font-bold text-blue-600">#{item.id}</span> - {item.nama}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default AmbilData;