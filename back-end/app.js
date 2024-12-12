const express = require('express');
const connectDB = require('./db');
const path = require('path');
const matchRoutes = require('./routes/matchRoutes');
const artistRoutes = require('./routes/artistRoutes');
const app = express();
const cors = require('cors');

app.use(cors());

connectDB();

app.use(express.json());
app.use('/api', matchRoutes);
app.use('/apidua', artistRoutes);

// Sajikan gambar dari direktori assets
app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.listen(3000, () => console.log('Server running on port 3000'));
