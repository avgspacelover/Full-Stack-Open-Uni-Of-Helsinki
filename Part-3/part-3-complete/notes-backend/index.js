
require('dotenv').config()

const express = require('express')

const app = express()

const cors = require('cors')

const Note= require('./models/note')

// eslint-disable-next-line no-unused-vars
const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

app.use(express.json())

app.use(cors())

app.use(express.static('build'))







app.get('/api/notes', (request,response) => {

  Note.find({}).then(notes => {

    response.json(notes)

  })
})



app.get('/api/notes/:id', (request, response, next) => {
  Note.findById(request.params.id).then(note => {

    if (note) {
      response.json(note)
    } else {
      response.status(404).end()
    }
  })

    .catch(error => next(error))

})

app.post('/api/notes', (request,response, next) => {
  const body = request.body

  if (body.content === undefined) {
    return response.status(400).json({ error: 'content missing' })
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date(),
  })

  note.save().then(savedNote => {
    response.json(savedNote)
  })

    .catch(error => next(error))
})


app.delete('/api/notes/:id', (request, response, next) => {

  Note.findByIdAndRemove(request.params.id)
    // eslint-disable-next-line no-unused-vars
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.put('/api/notes/:id', (request, response, next) => {
  const { content, important } = request.body

  // const note = {
  //   content: content,
  //   important: important,
  // }

  Note.findByIdAndUpdate(
    request.params.id,
    { content, important },
    { new: true, runValidators: true, context: 'query' }
  )
    .then(updatedNote => {
      response.json(updatedNote)
    })
    .catch(error => next(error))
})



const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }


  next(error)
}
app.use(errorHandler)



// eslint-disable-next-line no-undef
const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`Server running on port  ${PORT}`)
})










//  const generateId = () => {

//   const maxId = notes.length > 0
//     ? Math.max(...notes.map(n => n.id))
//     : 0

//   return maxId + 1

//  }



// npm install --save-dev nodemon
//npm run dev




//---------------------------

// const mongoose = require('mongoose')



// if (process.argv.length < 3) {
//   console.log('Please provide the password as an argument: node mongo.js <password>')
//   process.exit(1)
// }

// const password = process.argv[2]


// DO NOT SAVE YOUR PASSWORD TO GITHUB!!
// const url = `mongodb+srv://antariksh:<password>@cluster0.ouytb.mongodb.net/noteApp?retryWrites=true&w=majority`


// mongoose.connect(url)

// const noteSchema = new mongoose.Schema({
//   content: String,
//   date: Date,
//   important: Boolean,
// })

// const Note = mongoose.model('Note', noteSchema)

// let notes = [
//     {
//       id: 1,
//       content: "HTML is easy",
//       date: "2022-05-30T17:30:31.098Z",
//       important: true
//     },
//     {
//       id: 2,
//       content: "Browser can execute only Javascript",
//       date: "2022-05-30T18:39:34.091Z",
//       important: false
//     },
//     {
//       id: 3,
//       content: "GET and POST are the most important methods of HTTP protocol",
//       date: "2022-05-30T19:20:14.298Z",
//       important: true
//     }
//   ]
/* without express
  const app = http.createServer((request, response) => {
    response.writeHead(200, { 'Content-Type': 'application/json' })
    response.end(JSON.stringify(notes))
  })
*/

//  app.get('/', (request, response)=> {
//    response.send('<h1>Hello World!</h1>')
//  })


//  noteSchema.set('toJSON', {
//   transform: (document, returnedObject) => {
//     returnedObject.id = returnedObject._id.toString()
//     delete returnedObject._id
//     delete returnedObject.__v
//   }
//  })