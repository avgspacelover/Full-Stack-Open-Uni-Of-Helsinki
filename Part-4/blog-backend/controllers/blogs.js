const blogsRouter = require('express').Router()
const Blog = require('../models/blog')



blogsRouter.get('/', async(request, response) => {
     
  let blogs = await Blog.find({})

  response.status(200).json(blogs)

})
  
blogsRouter.post('/', async (request, response) => {
  console.log("req", request.body["url"], request.body["likes"])
  if(!request.body["url"] || !request.body["title"]){
    response.status(400).end()
  } else if(!request.body["likes"]){
    request.body.likes=0;
  }
  const blog = new Blog(request.body)
  console.log("final",blog)

  
  let result= blog.save()

  response.status(201).json(result)

})
  
blogsRouter.delete('/:id', async (req, resp) => {
      
  await Blog.findByIdAndRemove(req.params.id)

  resp.status(204).end()


})     


module.exports =  blogsRouter;