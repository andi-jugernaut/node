const express = require('express'),
port = 5050,
app = express(),
bodyParser = require('body-parser'),
user_router = require('./routes/api/user');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/user/',user_router);

app.listen(port,()=>{
    console.log(`we are running at port ${port}`);
});