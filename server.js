// check if we are running in prod or not. 
// process.env.NODE_ENV is set by default by node
if (process.env.NODE_ENV !== 'production') {
    // loads all the env variables from .env
    require('dotenv').config({path:'.env'})
}

const express = require('express');
const app = express();

// the following should be deleted/redone START
// app.get('/', (req, res) => res.json({ message: 'Docker is easy 🐳 ' }))
// END

const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

// routes
const indexRouter = require('./routes/index')


/*** app.set() values ***/
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views'); // __dirname is an environment variable that tells you the 
                                        // absolute path of the directory containing the currently 
                                        // executing file
app.set('layout', 'layouts/layout');


/*
    We want to tell our app (express) to use methodOverride. We want to tell it that the override
    parameter is going to be '_method', which is very unlikely to be a name of an input on a form.
    This is going to send as if it was an input of our form of '_method' and we are either going
    to use PUT or DELETE based on the value.
*/
app.use(methodOverride('_method'));
app.use(expressLayouts);
app.use(bodyParser.urlencoded({limit: '10mb', extended: false}));
app.use(express.static('public'));

app.use('/', indexRouter);

app.listen(process.env.PORT || 8080, 
           () => console.log(`app listening on http://localhost:${process.env.PORT || 8080}`));

