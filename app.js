const notes = require("./note.js")
const chalk = require("chalk")
const yargs = require("yargs")

yargs.version("1.1.0")

yargs.command({
    command: "add",
    describe: "Adding a new note",
    builder:{
        title:{
            describe: "Note title",
            demandOption: "true",
            type: "string"
        },
        body:{
            describe: "Note body",
            demandOption: "true",
            type: "string"
        }
    },
    handler(argv) {notes.addNode(argv.title, argv.body)
    }
})

yargs.command({
    command: "remove",
    describe: "Removing a note",
    builder:{
        title:{
            describe: "Note title",
            demandOption: "true",
            type: "string"
        }
    },
    handler(argv){
        deleted = notes.deleteNote(argv.title)
        if(deleted){
            console.log(chalk.green("Note deleted"))
        }else{
            console.log(chalk.red("Note not found"))
        }
    }
})

yargs.command({
    command: "list",
    describe: "Listing all the notes",
    handler(){ notes.listNotes() }
})

yargs.command({
    command: "read",
    describe: "Reading note",
    builder:{
        title:{
            describe: "Note title",
            demandOption: "true",
            type: "string"
        }
    },
    handler(argv){ notes.readNote(argv.title) }
})


yargs.parse()


