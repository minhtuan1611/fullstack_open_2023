import React from 'react'
import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog.jsx'
import LikeButton from './LikeButton.js'

const blog = {
  author: 'Mtuan nguyen',
  title: 'Mot ngay hay tram nam',
  url: 'kekeke.com',
  likes: 40,
  user: {
    username: 'gheheeh',
  },
}

function renderComponent() {
  return render(<Blog blog={blog} handleLike={mockHandleLike} />)
}

const mockHandleLike = jest.fn()

test(' blog renders the blogs title and author, but does not render its URL or number of likes by default.', () => {
  renderComponent()
  const titleElement = screen.getByText(blog.title, { exact: false })
  const authorElement = screen.getByText(blog.author, { exact: false })

  expect(titleElement).toBeDefined()
  expect(authorElement).toBeDefined()

  const urlElement = screen.queryByText(blog.url)
  const likesElement = screen.queryByText(`${blog.likes} likes`)

  expect(urlElement).not.toBeInTheDocument()
  expect(likesElement).not.toBeInTheDocument()
})

test('URL and number of likes are shown when the button controlling the shown details has been clicked', async () => {
  renderComponent()
  const button = screen.getByText('View Details')
  await userEvent.click(button)
  const updatedUrlElement = screen.getByText(blog.url, { exact: false })
  const updatedLikesElement = screen.getByText(`${blog.likes} likes`, {
    exact: false,
  })
  expect(updatedUrlElement).toBeInTheDocument()
  expect(updatedLikesElement).toBeInTheDocument()
})

test('clicking the like button twice calls the event handler twice', async () => {
  renderComponent()
  const button = screen.getByText('View Details')
  await userEvent.click(button)
  const updatedLikesElement = screen.getByText('Like')
  fireEvent.click(updatedLikesElement)
  fireEvent.click(updatedLikesElement)

  expect(mockHandleLike.mock.calls).toHaveLength(0)
})
test('calls onClick prop twice when button is clicked twice', () => {
  const onClickMock = jest.fn()
  const { getByText } = render(<LikeButton onClick={onClickMock} />)
  const likeButton = getByText('Like')
  fireEvent.click(likeButton)
  fireEvent.click(likeButton)
  expect(onClickMock).toHaveBeenCalledTimes(2)
})
