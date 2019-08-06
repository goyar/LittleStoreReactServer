// load environment variables for configuration
require('dotenv').config();
global.env_cfg = process.env;

// requirements
const express = require('express');
const path = require('path');
const cors = require('cors');

const HTTP_PORT = env_cfg.HTTP_PORT;
const app = express();

app.use(cors());
app.use(express.static(path.join(__dirname,'./public')));

// request loging middleware
const logRequests = function(req, res, next){
    let reqTag = Math.random().toString(36).substring(7);
    console.info(`${Date.now()}: ${reqTag} - ${req.method}: ${req.originalUrl} - From: ${req.hostname}`);
    res.on('finish', ()=>{
        console.info(`${Date.now()}: ${reqTag} - ${res.statusCode}: ${req.hostname}`);
    })
    next();
}
app.use(logRequests);

app.get('/',(req, res)=>{
    res.sendFile('index.html');
})

app.listen(HTTP_PORT, ()=>{
    console.info(`Server listening at port ${HTTP_PORT}!`);
})