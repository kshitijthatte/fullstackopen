import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)

  const getBlogs = async () => {
    const blogs = await blogService.getAll()
    blogs.sort((a, b) => b.likes - a.likes)
    setBlogs(blogs)
  }

  useEffect(() => {
    getBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const notifyWith = (message, type = 'success') => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })
      notifyWith(`${user.name} logged in`)
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      notifyWith('wrong username or password', 'error')
    }
  }

  const blogFormRef = useRef()

  const addBlog = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility()
      const newBlog = await blogService.create(blogObject)
      notifyWith(`a new blog ${newBlog.title} by ${newBlog.author} added`)

      getBlogs()
    } catch (exception) {
      notifyWith(`${exception}`, 'error')
    }
  }

  const deleteBlog = async (blog) => {
    if (user.username === blog.user.username) {
      if (window.confirm(`Remove blog ${blog.title} ${blog.author} ?`)) {
        await blogService.deleteBlog(blog.id)
        getBlogs()
      }
    } else {
      alert('Unauthorized')
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type='text'
          value={username}
          name='Username'
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type='password'
          value={password}
          name='Password'
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type='submit'>login</button>
    </form>
  )

  const blogForm = () => (
    <Togglable buttonLabel='new blog' ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )

  return (
    <div>
      {user === null ? (
        <>
          <h2>login to application</h2>

          <Notification notification={notification} />

          {loginForm()}
        </>
      ) : (
        <>
          <h2>blogs</h2>
          <Notification notification={notification} />
          <div>
            {user.name} logged in
            <button
              onClick={() => {
                window.localStorage.clear()
                setUser(null)
              }}
            >
              logout
            </button>
          </div>

          {blogForm()}
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} onRemove={deleteBlog} />
          ))}
        </>
      )}
    </div>
  )
}

export default App
