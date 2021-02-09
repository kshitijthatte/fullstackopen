import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, onRemove }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const [visibility, setVisibility] = useState(false)
  const toggleVisibility = { display: visibility ? '' : 'none' }

  const [likes, setLikes] = useState(blog.likes)

  const updateLikes = () => {
    blogService.update(blog.id, { ...blog, likes: (blog.likes += 1) })
    setLikes(likes + 1)
  }

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}{' '}
      <button onClick={() => setVisibility(!visibility)}>
        {visibility ? 'hide' : 'view'}
      </button>
      <div style={toggleVisibility}>
        <div>{blog.url}</div>
        <div>
          likes {likes} <button onClick={updateLikes}>like</button>
        </div>
        <div>{blog.user.name}</div>
        <button onClick={() => onRemove(blog)}>remove</button>
      </div>
    </div>
  )
}

export default Blog
