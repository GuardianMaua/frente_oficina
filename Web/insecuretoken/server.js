const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const userRoutes = require('./routes/user');

const app = express();
const mediaRoutes = require('./routes/media');
app.use(cors());
app.use(bodyParser.json());
app.use('/api/media', mediaRoutes);

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 80;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
