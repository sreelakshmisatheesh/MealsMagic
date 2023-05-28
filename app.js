const express = require('express');
const mongoose = require( 'mongoose');
const router = require('./index');
const cors = require('cors');

//const router = require('./Router/index');

const app = express();

const port = 4567;
const hostname = 'localhost';

const localdb = 'mongodb://127.0.0.1:27017/zomatoclone';
const serverdb = 'mongodb+srv://zomatoclone:BFj73nVoxI0kdO2G@cluster0.npnvjq5.mongodb.net/zomatoclone_mongoDB?retryWrites=true&w=majority';
//ee zomato clone of server auto generated aanu

//middle ware
app.use(cors());
app.use(express.json());
app.use('/', router);


mongoose.connect(serverdb , {
    useNEWUrlParser: true,
    useUnifiedTopology: true,
})
    .then( res => {
        app.listen(port, hostname, () => {
            console.log(`Server is running at ${hostname}:${port}`);
        });

    })
    .catch( err => console.log(err));


