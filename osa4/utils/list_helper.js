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

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog
}