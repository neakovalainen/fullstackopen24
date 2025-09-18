const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const assert = require('node:assert')
const Blog = require('../models/blog')
const User = require('../models/user')
const api = supertest(app)
const bcrypt = require('bcrypt')
const initialBlogAmount = 3

beforeEach(async () => {
  await User.deleteMany({})
  await Blog.deleteMany({})

  const passwordHash = await bcrypt.hash('salasana', 10)
  const user = new User({ 
    username: 'kayttaja1', 
    name: 'noname',
    passwordHash
  })
  await user.save()
  const savedUser = await User.find({})
  const userId = savedUser[0]._id
  let blogObject = new Blog({
    title: 'it is not good to give up',
    author: 'somebody',
    url: 'www.idk.yey',
    likes: 5,
    user: userId
  })
  await blogObject.save()
  blogObject = new Blog(
  {
    title: 'reading does good things for you',
    author: 'me',
    url: 'diary',
    likes: 10,
    user: userId
  },
  )
  await blogObject.save()
  blogObject = new Blog(
  {
    title: 'you should take a nap',
    author: 'me when eepy',
    url: 'www.thedeeppartsofmybrain.com',
    likes: 8,
    user: userId
  }
  )
  await blogObject.save()
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('COntent-Type', /application\/json/)
})

test('correct amount of blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, initialBlogAmount)

})
// luo listan avaimista ja tarkistaa, että ensimmäisellä
// blogilla on kenttä id
// voi muuttaa tarkastamaan, että kenttä löytyy kaikilta
// mutta uskon tämän olevan tarpeeksi tässä kohtaa
test('blogs have id fields', async () => {
  const response = await api.get('/api/blogs')
  const keys = response.body.map(blog => Object.keys(blog))
  assert(keys[0].includes('id')) 
})

test('blogs can be added', async () => {
  const loginInfo = {
    username: 'kayttaja1',
    password: 'salasana'
  }
  const returned = await api.post('/api/login').send(loginInfo)
  const token = returned.body.token
  const user = await User.find({})

  const newBlog = {
    title: 'it is not good to give up, i think?',
    author: 'somebodythatiusedtoknow',
    url: 'www.idkyet.yey',
    likes: 15,
    user: user.id
  }

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const titles = response.body.map(returned => returned.title)

  assert.strictEqual(response.body.length, initialBlogAmount + 1)
  assert(titles.includes('it is not good to give up, i think?'))
})

test('if blog likes not specified, they are put to 0', async () => {
  const loginInfo = {
    username: 'kayttaja1',
    password: 'salasana'
  }
  const returned = await api.post('/api/login').send(loginInfo)
  const token = returned.body.token
  const user = await User.find({})
  const newBlog = {
    title: 'it is not good to give up, i think?',
    author: 'somebodythatiusedtoknow',
    url: 'www.idkyet.yey',
    likes: 0,
    user: user.id
  }

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  const likes = response.body.map(returned => returned.likes)
  assert.strictEqual(likes[likes.length - 1], 0)
})

test('blog without a title and an url is not saved', async () => {
  const loginInfo = {
    username: 'kayttaja1',
    password: 'salasana'
  }
  const returned = await api.post('/api/login').send(loginInfo)
  const token = returned.body.token
  const user = await User.find({})

  const newBlog = {
    author: 'a nobody',
    likes: 97,
    user: user.id
  }
  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlog)
    .expect(400)

  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, initialBlogAmount)
})

test('a blog can be deleted', async () => {
  const loginInfo = {
    username: 'kayttaja1',
    password: 'salasana'
  }
  const returned = await api.post('/api/login').send(loginInfo)
  const token = returned.body.token
  const user = await User.find({})
  const blogsInBeginning = await Blog.find({})
  const blogToDelete = blogsInBeginning[0]
  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .set('Authorization', `Bearer ${token}`)
    .expect(204)

  const blogsInEnd = await Blog.find({})
  const titles = blogsInEnd.map(blog => blog.title)

  assert(!titles.includes(blogToDelete.title))
  assert.strictEqual(blogsInEnd.length, initialBlogAmount -1) //tarkistaisi onko sama olio
})

test('a specific blog can be edited', async () => {
  const blogsInBeginning = await Blog.find({})
  const blogtoChange = blogsInBeginning[0]
  const changedBlog = {
    title: 'it is not good to give up',
    author: 'somebody',
    url: 'www.idk.yey',
    likes: 99
  }
  await api
    .put(`/api/blogs/${blogtoChange.id}`)
    .send(changedBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  const likes = response.body.map(blog => blog.likes)

  assert.strictEqual(response.body.length, initialBlogAmount)
  assert(likes.includes(99))

})

test('blog cannot be added if token not send, and returns 401', async () => {
  const loginInfo = {
    username: 'kayttaja1',
    password: 'salasana'
  }
  const returned = await api.post('/api/login').send(loginInfo)
  const token = returned.body.token
  const user = await User.find({})

  const newBlog = {
    title: 'it is not good to give up, i think?',
    author: 'somebodythatiusedtoknow',
    url: 'www.idkyet.yey',
    likes: 15,
    user: user.id
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(401)

  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, initialBlogAmount)
})

after(async () => {
  await mongoose.connection.close()
})