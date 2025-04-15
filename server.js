const express = require('express');
const connectDB = require('./db');
const dotenv = require('dotenv');
const userRoutes = require('./userRouter');

dotenv.config();
const app = express();
connectDB();
app.use(express.json());

app.use('/api', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));