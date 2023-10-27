const dotenv = require('dotenv');
dotenv.config();
const http = require('http');
const app = require('./app');

const port = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(8000, () => {
    console.log(`Server 1 is up and running on port ${8000}`);
});
