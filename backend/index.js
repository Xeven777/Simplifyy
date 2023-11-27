const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');   // to allow cross-origin requests

const app = express();
//corsOrigin for frontend url
const corsOrigin = process.env.NODE_ENV === 'production'
    ? "https://simplifyy.vercel.app"
    : "http://localhost:5173";

app.use(cors({
    origin: corsOrigin,
    methods: 'GET,HEAD,PUT,PATCH,POST,OPTIONS,DELETE',
    credentials: true,
}));
connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define Routes
app.use('/api/userUrl', require('./routes/users'));
app.use('/api/qr/userUrl', require('./routes/qrUsers'));
app.use('/', require('./routes/index'));
app.use('/api/qr', require('./routes/qrs'));
app.use('/api/url', require('./routes/url'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));