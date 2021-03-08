const express = require('express');
const path = require('path');
const User = require('./models/user');
const { fetchById, update } = require('./models/user');



const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views')

app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    User.fetchAll()
        .then(([data]) => {
            console.log('USER DATA: ', data);
            res.render('index.ejs', { usrs: data });
        })
        .catch(err => console.log(err));
});

app.get('/add', (req, res) => {
    res.render('add.ejs');
});

app.post('/save', (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    console.log(name, email);
    const user = new User(Math.random(), name, email, password);

    user.save()
        .then(() => {
            res.redirect('/');
        })
        .catch(err => console.log(err));
});

app.get('/update/:id', (req, res) => {
    const id = req.params.id;

    fetchById(id)
        .then(([data]) => {
            res.render('update.ejs', { user: data });
        })
        .catch(err => console.log(err));

});

app.post('/:id', (req, res) => {
    let id = req.params.id;
    let name = req.body.name;
    let email = req.body.email;
    let password = req.body.password;

    update(new User(id, name, email, password))
        .then(() => {
            res.redirect('/');
        })
        .catch(err => console.log(err));
});

app.listen(3000, () => {
    console.log('App is running at port 3000');
});