require('dotenv').config();
const cors = require('cors');
const express = require('express');
const app = express();

//middleware
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app .use(express.json());
//bodyParsing middleware


//Routes
app.get('/', (req, res) => {
    res.json({message: `MERN app API Home`})
});

//controllers
app.use('/api', require('./controllers/auth'));

app.listen(process.env.PORT || 3000, () => 
    console.log(`You're connected to port ${process.env.PORT || 3000}`)
);