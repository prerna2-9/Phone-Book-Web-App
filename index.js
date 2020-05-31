const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv/config');

app.use(cors());

app.use(express.json());

app.use(express.static(path.join(__dirname, 'client', 'contactbook', 'build')));

mongoose.connect('mongodb+srv://prerna:prerna@cluster0-e9gsj.mongodb.net/test?retryWrites=true&w=majority', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;

db.once('open', () => {
    console.log('db connection established');
})

db.on('error', (err) => {
    console.log(err);
});


app.get('/',(req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'contactbook', 'build', 'index.html'));
})

app.use('/contacts', require('./server/routes/routes'));

const port = process.env.PORT || 4000;
app.listen(port,()=>{
    console.log('Running on port',port);
});