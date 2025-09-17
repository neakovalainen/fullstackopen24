const express = require('express')
const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')
const blogRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')

const app = express()

mongoose.connect(config.mongoUrl)

app.use(express.json())
app.use('/api/blogs', blogRouter)
app.use('/api/users', usersRouter)
module.exports = app