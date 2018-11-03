const express = require('express'), 
    cors = require('cors'), 
    bodyParser = require('body-parser'), 
    mongoose = require('mongoose');

let app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));

mongoose.connect('mongodb://localhost/blog', {
    useNewUrlParser: true
});

app.set('view engine', 'ejs');
app.use(express.static('public'));

let blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
});

let Blog = mongoose.model("Blog", blogSchema);

//Routes



app.listen(3000, () => {
    console.log("App is listening...")
});