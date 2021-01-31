const express = require('express');
const app = express()
const port = 3000
const path = require('path');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + "/Develop/public"));
app.use( express.static( __dirname + '/public/assets/js/index.js'));

app.get("/index", (req, res) => {
    res.sendFile(path.join(__dirname, "./Develop/public/index.html"));
});
app.get("/notes", (req, res) =>
    res.sendFile(path.join(__dirname, "./Develop/public/notes.html"))
);

app.listen(port, () => console.log(`Example app listening on port 3000!`))