const fs = require("fs");

const fetchNotes = () => {
    try {
        return JSON.parse(fs.readFileSync("notes-data.json"));
    } catch (err) {
        return [];
    }
};

const saveNotes = (notes) => {
    fs.writeFileSync("notes-data.json", JSON.stringify(notes));
};

const printNote = (note) => {
    console.log(`Title: "${note.title}"\nBody: "${note.body}"`);
};

const addNote = (title, body) => {
    const notes = fetchNotes();
    const note = {
        title,
        body,
    };
    const duplicateNotes = notes.filter(note => note.title === title);
    if (duplicateNotes.length === 0) {
        notes.push(note);
        saveNotes(notes);
        return note;
    }
    return "";
};

const getAll = () => fetchNotes();

const getNote = (title) => {
    const notes = fetchNotes();
    const note = notes.filter(note => note.title === title);
    return note[0];
};

const removeNote = (title) => {
    const notes = fetchNotes();
    const filteredNotes = notes.filter(note => note.title !== title);
    saveNotes(filteredNotes);
    return (notes.length !== filteredNotes.length);
};

module.exports = {
    addNote,
    getAll,
    getNote,
    removeNote,
    printNote,
};
