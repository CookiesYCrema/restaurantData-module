const express = require('express');
const bodyparser = require('body-parser');
const path = require('path');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan')

const connection = require('../Database/index');
const router = require('./router');


const server = express();
const port = 3005;

server.use(cors());
server.use(morgan('dev'));
server.use(bodyparser.json());
server.use(bodyparser.urlencoded({ extended: true}));
server.use(express.static(path.join(__dirname, '../client/dist')));

server.use('/api', router);

server.listen(port, () => console.log(`connected to  ${port}`));
