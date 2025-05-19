const express = require('express');
const app = express();
const connDb = require('./db');
const portNo = 3000;
const product = require('./routes/productRoute');


app.use('/api',product);

app.get('/',(req,res)=>{
    res.send("Hello there");
})

connDb();

app.listen(portNo,()=>{
    console.log(`server running on port no ${portNo}`);
})