const blogsRouter = require('express').Router()
const Blog = require('../model/blog')
const User = require('../model/user')

blogsRouter.get('/',async (req,res) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  res.json(blogs)
})

blogsRouter.get('/:id', async( req, res, next) => {
  try{
    const blog = await Blog.findById(req.params.id)
    if (blog) {
      res.json(blog)
    } else {
      res.status(404).end()
    }
  } catch(exception){
    next(exception)
  }
})

blogsRouter.post('/', async (req, res) => {
  const body = req.body

  const user = await User.findById(body.userId)

  if (!body.title || !body.url) {
    return res.status(400).json({ error: 'missing title or irl' })
  }

  const blog = new Blog({
    title: body.title,
    url: body.url,
    author: body.author,
    likes: body.likes,
    user: user.id
  })
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog.id)
  await user.save()
  res.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  try {
    const body = request.body

    const blog = {
      author: body.author,
      title: body.title,
      likes: body.likes,
      url: body.url,
    }

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
      new: true,
    })
    response.json(updatedBlog)
  } catch (error) {
    next(error)
  }
})

module.exports = blogsRouter