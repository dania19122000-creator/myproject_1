var express = require('express');
var BodyParser = require('body-parser');
var app = express();

app.use(BodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'));

var tasks = ['buy socks', 'walk the dog'];
var complete = ['create a to-do app'];

app.post('/addtask', function(req, res){
    const { newtask } = req.body;
    tasks.push(newtask);
    res.redirect('/');

});

app.post('/removetask', (req, res) => {
    const { check } = req.body;

    if(typeof check === 'string') {
        complete.push(check);
        tasks.splice(tasks.indexOf(check), 1);
    } else if (Array.isArray(check)) {
        check.forEach(item => {
            complete.push(item);
            tasks.splice(tasks.indexOf(item), 1);
        })
    }
    res.redirect('/');
});
app.get('/', (req, res) => {
    res.render('index', { tasks: tasks, complete: complete});

});
app.listen(3000, () => {
    console.log('Server started on port 3000');
})
