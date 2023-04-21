const express = require('express');
const app= express();
const env=require('dotenv');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
//routes
const authRoutes= require('./routes/auth');
const adminRoutes= require('./routes/admin/auth');
const headerRoutes = require('./routes/header');
const initialDataRoutes = require('./routes/admin/initialData');
const reseauRoutes = require('./routes/Reseau');
const mathRoutes = require('./routes/Math');
const algorithmeRoutes = require('./routes/Algorithme');
const statisticsRoutes = require('./routes/Statistics');


// evirement variablre or constance 
env.config();
//mongodb connection 
//mongodb+srv://root:<password>@cluster0.dyknsta.mongodb.net/?retryWrites=true&w=majority
mongoose.connect(`mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.7nvvbbc.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`)
.then (()=>{
    console.log('Data base connected');
});
app.use(cors());
app.use(express.json());
app.use('/public',express.static(path.join(__dirname, 'uploads')));
app.use('/api',authRoutes);
app.use('/api',headerRoutes);
app.use('/api',adminRoutes);
app.use('/api',initialDataRoutes);
app.use('/api',reseauRoutes);
app.use('/api',mathRoutes);
app.use('/api',algorithmeRoutes);
app.use('/api',statisticsRoutes);
//app.use('/api',reseauRoutes);
app.listen(process.env.PORT, ()=>{
    console.log(process.env.PORT);
});