import { useState } from 'react'

const Blog = ({ blog, user }) => {
  const [showAll, setShowAll] = useState(false)

  const toggleShow = () => {
    setShowAll(!showAll)
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
      <p>likes: {blog.likes}</p> 
      <p>{user.username}</p>
    </div> 
  )
}
 


export default Blog