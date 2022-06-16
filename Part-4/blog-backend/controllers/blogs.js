const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async(request, response) => {    
  let blogs = await Blog.find({})

  response.status(200).json(blogs)

})
  
blogsRouter.post('/', async (request, response) => {
  if(!request.body["url"] || !request.body["title"]){
    response.status(400).end()
  } else if(!request.body["likes"]){
    request.body.likes=0;
  }
  const blog = new Blog(request.body)
  
  let result= await blog.save()

  response.status(201).json(result)

})
  
blogsRouter.delete('/:id', async (req, resp) => {
  console.log("req received", req.params.id)
  await Blog.findByIdAndRemove(req.params.id)

  resp.status(204).end()
}) 

  
blogsRouter.put('/:id', async (req, res) => {
  const body = await req.body
  const likeme= body.likes? body.likes: 0
  const blog ={ 
    title: body.title,
    author: body.author,
    url: body.url,
    likes: likeme
  }

  const updatedNote = await Blog.findByIdAndUpdate(req.params.id, blog, { new: true })

  res.status(201).json(updatedNote)


}) 


module.exports =  blogsRouter;