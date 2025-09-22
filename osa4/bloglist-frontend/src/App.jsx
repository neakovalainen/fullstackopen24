import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async event => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      console.log(window.localStorage)
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      console.log(user)
    } catch {
      setErrorMessage('wrong credentials oh noh')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async event => {
    event.preventDefault()
    window.localStorage.clear()
    setUser(null)
    setPassword('')
    setUsername('')
  }

  const createBlog = async event => {
    event.preventDefault()
    try {
      const blog = await blogService.create({ title, author, url })
      setBlogs(blogs.concat(blog))
      setTitle('')
      setAuthor('')
      setUrl('')
    } catch {
      setErrorMessage(' blog not saved, error occurred')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }
  if (user === null) {
    return (
      <div>
        <h1> log in from here! </h1>
        <form onSubmit={handleLogin}>
          <div>
            <label>
              username
              <input
                type="type"
                value={username}
                onChange={({ target }) => setUsername(target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              password
              <input
                type="password"
                value={password}
                onChange={({ target }) => setPassword(target.value)}
              />
            </label>
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
    }
    return (
      <div>
        <h1>blogs</h1>
        <form onSubmit={(event) => handleLogout(event)}>
          <button type="submit">log out</button>
        </form>
        <p>logged in as {user.username}</p>
        <h2>create new</h2>
        <form onSubmit={(event) => createBlog(event)}>
          <div>
            <label>
              title:
              <input
                type="type"
                value={title}
                onChange={({ target }) => setTitle(target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              author:
              <input
                type="type"
                value={author}
                onChange={({ target }) => setAuthor(target.value)}  
              />
            </label>
          </div>
          <div>
            <label>
              url:
              <input
                type="type"
                value={url}
                onChange={({ target }) => setUrl(target.value)}
              />
            </label>
          </div>
          <button type="submit">create blog</button>
        </form>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div> 
    )
}

export default App