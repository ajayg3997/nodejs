const dotenv = require('dotenv');
dotenv.config();
const http = require('http');
const app = require('./app');

const port = process.env.PORT || 3000;
const port2 = process.env.PORT2 || 9000;

const server = http.createServer(app);
const server2 = http.createServer(app);

server.listen(port, () => {
    console.log(`Server 1 is up and running on port ${port}`);
});
server2.listen(port2, () => {
    console.log(`Server 2 is up and running on port ${port2}`);
})