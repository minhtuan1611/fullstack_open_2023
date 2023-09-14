const mongoose = require('mongoose')
const supertest = require('supertest')
const Blog = require('../model/blog')
const app = require('../app')
const bcrypt = require('bcrypt')
const User = require('../model/user')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
})

test('Blogs json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
},100000)

test('Blogs has id? ', async() => {
  const tData = {
    title: 'hehee',
    author: 'mtuan',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
  }
  const res = await api.post('/api/blogs').send(tData)

  expect(res.body.id).toBeDefined
},100000)

test('Creating new blog', async () => {
  const newBlog = {
    title: 'hehee',
    author: 'mtuan',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
  }

  const initialCount = await Blog.countDocuments()
  const response = await api.post('/api/blogs').send(newBlog)


  expect(response.status).toBe(201)
  const savedCount = await Blog.countDocuments()
  expect(savedCount).toBe(initialCount + 1)
  const savedBlog = await Blog.findById(response.body.id)
  expect(savedBlog.title).toBe(newBlog.title)
},100000)

test('Set default likes of blog is 0', async  () => {
  const newBlog = {
    title: 'hehee',
    author: 'mtuan',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
  }
  const response = await api.post('/api/blogs').send(newBlog)
  expect(response.status).toBe(201)
  expect(response.body.likes).toBe(0)
},10000)


test('Create blog without ulr or title => status 400', async () => {
  const newBlog = {
    title: 'hehee',
    author: 'mtuan',
  }

  const response = await api.post('/api/blogs').send(newBlog)
  expect(response.status).toBe(400)
})


test('Delete a blog', async () => {
  const newBlog = new Blog({
    title: 'hehee',
    author: 'mtuan',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
  })
  const savedBlog = await newBlog.save()

  const response = await api.delete(`/api/blogs/${savedBlog.id}`).expect(204)
  expect(response.status).toBe(204)
  const deletedBlog = await Blog.findById(savedBlog.id)
  expect(deletedBlog).toBeNull()
})

test('Update blog', async () => {
  const newBlog = new Blog({
    title: 'hehee',
    author: 'mtuan',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
  })

  const savedBlog = await newBlog.save()
  const upBlog = {
    author: 'Mark Jonson'
  }

  const response = await api
    .put(`/api/blogs/${savedBlog.id}`)
    .send(upBlog)
    .expect(200)

  expect(response.body.author).toBe(upBlog.author)
})

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
  }

  test(' invalid user is created', async () => {
    const usersAtStart = await usersInDb()

    const newUser = {
      username: 'mlasdfasdfa',
      name: 'Matti Luukkainen',
      password: 'sf',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('expected `username` or `password` must be at least 3 character Long')

    const usersAtEnd = await usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})