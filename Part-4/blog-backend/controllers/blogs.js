const blogsRouter = require('express').Router()
const Blog = require('../models/blog')



blogsRouter.get('/', (request, response) => {
    Blog
      .find({})
      .then(blogs => {
        response.status(200).json(blogs)
      })
  })
  
  blogsRouter.post('/', (request, response) => {
    const blog = new Blog(request.body)
  
    blog
      .save()
      .then(result => {
        response.status(201).json(result)
      })
  })
  
  blogsRouter.delete('/:id', (req, resp) => {
      Blog.findByIdAndRemove(req.params.id)
          .then(result => {
            resp.status(204).end()
        });

})     


module.exports =  blogsRouter;