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

// Blog.create({
//     title: "Dylan is a faggot",
//     image: "https://i.imgur.com/AHTuSs2.jpg",
//     body: "ILL TELL YOU WHAT I WANT, WHAT I REALLY REALLY WANT"
// });

//Routes

app.get('/', (req, res) => res.redirect('/blogs'));

app.get('/blogs', (req, res) =>{
    Blog.find({}, (err, blogs) => {
        if(err){
            console.log(err);
            res.redirect('/404')
        }
        else {
            res.render("index", {blogs: blogs});
        }
    });
})


app.listen(3000, () => {
    console.log("App is listening...")
});