import React, { useState } from 'react'

const Blog = ({ blog, updateLikes, onRemove }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const [visibility, setVisibility] = useState(false)
  const toggleVisibility = { display: visibility ? '' : 'none' }

  const [likes, setLikes] = useState(blog.likes);

  return (
    <div className='blog' style={blogStyle}>
      {blog.title} {blog.author}{' '}
      <button onClick={() => setVisibility(!visibility)}>
        {visibility ? 'hide' : 'view'}
      </button>
      <div style={toggleVisibility}>
        <div>{blog.url}</div>
        <div>
          likes {likes} <button onClick={()=>{ updateLikes(blog); setLikes(likes + 1); }}>like</button>
        </div>
        <div>{blog.user.name}</div>
        <button id='remove' onClick={() => onRemove(blog)}>remove</button>
      </div>
    </div>
  )
}

export default Blog
