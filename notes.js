const fs = require('fs')
const chalk = require('chalk')

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync('notes.json')
    const dataJSON = dataBuffer.toString()
    return JSON.parse(dataJSON)
  } catch (e) {
    return []
  }
}

const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes)
  fs.writeFileSync('notes.json', dataJSON)
}

const addNote = (title, body) => {
  const notes = loadNotes()

  const duplicateNote = notes.find((note) => note.title === title)

  if (!duplicateNote) {
    notes.push({
      title,
      body,
    })
    saveNotes(notes)
    console.log(chalk.green.inverse('New note added!'))
  } else {
    console.log(chalk.red.inverse('Note title taken!'))
  }
}

const removeNote = (title) => {
  const notes = loadNotes()

  const notesToKeep = notes.filter((note) => note.title !== title)

  if (notesToKeep.length < notes.length) {
    saveNotes(notesToKeep)
    console.log(chalk.green.inverse(`Note with Title: ${title}, has removed!`))
  } else {
    console.log(chalk.red.inverse('No note found!'))
  }
}

const listNotes = () => {
  const notes = loadNotes()
  if (notes.length) {
    console.log(chalk.green('Your notes'))

    notes.forEach((note) => {
      console.log(note.title)
    })
  } else {
    console.log(chalk.yellow.inverse('Notes list is empty'))
  }
}

const readNote = (title) => {
  const notes = loadNotes()
  const note = notes.find((n) => n.title === title)

  if (note) {
    console.log(chalk.green.inverse(`Title: ${note.title}`))
    console.log(chalk.blue(`Body: ${note.body}`))
  } else {
    console.log(chalk.red.inverse('Note not found!'))
  }
}
module.exports = {
  addNote,
  removeNote,
  listNotes,
  readNote,
}
