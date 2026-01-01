import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// Koneksi ke MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', 
  database: 'sekolah_db'
});

// Cek koneksi agar kita tahu jika ada yang salah (misal: password salah atau db belum dibuat)
db.connect((err) => {
  if (err) {
    console.error('Database koneksi ERROR:', err.message);
  } else {
    console.log('Database MySQL Berhasil Terhubung!');
  }
});

// 1. Ambil semua data siswa
app.get('/siswa', (req, res) => {
  db.query('SELECT * FROM siswa', (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
});

// 2. Tambah siswa
app.post('/tambah', (req, res) => {
  const { nama, kelas, status } = req.body;
  const sql = 'INSERT INTO siswa (nama, kelas, status) VALUES (?, ?, ?)';
  db.query(sql, [nama, kelas, status], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send({ message: "Data berhasil ditambah", id: result.insertId });
  });
});

// 3. Hapus siswa
app.delete('/hapus/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM siswa WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send({ message: "Data berhasil dihapus" });
  });
});

// 4. Update siswa (Simpan Edit) - Tambahkan ini agar fitur edit di React jalan permanen
app.put('/update/:id', (req, res) => {
  const { id } = req.params;
  const { nama, kelas, status } = req.body;
  const sql = 'UPDATE siswa SET nama = ?, kelas = ?, status = ? WHERE id = ?';
  db.query(sql, [nama, kelas, status, id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send({ message: "Data berhasil diupdate" });
  });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));