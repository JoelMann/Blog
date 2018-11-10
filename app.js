const express = require('express'), 
    cors = require('cors'), 
    bodyParser = require('body-parser'), 
    mongoose = require('mongoose'),
    methodOveride = require('method-override');
    path = require('path');

let app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(methodOveride('_method'));

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

app.get('/blogs', (req, res) => {
    Blog.find({}, (err, blogs) => {
        if(err){
            console.log(err);
            res.redirect('/404')
        }
        else {
            res.render("index", {blogs: blogs});
        }
    });
});

//New
app.get('/blogs/new', (req, res) => res.render('new'));

//Create
app.post('/blogs', (req, res) => Blog.create(req.body.blog, (err, newPost) =>{
    if(err) {console.log(err); res.render('new')}
    else {res.redirect('/blogs')}
}));

//Show
app.get('/blogs/:id', (req, res) => Blog.findById(req.params.id, (err, foundBlog) => {
    if(err) {
        res.redirect('/blogs');
    }
    else {
        res.render('show', {blog: foundBlog})
    }
}
 ));

 //Update
 app.get('/blogs/:id/update', (req, res) => Blog.findById(req.params.id, (err, foundBlog) => {
     if (err) {
         res.redirect('/blogs:id')
     }
    res.render('update', {blog: foundBlog});
 })
);

app.put('/blogs/:id', (req, res) => {
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, (err, updatedBlog) => {
        if(err){
            res.redirect('/blogs');
        }
        else {
            res.redirect('/blogs/' + req.params.id);
        }
    });
    console.log('Updated!')
});

app.delete('/blogs/:id/', (req, res) => Blog.findByIdAndRemove(req.params.id, (err, deletedBlog) => {
    if (err) {
        res.redirect('/blogs');
    } else { 
        console.log(deletedBlog);
        res.redirect('/blogs');
    }
}))

app.get('*', (req, res) => res.render('404'));
app.listen(3000, () => console.log("App is listening..."));