const express = require('express');
const mongoose = require('mongoose');
//const bodyParser = require('body-parser');
const path = require('path');

const items = require('./routes/api/items')

const app = express();

app.use(express.json())

const db = require('./config/keys').mongoURI;

app.use('/api/items',items)

// serve static assests if in production
if(process.env.NODE_ENV === 'production'){
    //set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

const port = process.env.PORT || 5000;

//connect to mongo
mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('MongoDB connected...'))
    .catch(error =>console.log(error))

app.listen(port, ()=> console.log(`server running on port: ${port}`));



//mongoose.set('useFindAndModify',false);





