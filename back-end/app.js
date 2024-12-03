const express = require('express');
const matchRoutes = require('./routes/matchRoutes');
const app = express();

app.use(express.json());
app.use('/api', matchRoutes);

app.listen(3000, () => console.log('Server running on port 3000'));
