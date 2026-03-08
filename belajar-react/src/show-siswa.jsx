import useDataStore from './store/useDataStore';
import { useEffect } from 'react';

function ShowSiswa() {
    const { data, loading, error, fetchData } = useDataStore();

    useEffect(() => {
        fetchData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center p-6">
            <h1 className="text-3xl font-black text-slate-900 mb-8 uppercase tracking-tighter">
                Data Fetching Pro
            </h1>
            <div className="w-full max-w-md">
                <ul className="space-y-3">
                    {data.map((siswa) => (
                        <li key={siswa.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200 hover:shadow-md transition-all flex flex-col gap-2">
                            <div><span className="font-bold text-blue-600">#{siswa.id}</span> - {siswa.nama}</div>
                            <div><span className="font-bold text-blue-600">Class:</span> {siswa.kelas}</div>
                            <div><span className="font-bold text-blue-600">Status:</span> {siswa.status}</div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default ShowSiswa;