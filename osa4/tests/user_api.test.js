const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const assert = require('node:assert')
const bcrypt = require('bcrypt')
const User = require('../models/user')

const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('salasana', 10)
  const user = new User({ 
    username: 'kayttaja1', 
    name: 'noname',
    passwordHash
  })

  await user.save()
})

test.only('cannot create a new user, if username already exists', async () => {
  const users = await User.find({})
  const usersInBeginning = users.map(u => u.toJSON())
  const newUser = {
    username: 'kayttaja1',
    name: 'matkijakayttaja',
    password: 'salasanaononon',
  }

  const result = await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
    .expect('Content-Type', /application\/json/)

  const usersInEnd = await User.find({})
  const usersMapped = usersInEnd.map(u => u.toJSON())
  assert(result.body.error.includes('expected `username` to be unique'))

  assert.strictEqual(usersMapped.length, usersInBeginning.length)
})

test.only('cannot create a new user, if username too short', async () => {
  const users = await User.find({})
  const usersInBeginning = users.map(u => u.toJSON())
  const newUser = {
    username: 'sh',
    name: 'liianlyhyt',
    password: 'salasanaononon',
  }

  const result = await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
    .expect('Content-Type', /application\/json/)

  const usersInEnd = await User.find({})
  const usersMapped = usersInEnd.map(u => u.toJSON())

  assert.strictEqual(usersMapped.length, usersInBeginning.length)
})

after(async () => {
  await mongoose.connection.close()
})