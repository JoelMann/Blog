const express = require('express'), 
    cors = require('cors'), 
    bodyParser = require('body-parser'), 
    mongoose = require('mongoose');

let app = express();
app.use(bodyParser.json());
mongoose.connect('mongodb://localhost/blog', {
    useNewUrlParser: true
});

app.listen(3000, () => {
    console.log("App is listening...")
});