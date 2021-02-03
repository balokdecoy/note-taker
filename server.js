const express = require('express');
const app = express()
const PORT = process.env.PORT || 3000;
const path = require('path');
const fs = require('fs');
var uniqid = require('uniqid');
const outputPath = path.join("./Develop/db", "db.json")

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
    let newNote = {
        title: req.body.title,
        text: req.body.text,
        id: uniqid()
    };

    notes.push(newNote);
    res.json(newNote);

    fs.writeFile(outputPath, JSON.stringify(notes), function(err, result) {
    if (err) console.log('error', err)});
});

app.delete("/api/notes/:id", (req, res) => {
    const remove = req.params.id;
    for (var i=0; i<notes.length; i++){
        if (notes[i].id === remove) {
            notes.splice(i, 1);
        };
    };
    res.json(notes);

    fs.writeFile(outputPath, JSON.stringify(notes), function(err, result) {
    if (err) console.log('error', err)})
});

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));