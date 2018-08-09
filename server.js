const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const path =  require('path');

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

const app = express();

// Body Parser Middleware 
app.use(bodyParser.urlencoded({
  extended: false
}));

// Deployment Purpose
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "client", "build")));


// DB Config
const db = require('./config/keys').mongoUri;

// Connect to MongoDb
mongoose
  .connect(db, {
    useNewUrlParser: true
  })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));


// Passport Middleware 
app.use(passport.initialize());

// Passport Config
require('./config/passport')(passport);

// Use Routes 
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

const port = process.env.PORT || 5000;

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(port, () => console.log('Server running on port: ' + port));