const express = require('express');
const matchRoutes = require('./routes/matchRoutes');
const artistRoutes = require('./routes/artistRoutes');
const connectDB = require('./db'); // Import connectDB

const app = express();

// Menjalankan koneksi ke MongoDB
connectDB();

app.use(express.json());
app.use('/api', matchRoutes);
app.use('/apidua', artistRoutes);

app.listen(3000, () => console.log('Server running on port 3000'));
