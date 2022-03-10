    const express = require('express')

    const morgan = require('morgan')

    const app= express()

    
    app.use(express.json())

    morgan.token('data', function(req, res) {

        
        return JSON.stringify(req.body);
    })

    app.use(
        morgan(":method :url :status :res[content-length] - :response-time ms :data")
    )

    
    
    let persons = [
        { 
        "id": 1,
        "name": "Arto Hellas", 
        "number": "040-123456"
        },
        { 
        "id": 2,
        "name": "Ada Lovelace", 
        "number": "39-44-5323523"
        },
        { 
        "id": 3,
        "name": "Dan Abramov", 
        "number": "12-43-234345"
        },
        { 
        "id": 4,
        "name": "Mary Poppendieck", 
        "number": "39-23-6423122"
        }
    ]

    app.get('/api/persons', (request, response) => {
        return response.json(persons)
    })

    app.get('/info', (request, response) => {
        response.json(`Phonebook has info for ${persons.length} people ${new Date()}`)

    })

    app.get('/api/persons/:id', (request, response) => {
        
        const id = Number(request.params.id)

        const person= persons.filter((person)=> person.id == id)

        if (person) {
            response.json(person)
          } else {
            response.status(404).end()
          }
    })
   



    app.post('/api/persons', (request,response)=> {
        const body= request.body
        let  check= persons.filter((person)=> {
                        persons.name == body.name || persons.number == body.number

                    })
        if(!body.name || !body.number){
            return response.status(400).json({
                error: "data is missing"
            })
        } else if(check.length >=1){
                
                return response.status(400).json({
                    error: "contact already exists in the phonebook!"
                })

            }

        const person ={

            id: Math.floor(Math.random()* 15000),
            name: body.name,
            number: body.number
        }
        
        console.log("hey",person)

        persons = persons.concat(person)
        response.json(person)
    })

    app.delete('/api/persons/:id', (request,response) => {

        const id = Number(request.params.id)

        persons = persons.filter((person)=> person.id !== id)

        response.status(204).end()

    })



    const PORT = 3001

    app.listen(PORT, () => {
        console.log(`server running on port ${PORT}`)
    })