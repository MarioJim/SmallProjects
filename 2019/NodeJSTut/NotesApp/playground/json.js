const fs = require("fs");

let originalNote = {
    title: "the title",
    body: "the body"
};

let originalNoteString = JSON.stringify(originalNote);

fs.writeFileSync("notes.json", originalNoteString);

let noteString = fs.readFileSync("notes.json");

let note = JSON.parse(noteString);

console.log(typeof note);
console.log(note);