import React from 'react';
import './App.css';
import { DATA_SISWA } from './constants';

function DaftarSiswa() {
  return (
    <div style={{ padding: '20px' }}>
      <h2>Daftar Kehadiran Siswa</h2>
      <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nama</th>
            <th>Kelas</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {/* Kita melakukan looping data di sini */}
          {DATA_SISWA.map((siswa) => (
            <tr key={siswa.id}> 
              <td>{siswa.id}</td>
              <td>{siswa.nama}</td>
              <td>{siswa.kelas}</td>
              <td style={{ color: siswa.status === 'Hadir' ? 'green' : 'red' }}>
                {siswa.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DaftarSiswa;