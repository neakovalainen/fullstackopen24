const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const middleware = require('../utils/middleware')
blogRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', {username: 1, name: 1})
  response.json(blogs)
})


blogRouter.post('/', middleware.userExtractor, async (request, response) => {
  const body = request.body
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid'})
  }
  const user = request.user

  if (!user) {
    return response.status(400).json({ error: 'userId missing or not valid '})
  }

  if (!body.title) {
    return response.status(400),json({
      error: 'no title given'
    })
  }
  if (!body.url) {
    return response.status(400).json({
      error: 'no url given'
    })
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.status(201).json(savedBlog)
})

blogRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({error: 'invalid token'})
  }
  const blog = await Blog.findById(request.params.id)
  if (!blog) {
    return response.status(400).json({error: 'blog not found'})
  }
  const user = request.user
  console.log('täs blogi', blog)
  console.log(blog.user)
  if (blog.user.toString() === user.id.toString()) {
    await Blog.findByIdAndDelete(request.params.id)
    return response.status(204).end()
  } else {
    console.log(blog.user)
    return response.status('401').json({ error: 'invalid token or user'})
  }
})

blogRouter.put('/:id', async (request, response) => {
  console.log("Got a request with id:", request.params.id)

  const body = request.body
  const blog = await Blog.findById(request.params.id)
  if (!blog) {
    return response.status(404).end()
  }
  console.log('this is the blog', blog)
  console.log('body', body)
  //const savedBlog = await blog.save()
  const newBlog = await Blog.updateOne({
      title: body.title,
      author: body.author,
      url: body.url,
      user: blog.user
    },
    { $set: {
      likes: blog.likes + 1
    }}
  )
  console.log('uusblog', newBlog)
  //response.status(201).json(request.body)
  return response.status(204).end()
})

module.exports = blogRouter
