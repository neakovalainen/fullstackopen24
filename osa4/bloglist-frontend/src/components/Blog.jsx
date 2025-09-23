import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, user, blogs, setBlogs }) => {
  const [showAll, setShowAll] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const toggleShow = () => {
    setShowAll(!showAll)
  }
  const like = async event => {
    event.preventDefault()
    try {
      const { title, author, url, id } = blog
      const blogNew = await blogService.like({ title, author, url, likes, id })
      setLikes(likes + 1)
      setBlogs(blogs.map(blog => blog.id !== blogNew.id ? blog : blogNew))
    } catch {
      console.log('big error oh noh')
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
      <p>{blog.url}</p>
      <p>likes: {likes}</p>
      <button onClick={like}>like</button>
      <p>{user.username}</p>
    </div> 
  )
}
 


export default Blog