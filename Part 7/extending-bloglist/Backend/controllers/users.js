const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../model/user')

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  if (username.length < 3 || password.length < 3) {
    return response.status(400).json({
      error:
        'expected `username` or `password` must be at least 3 character Long',
    })
  }
  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()
  response.status(201).json(savedUser)
})

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', {
    title: 1,
    url: 1,
    author: 1,
  })

  response.json(users)
})

usersRouter.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)
    if (user) {
      res.json(user)
    } else {
      res.status(404).end()
    }
  } catch (exception) {
    next(exception)
  }
})

module.exports = usersRouter
