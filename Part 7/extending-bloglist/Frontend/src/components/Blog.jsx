import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog }) => {
  const [showDetails, setShowDetails] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const toggleDetails = () => {
    setShowDetails(!showDetails)
  }

  const handleLike = async () => {
    try {
      blog.likes = blog.likes + 1
      const updatedBlog = await blogService.update(blog.id, {
        likes: likes + 1,
      })
      setLikes(updatedBlog.likes)
    } catch (error) {
      console.error('Error liking the blog:', error)
    }
  }

  const handleDelete = async () => {
    if (window.confirm('Do you really want to delete this blog?')) {
      try {
        await blogService.deleteBlog(blog.id)
        window.location.reload()
      } catch (error) {
        console.error(error)
      }
    }
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  return (
    <div style={blogStyle}>
      <div className="blog">
        {blog.title} {blog.author}
        <button onClick={toggleDetails}>
          {showDetails ? 'Hide' : 'View'} Details
        </button>
      </div>
      {showDetails && (
        <div>
          {blog.url}
          <br />
          <span>
            {blog.likes} likes <button onClick={handleLike}>Like</button>
          </span>
          <br />
          {blog.user.username}
          {blog.user && blog.user.username === blog.user.username && (
            <button onClick={handleDelete}>Delete</button>
          )}
        </div>
      )}
    </div>
  )
}

export default Blog
