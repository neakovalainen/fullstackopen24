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
      return { ...blog }
    }
    return mostliked
  }, blogs[0])
  return returned
}

const mostBlogs = (blogs) => {
  const authors = blogs.map(blog => blog.author) //lista authoreista

  const uniqueAuthors = Array.from(new Set(authors)) // tekee listan jossa jokaist vain yksi

  const returned = uniqueAuthors.reduce((mostBlogs, author) => { //käy läpi kaikki authorit mutta vaik kerran jokaisen
    const blogCount = authors.filter(blogAuthor => blogAuthor === author).length // jokaisesta authorista kerrallaan lista, jonka pituus on blogien määrä
    if (mostBlogs.blogCount < blogCount) { //palautetaan blogien määrän perusteella suurempi
      return { author, blogCount }
    }
    return mostBlogs
  }, { author: undefined, blogCount: 0 }) //palautettava ja verrattava muoto

  return returned
}

const mostLikes = (blogs) => {
  const authors = blogs.map(blog => blog.author)

  const uniqueAuthors = Array.from(new Set(authors))

  const returned = uniqueAuthors.reduce((mostBlogs, author) => {
    const likes = blogs
      .filter(blog => blog.author === author) // filteröidään halutun authorin blogit
      .map(blog => blog.likes) // lista blogien tykkyksistä
      .reduce((accumulatedLikes, blogLikes) => accumulatedLikes + blogLikes, 0) // tykkäykset summana

    if (mostBlogs.likes < likes) {
      return { author, likes }
    }
    return mostBlogs
  }, { author: undefined, likes: 0 })

  return returned
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
console.log(mostLikes(bloglist))

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog
}