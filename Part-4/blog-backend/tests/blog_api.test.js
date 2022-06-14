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
        likes: 0,
  
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

afterAll(() => {
    mongoose.connection.close()
})