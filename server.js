const express = require ('express');
const db = require('./Backend/config/database');
const dotenv = require('dotenv');
const userRoutes = require ('./Backend/routes/userRoutes');

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static('public'));

app.use('/api/users', userRoutes)

const port = process.env.PORT;

app.listen (port, () => {
    console.log(`App is running on http://localhost ${port}`)
});
