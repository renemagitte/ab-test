const express = require('express');
const path = require('path');
const fs = require('fs');

const hostname = 'localhost';
const port = 3000;

const app = express();
app.use(express.static(path.join(__dirname, 'dist')));

app.get('/', (req, res) => {
  res.sendFile(__dirname, '/dist/index.html');
});

app.get("/list-surveys", (req, res) => {
    fs.readFile('./src/assets/aktivbo.json', { encoding: 'utf8' }, (err, data) => {
        if (err) {
            return;
        }
        res.send(data);
    });
})

app.listen(port, hostname, () => {
  console.log("Listening at http://%s:%s/", hostname, port);
});