const express = require('express');
const  fs  = require('fs');
const app = express();
const path = require('path');

const PORT = 3000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    return res.status(200).sendFile(path.resolve(__dirname,'../build/index.html'))
});


app.listen(PORT, console.log(`Listening on Port ${PORT}`))