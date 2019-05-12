const fs = require ("fs")
const chalk = require("chalk")

const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find((note) => {return note.title === title})

    debugger

    if(!duplicateNote){
        notes.push({
            "title": title,
            "body": body
        })
        saveNotes(notes)
        console.log(chalk.green("New note added"))
    }else{
        console.log(chalk.red("Note title taken"))
    }
}

const listNotes = () => {
    const notes = loadNotes()
    console.log(chalk.green.inverse("Your notes:"))
    notes.forEach(element => {
        console.log(element.title)
    });
}

const deleteNote = (title) => {
    console.log("Removing note", title)
    var deleted = false
    const notes = loadNotes()
    const newNotesList = notes.filter((note) =>{
        const noteFound = note.title === title
        if(noteFound){
            deleted = true
            return false
        }
        return true 
    })
    saveNotes(newNotesList)
    return deleted
    
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync("note.json", dataJSON)

}
const loadNotes = () => {
    try{
        const dataBuffer = fs.readFileSync("note.json")
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    }catch(e){
        return []
    }
}

const readNote = (title) => {
    notes = loadNotes()
    note = notes.find((note) => {return note.title === title})
    if(note){
        console.log(chalk.green.inverse(note.title))
        console.log(note.body)
    }else{
        console.log(chalk.red.inverse("Note not found"))
    }
}

module.exports = {
    "addNode" : addNote,
    "deleteNote" : deleteNote,
    "listNotes" : listNotes,
    "readNote" : readNote
}