import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders title', () => {
  const blog = {
    title: 'a good title',
    author: 'a good author',
    url: 'a great url'
  }
  render(<Blog blog={blog}/>)

  const element = screen.getByText('a good title', { exact: false })
  expect(element).toBeDefined()
})