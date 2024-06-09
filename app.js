const chalk = require('chalk');
const fs = require('fs');
const yargs = require('yargs');
const notes = require('./notes.js');

yargs.version('1.0.0'); //custom yargs version

//Create add command
yargs.command({
    command: 'add', //Name the command
    describe: 'Add new note', //Description for add command
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note body',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.addNote(argv.title, argv.body);
    }
});

//Create remove command
yargs.command({
    command: 'remove', //Name the command
    describe: 'Remove a note', //Description for remove command
    builder: {
        title: {
            describe: '',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.removeNotes(argv.title);
    }
});

//Create read command
yargs.command({
    command: 'read', //Name the command
    describe: 'Reads a note', //Description for read command
    builder: {
        title: {
            describe: '',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.readNote(argv.title);
    }
});

//Create list command
yargs.command({
    command: 'list', //Name the command
    describe: 'Lists out all notes',
    builder: {
        title: {
            describe: '',
            demandOption: true,
            type: 'string'
        }
    },
    handler() {
        notes.listNotes();
    }
});

yargs.parse();