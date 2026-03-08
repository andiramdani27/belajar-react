import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';
import jwt from 'jsonwebtoken'; // 1. Tambahkan import JWT

const app = express();
app.use(cors());
app.use(express.json());

// 2. Kunci Rahasia (Jaga ini tetap rahasia di file .env nantinya)
const SECRET_KEY = '123456';

// Koneksi ke MySQL (Tetap sama)
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'sekolah_db'
});

db.connect((err) => {
  if (err) console.error('Database koneksi ERROR:', err.message);
  else console.log('Database MySQL Berhasil Terhubung!');
});

// --- 3. MIDDLEWARE VERIFIKASI TOKEN ---
// Fungsi ini seperti satpam yang mengecek tiket sebelum masuk
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Mengambil string setelah 'Bearer'

  if (!token) return res.status(401).json({ message: "Akses ditolak, token tidak ada!" });

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ message: "Token tidak valid atau kadaluarsa!" });
    req.user = user; // Simpan data user ke request
    next(); // Lanjut ke fungsi berikutnya
  });
};

// --- 4. API LOGIN (Untuk mendapatkan Token) ---
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Sederhana: Cek jika admin (Nanti bisa cek ke DB)
  if (username === 'admin' && password === '123') {
    const user = { name: username };
    // Buat token yang berlaku selama 1 jam
    const token = jwt.sign(user, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ message: "Username atau Password salah!" });
  }
});

// --- 5. ROUTE YANG DIPROTEKSI (Tambahkan authenticateToken) ---
// Ambil semua data siswa (Sekarang butuh token)
app.get('/siswa', authenticateToken, (req, res) => {
  db.query('SELECT * FROM siswa', (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
});

// Tambah siswa
app.post('/tambah', authenticateToken, (req, res) => {
  const { nama, kelas, status } = req.body;
  const sql = 'INSERT INTO siswa (nama, kelas, status) VALUES (?, ?, ?)';
  db.query(sql, [nama, kelas, status], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send({ message: "Data berhasil ditambah", id: result.insertId });
  });
});

// Hapus siswa
app.delete('/hapus/:id', authenticateToken, (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM siswa WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send({ message: "Data berhasil dihapus" });
  });
});

// Update siswa
app.put('/update/:id', authenticateToken, (req, res) => {
  const { id } = req.params;
  const { nama, kelas, status } = req.body;
  const sql = 'UPDATE siswa SET nama = ?, kelas = ?, status = ? WHERE id = ?';
  db.query(sql, [nama, kelas, status, id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send({ message: "Data berhasil diupdate" });
  });
});

// Jumlah total siswa
app.get('/siswa/count', authenticateToken, (req, res) => {
  const sql = 'SELECT COUNT(*) AS total FROM siswa';
  db.query(sql, (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result[0]);
  });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));