/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const express = require('express');
// const  fs  = require('fs');
const app = express();
const path = require('path');

const PORT = 3000;

/* Required Routers */
const managerRoute = require('./routes/managerRoute')
const skillRoute = require('./routes/skillRoute')
const employeeRoute = require('./routes/employeeRoute')
const signupRoute = require('./routes/signupRoute');
const loginRoute = require('./routes/loginRoute')



app.use(express.json());
app.use(express.urlencoded({ extended: true }));


/* Main page */
// app.get('/', (req, res) => {
//     return res.status(200).sendFile(path.resolve(__dirname,'../build/index.html'))
// });

// statically serve everything in the build folder on the route '/build'
if (process.env.NODE_ENV === 'production') {
    app.use('/build', express.static(path.join(__dirname, '../build')));
    // serve index.html on the route '/'
    app.get('/', (req, res) => {
      return res.status(200).sendFile(path.join(__dirname, '../index.html'));
    });
  }

/* Sign-up Requests */
app.use('/signup', signupRoute, (req,res) => {
  return res.status(200).json(res.locals.role)
})

/* Login Requests */
app.use('/login', loginRoute, (req,res) => {
  return res.status(200).json(res.locals)
})

/* Direct Skill Requests */
app.use('/skill', skillRoute, (req, res) => {
    return res.status(200).json(res.locals.skills)
})


/* Manager Page */
app.use('/manager', managerRoute, (req, res) => {
    if (res.locals.employees) {
      return res.status(200).json(res.locals.employees)    
    }
    return res.status(200).send('Welcome to the Manager Page')
})

/* Employee Page */
app.use('/employee', employeeRoute, (req, res) => {
    if (res.locals.foundEmployeesArray) {
        return res.status(200).json(res.locals.foundEmployeesArray)    
    }
    return res.status(200).send('Welcome to the Employee Page')
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