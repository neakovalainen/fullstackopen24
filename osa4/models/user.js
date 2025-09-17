const { transform } = require('lodash')
const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true, // käyttäjänimen tulee olla yksikäsitteinen
    minlength: 3
  },
  name: String,
  passwordHash: {
    type: String,
    required: true,
    minlength: 3
  },
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog'
    }
  ]
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash //don't wanna show password!
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User