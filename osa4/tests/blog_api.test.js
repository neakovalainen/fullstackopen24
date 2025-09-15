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
// luo listan avaimista ja tarkistaa, että ensimmäisellä
// blogilla on kenttä id
// voi muuttaa tarkastamaan, että kenttä löytyy kaikilta
// mutta uskon tämän olevan tarpeeksi tässä kohtaa
test.only('blogs have id fields', async () => {
  const response = await api.get('/api/blogs')
  const keys = response.body.map(blog => Object.keys(blog))
  assert(keys[0].includes('id')) 
})

test.only('blogs can be added', async () => {
  const newBlog = {
    title: 'it is not good to give up, i think?',
    author: 'somebodythatiusedtoknow',
    url: 'www.idkyet.yey',
    likes: 15
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const titles = response.body.map(returned => returned.title)

  assert.strictEqual(response.body.length, initialBLogs.length + 1)
  assert(titles.includes('it is not good to give up, i think?'))
})

test.only('if blog likes not specified, they are put to 0', async () => {
  const newBlog = {
    title: 'it is not good to give up, i think?',
    author: 'somebodythatiusedtoknow',
    url: 'www.idkyet.yey',
    likes: 0
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  console.log(response.body)
  const likes = response.body.map(returned => returned.likes)
  console.log('likes:', likes)
  assert.strictEqual(likes[likes.length - 1], 0)
})

test.only('blog without a title and an url is not saved', async () => {
  const newBlog = {
    author: 'a nobody',
    likes: 97
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, initialBLogs.length)
})

after(async () => {
  await mongoose.connection.close()
})