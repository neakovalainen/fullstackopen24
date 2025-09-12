const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes,0)
}

const favouriteBlog = (blogs) => {
  const returned =  blogs.reduce((mostliked, blog) => {
    if (mostliked.likes < blog.likes) {
      newliked = {
        ...blog
      }
      return newliked
    } else {
      return mostliked
    }
  }, blogs[0])
  return returned
}

/*const mostBlogs = (blogs) => {
  const authors = blogs.map(blog => blog.author)
  const amouts = _.countBy(authors)
  console.log(amouts)
}


const bloglist = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
   author: 'matti',
   url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 10,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 8,
    __v: 0
}
]
mostBlogs(bloglist)
*/
module.exports = {
  dummy,
  totalLikes,
  favouriteBlog
}