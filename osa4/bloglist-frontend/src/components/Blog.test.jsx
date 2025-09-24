import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

const blog = {
    title: 'a good title',
    author: 'a good author',
    url: 'a great url',
    likes: 10,
    user: {
      username: 'mina'}
  }

test('renders title', () => {
  render(<Blog blog={blog}/>)

  const element = screen.getByText('a good title', { exact: false })
  expect(element).toBeDefined()
})

test('clicking the button makes url visible', async () => {
  render(<Blog user={'mina'} blog={blog}/>)
  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  const element = screen.getByText('a great url', { exact: false })
  expect(element).toBeVisible()
})

test('clicking the button makes likes visible', async () => {
  render(<Blog user={'mina'} blog={blog}/>)
  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  const element = screen.getByText('likes:', { exact: false })
  expect(element).toBeVisible()
})

test('clicking the button makes user visible', async () => {
  render(<Blog user={'mina'} blog={blog}/>)
  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  const element = screen.getByText('mina', { exact: false })
  expect(element).toBeVisible()
})

test('when like pressed twice, function called twice', async () => {
  const mockHandler = vi.fn()
  render(<Blog user={'mina'} blog={blog} like={mockHandler}/>)

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  const likeButton = screen.getByText('like')
  await user.click(likeButton)
  await user.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
  
})