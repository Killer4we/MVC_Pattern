const express = require('express');
const app = express();
const connDb = require('./config/db');
const product = require('./routes/productRoute');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

app.use(cors({
    origin: 'http://localhost:5173',
}));
app.use('/api',product);

app.get('/',(req,res)=>{
    res.send("Hello there");
})

connDb();

app.listen(process.env.PORT,()=>{
    console.log(`server is running`);
})