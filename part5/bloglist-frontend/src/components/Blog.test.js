import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'
import BlogForm from './BlogForm'


describe('Blog', () => {
  let component
  const mockHandler = jest.fn()
  beforeEach(() => {
    const blog = {
      title: 'Test Blog Title',
      author: 'Test Blog Author',
      url: 'http://blog.testurl.com/',
      likes: 0,
      user: '6013a1c678cb4d268041472a',
    }

    component = render(<Blog blog={blog} updateLikes={mockHandler} />)
  })

  test('at start the title and author are rendered, but not it\'s url or number of likes', () => {
    const div = component.container.querySelector('.blog')
    const hiddenDiv = component.container.querySelector('.blog > div')

    expect(div).toHaveTextContent('Test Blog Title')
    expect(div).toHaveTextContent('Test Blog Author')

    expect(hiddenDiv).toHaveStyle('display: none')
  })

  test('after clicking the button, url and number of likes are shown', () => {
    const button = component.getByText('view')
    fireEvent.click(button)

    const div = component.container.querySelector('.blog > div')
    expect(component.container.querySelector('.blog > div > div:nth-child(1)')).toHaveTextContent('http://blog.testurl.com/')
    expect(component.container.querySelector('.blog > div > div:nth-child(2)')).toHaveTextContent('likes 0')
    expect(div).not.toHaveStyle('display: none')
  })

  test('if the like button is clicked twice, the event handler the component received as props is called twice', () => {
    const button = component.getByText('like')
    fireEvent.click(button)
    fireEvent.click(button)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })

  test('test for the new blog form', () => {
    const createBlog = jest.fn()

    const component = render(<BlogForm createBlog={createBlog} />);

    const title = component.container.querySelector('#title');
    const author = component.container.querySelector('#author');
    const url = component.container.querySelector('#url');
    const form = component.container.querySelector('form')

    fireEvent.change(title, {
      target: { value: 'testing blog' },
    })
    fireEvent.change(author, {
      target: { value: 'testing author' },
    });
    fireEvent.change(url, {
      target: { value: 'testing url' },
    });
    fireEvent.submit(form)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('testing blog')
    expect(createBlog.mock.calls[0][0].author).toBe('testing author')
    expect(createBlog.mock.calls[0][0].url).toBe('testing url')
  }) 

})

