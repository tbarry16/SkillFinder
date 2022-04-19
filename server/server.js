/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const express = require('express');
// const  fs  = require('fs');
const app = express();
const path = require('path');

const PORT = 3000;

const managerRoute = require('./routes/managerRoute')


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


/* Main page */
app.get('/', (req, res) => {
    return res.status(200).sendFile(path.resolve(__dirname,'../build/index.html'))
});


/* Manager page */
app.use('/manager', managerRoute, (req, res) => {
    return res.status(200).send('Welcome to the Manager Page')
})




// **** ERROR HANDLERS **** //

/* Invalid End Point Error Handler */
app.use((req, res) => res.status(404).send('This page does not exist!'));


/* Global Error Handler */
app.use((err, req, res, next) => {
    const defaultErr = {
      log: 'Express error handler caught unknown middleware error',
      status: 500,
      message: { err: 'An error occurred' },
    };
    const errorObj = Object.assign({}, defaultErr, err);
    console.log(errorObj.log);
    return res.status(errorObj.status).json(errorObj.message);
  });


app.listen(PORT, console.log(`Listening on Port ${PORT}`))