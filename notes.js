const chalk = require('chalk'); //import chalk module for styled logs
const fs = require('fs'); //import file system module for interacting with files

//Adds a new note to json file
function addNote(title, body) {
    const notes = loadNotes(); //loads preexisting notes
    const duplicateNote = notes.find(note => note.title === title) //finds if new note title already exists

    if (!duplicateNote) { //checks if duplicate was found
        //Adds new note if duplicate was not found
        notes.push({
            title: title,
            body: body,
        })
        saveNotes(notes); //Adds new note with preexisting notes
        console.log('New note added!'); //logs status
    } else {
        console.log('Note title taken!') //logs status
    }
}

//Removes a note passed by user
function removeNotes(title) {
    const notes = loadNotes(); //loads preexisting notes
    const keptNotes = notes.filter(note => note.title !== title);

    if (notes.length !== keptNotes.length) {
        console.log(chalk.green.inverse(`Note removed: ${title}!`)) //logs status
        saveNotes(keptNotes);
    } else console.log(chalk.red.inverse('No note found!')); //logs status

}

function listNotes(){
    const notes = loadNotes(); //loads preexisting notes
    console.log(chalk.inverse.blue('Your Notes:')); //logs status
    notes.forEach(note => console.log(note.title)); //logs each note title in the data.json file
}

function readNote(title) {
    const notes = loadNotes(); //loads preexisting notes
    const note = notes.find(note => note.title === title) //Finds note from user input
    if (!note) { //checks if note was found
        console.log(chalk.inverse.red('Note not found!')); //logs status if note was not found
    } else {
        console.log(chalk.inverse.blue(note.title)); //logs title of found note
        console.log(note.body); //logs body of note
    }
}

function saveNotes(notes) {
    const dataJSON = JSON.stringify(notes); //converts notes object to json string
    fs.writeFileSync('data.json', dataJSON); //writes json string into json file
}

//recieves notes data from json
function loadNotes() {
    //Reads data from json file or handles error
    try {
        const dataBuffer = fs.readFileSync('data.json'); // reads data.json 
        const dataJSON = dataBuffer.toString(); //turns data into string
        return JSON.parse(dataJSON); //turns json string into object
    } catch (err) {
        return []; //returns empty array if error retrieving json
    }
}

//exports relevant methods
module.exports = {
    addNote: addNote,
    removeNotes: removeNotes,
    listNotes: listNotes,
    readNote: readNote
}