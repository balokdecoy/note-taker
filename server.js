const express = require('express');
const app = express()
const PORT = process.env.PORT || 3000;
const path = require('path');
const fs = require('fs');
const outputPath = path.join("./Develop/db", "db.json")
console.log(outputPath);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + "/Develop/public"));
app.use( express.static( __dirname + '/Develop/public/assets/js/index.js'));

app.get("/index", (req, res) => {
    res.sendFile(path.join(__dirname, "./Develop/public/index.html"));
});
app.get("/notes", (req, res) =>
    res.sendFile(path.join(__dirname, "./Develop/public/notes.html"))
);

let notes = [];

app.get("/api/notes", (req, res) => {
     fs.readFile(outputPath, res.json(notes), function(err, result) {
        if(err) console.log('error', err)}
)});

app.post("/api/notes", (req, res) => {
    const newNote = req.body;
    console.log(newNote);
    console.log(notes);

    notes.push(newNote);
    res.json(newNote);

    fs.writeFile(outputPath, JSON.stringify(notes), function(err, result) {
    if (err) console.log('error', err)});
});

app.listen(PORT, () => console.log(`Example app listening on port: ${PORT}!`))