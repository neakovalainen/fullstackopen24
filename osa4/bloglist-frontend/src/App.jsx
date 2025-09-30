import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [error, setError] = useState(null)
  const [confirmation, setConfirmation] = useState(null)

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
      setConfirmation('logged in successfully')
      setTimeout(() => {
        setConfirmation(null)
      }, 3000)
    } catch {
      setError('wrong credentials oh noh')
      setTimeout(() => {
        setError(null)
      }, 5000)
    }
  }

  const handleLogout = async event => {
    event.preventDefault()
    window.localStorage.clear()
    setUser(null)
    setPassword('')
    setUsername('')
    setConfirmation('logged out successfully :3')
    setTimeout(() => {
      setConfirmation(null)
    }, 3000)
  }

  const createBlog = async event => {
    event.preventDefault()
    try {
      const blog = await blogService.create({ title, author, url })
      setBlogs(blogs.concat(blog))
      setConfirmation(`a new blog has been created successfully<33`)
      setTimeout(() => {
        setConfirmation(null)
      }, 5000)
      setTitle('')
      setAuthor('')
      setUrl('')
    } catch {
      setError(' blog not saved, error occurred')
      setTimeout(() => {
        setError(null)
      }, 5000)
    }
  }

  const Notification = ({ message }) => {
    if (message === null) {
      return null
    }
    return (
      <div className="confirmation">
        {message}
      </div>
    )
  }

  const Error = ({ message }) => {
    if (message === null) {
      return null
    }
    return (
      <div className="error">
        {message}
      </div>
    )
  }
  if ( user === null ) {
    return (
      <div>
        <Notification message={confirmation} />
        <Error message={error} />
        <h2>log in by pressing the button below</h2>
        <Togglable buttonLabel='login'>
          <LoginForm
            username={username}
            password={password}
            handleLogin={handleLogin}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
          />
        </Togglable>
      </div>
    )
  }
  return (
    <div>
      <Notification message={confirmation} />
      <Error message={error} />
      <div>
        <h1>blogs</h1>
        <p> {user.name} has logged in</p>
        <form onSubmit={(event) => handleLogout(event)}>
          <button type="submit">log out</button>
        </form>
        <Togglable buttonLabel="new blog">
          <BlogForm
            title={title}
            author={author}
            url={url}
            onSubmit={(event) => createBlog(event)}
            changeTitle={({ target }) => setTitle(target.value)}
            changeAuthor={({ target }) => setAuthor(target.value)}
            changeUrl={({ target }) => setUrl(target.value)}
          />
        </Togglable>
        {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
          <Blog key={blog.id} blog={blog} user={user} blogs={blogs} setBlogs={setBlogs}/>
        )}
      </div>
    </div>
  )
}

export default App