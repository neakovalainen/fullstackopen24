const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const assert = require('node:assert')
const Blog = require('../models/blog')

const api = supertest(app)

const initialBLogs = [
  {
    title: 'it is not good to give up',
    author: 'somebody',
    url: 'www.idk.yey',
    likes: 5
  },
  {
    title: 'reading does good things for you',
    author: 'me',
    url: 'diary',
    likes: 10,
  },
  {
    title: 'you should take a nap',
    author: 'me when eepy',
    url: 'www.thedeeppartsofmybrain.com',
    likes: 8
}
]

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBLogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBLogs[1])
  await blogObject.save()
  blogObject = new Blog(initialBLogs[2])
  await blogObject.save()
})

test.only('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('COntent-Type', /application\/json/)
})

test.only('correct amount of blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, initialBLogs.length)

})

after(async () => {
  await mongoose.connection.close()
})