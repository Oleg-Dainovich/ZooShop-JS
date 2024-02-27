import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoute from './routes/auth.js';
import productsRoute from './routes/products.js';
import providersRoute from './routes/providers.js';
import couponsRoute from './routes/coupons.js';
import fileUpload from 'express-fileupload';

const app = express();
app.use(cors());
app.use(fileUpload());
app.use(express.json());
app.use(express.static('uploads'));

app.use('/api/auth', authRoute);
app.use('/api/products', productsRoute);
app.use('/api/providers', providersRoute);
app.use('/api/coupons', couponsRoute);

async function start() {
    try {
        await mongoose
        .connect('mongodb+srv://test:test123@shopdb.7ldl8wx.mongodb.net/?retryWrites=true&w=majority')
        .then(() => console.log('MongoDB connected.'))
        .catch((err) => console.log('MongoDB error of connecting!!!', err));

        app.listen(3002, () => console.log('Server started on port: 3002'))
    } catch (error) {
        console.log(error)
    }
}

start();