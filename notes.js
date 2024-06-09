const chalk = require('chalk');
const fs = require('fs');

function getNotes() {
    return 'Your notes...'
}

function addNote(title, body) {
    const notes = loadNotes();
    const duplicateNote = notes.find(note => note.title === title)

    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body,
        })
        saveNotes(notes);
        console.log('New note added!')
    } else {
        console.log('Note title taken!')
    }
}

function removeNotes(title) {
    const notes = loadNotes();
    const keptNotes = notes.filter(note => note.title !== title);

    if (notes.length !== keptNotes.length) {
        console.log(chalk.green.inverse(`Note removed: ${title}!`))
        saveNotes(keptNotes);
    } else console.log(chalk.red.inverse('No note found!'));

}

function listNotes(){
    const notes = loadNotes();
    console.log(chalk.inverse.blue('Your Notes:'));
    notes.forEach(note => console.log(note.title));
}

function readNote(title) {
    const notes = loadNotes();
    const note = notes.find(note => note.title === title)
    if (!note) {
        console.log(chalk.inverse.red('Note not found!'));
    } else {
        console.log(chalk.inverse.blue(note.title));
        console.log(note.body);
    }
}

function saveNotes(notes) {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('data.json', dataJSON);
}



function loadNotes() {
    try {
        const dataBuffer = fs.readFileSync('data.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (err) {
        return [];
    }
}

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNotes: removeNotes,
    listNotes: listNotes,
    readNote: readNote
}