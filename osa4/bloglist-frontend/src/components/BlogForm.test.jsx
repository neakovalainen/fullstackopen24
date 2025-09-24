import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test.only('BlogForm calls onSubmit', async () => {
  const createBlog = vi.fn()

  render(<BlogForm onSubmit={createBlog}/>)
  const titleInput = screen.getByPlaceholderText('write title here')
  const authorInput = screen.getByPlaceholderText('write author here')
  const urlInput = screen.getByPlaceholderText('write url here')
  const sendButton = screen.getByText('create blog')

  await userEvent.type(titleInput, 'title')
  await userEvent.type(authorInput, 'author')
  await userEvent.type(urlInput, 'url')
  await userEvent.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)


  
})