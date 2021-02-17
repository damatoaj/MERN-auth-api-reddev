require('dotenv').config();
const express = require('express');
const app = express();

//middleware


//Routes
app.get('/', (req, res) => {
    res.json({message: `MERN app API Home`})
});
//controllers

app.listen(process.env.PORT || 3000, () => 
    console.log(`You're connected to port ${process.env.PORT || 3000}`)
);