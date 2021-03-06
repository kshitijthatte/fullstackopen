import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }
  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }
  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title,
      author,
      url,
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title
          <input
            type='text'
            value={title}
            id='title'
            name='Title'
            onChange={handleTitleChange}
          />
        </div>
        <div>
          author
          <input
            type='text'
            value={author}
            id='author'
            name='Author'
            onChange={handleAuthorChange}
          />
        </div>
        <div>
          url
          <input
            type='text'
            value={url}
            id='url'
            name='Url'
            onChange={handleUrlChange}
          />
        </div>
        <button id='create' type='submit'>create</button>
      </form>
    </>
  )
}

export default BlogForm
