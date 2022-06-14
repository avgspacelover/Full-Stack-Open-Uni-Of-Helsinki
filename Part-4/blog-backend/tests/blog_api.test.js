const mongoose = require('mongoose')

const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = [
    {
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 11,
  
    },
    {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
    },


]

beforeEach(async ()=> {
    await Blog.deleteMany({})
     
    let blogObj = new Blog(initialBlogs[0])
    await blogObj.save()
    blogObj = new Blog(initialBlogs[1])
    await blogObj.save()
})

test('blogs are returned as json', async ()=> {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-type', /application\/json/)
}, 100000)

test('all the blogs are returned' , async ()=> {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(initialBlogs.length)
    
}, 100000)

test('verify existence of id prop' , async ()=> {
    const resp = await api.get('/api/blogs')
    let obj= resp.body
    obj.forEach(item => {

        expect(item.id).toBeDefined()    
    });
    
})

test('addition of a new blog' , async () => {
    const newBlog = {
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7
      }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(initialBlogs.length+1)
    
})

test(' if likes property missing, value defaults to 0' , async()=> {
    const newBlog = {
        title: "React maybe",
        author: "Michael Chan maybe",
        url: "https://reactpatterns.com/maybe",
      }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    
    const response = await api.get('/api/blogs',{new:true})
    const db = response.body
    console.log(db)
    let len =db.length
    expect(db[len-1].likes).toEqual(0)
    
})

test(' if title + url property missing, throws bad request' , async()=> {
    const newBlog = {

        author: "Michael Chan",
        likes: 8,
      }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)    
    
})

afterAll(() => {
    mongoose.connection.close()
})