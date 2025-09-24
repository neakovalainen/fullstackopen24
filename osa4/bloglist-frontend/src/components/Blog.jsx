import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, user, blogs, setBlogs }) => {
  const [showAll, setShowAll] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const toggleShow = () => {
    setShowAll(!showAll)
    console.log(blog)
    console.log(blogs)
  }

  const like = async event => {
    event.preventDefault()
    try {
      const { title, author, url, id, user } = blog
      const blogNew = await blogService.like({ title, author, url, likes, id, user })
      setLikes(likes + 1)
      setBlogs(blogs.map(blog => blog.id !== blogNew.id ? blog : blogNew))
    } catch {
      console.log('big error oh noh')
    }
  }

  const remove = async event => {
    event.preventDefault()
    console.log('id in front', blog.id)
    if (window.confirm('ooks varma et haluut poistaa? :((')) {
      try {
        await blogService.remove({ id: blog.id })
        setBlogs(blogs.filter(blogToFilter => blogToFilter.id !== blog.id))
      } catch {
        console.log('error when deletings')
      }
    }
  }

  if (showAll === false)
    return (
      <div>
        {blog.title} {blog.author}
        <button onClick={toggleShow}>
          view
        </button>
      </div>
    )
  return (
    <div className="blogstyle">
      <p>{blog.title}, by: {blog.author}
        <button onClick={toggleShow}>
          hide
        </button>
      </p>
      <p>url: {blog.url}</p>
      <p>likes: {likes}</p>
      <button onClick={like}>like</button>
      <p>{blog.user.username}</p>
      {
        blog.user.username === user.username
          ?
          (
            <button onClick={remove}>
              delete blog
            </button>
          )
          : null
      }
    </div>
  )
}

export default Blog