const express = require('express');
const path = require('path');

const app = express();

require('dotenv').config();

const flash = require('connect-flash');


app.use(flash());


// set the view engine to ejs
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'static')));
app.use(express.static(path.join(__dirname, 'images')));


const session = require('express-session');
const SessionStore = require('connect-mongodb-session')(session);



const dbURI = process.env.dbURI;
const STORE = new SessionStore({
   uri: dbURI,
   collection: 'sessions',
});


app.use(session({
   secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
   saveUninitialized:false,
   store:STORE,
}));


// routes
const homeRoute = require('./routes/homeRoute');
const productRoute = require('./routes/productRoute');
const authRoute = require('./routes/authRoute');
const cartRoute = require('./routes/cartRoute');
const addressRoute = require('./routes/addressRoute');
const orderRoute = require('./routes/orderRoute');
const adminRoute = require('./routes/adminRoute');


app.use('/', homeRoute);
app.use('/product', productRoute);
app.use('/', authRoute);
app.use('/', cartRoute);
app.use('/', addressRoute);
app.use('/', orderRoute);
app.use('/admin', adminRoute);


const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>console.log(`connected in port ${PORT} http://localhost:${PORT}`));