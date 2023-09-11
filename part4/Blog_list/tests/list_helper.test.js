const listHelper = require('../utils/list_helper')

describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })
})



describe('favoriteBlogs', () => {
  const listWithmanyBlog = [
    {
      title: 'Blog 3',
      author: 'Author 3',
      likes: 10,
    },
    {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12
    },
    {
      title: 'Hehehehe mememee',
      author: 'Edsger W. Dijkstra',
      likes: 11
    }
  ]

  test('find the most liked blog', () => {
    const result = listHelper.favouriteBlog(listWithmanyBlog)

    const expectedBlog = {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12
    }
    expect(result).toEqual(expectedBlog)
  })
})

describe('mostBlogs', () => {
  test('returns the author with the most blogs and the number of blogs', () => {
    const blogs = [
      { title: 'Blog 1', author: 'Author A' },
      { title: 'Blog 2', author: 'Author B' },
      { title: 'Blog 3', author: 'Author A' },
      { title: 'Blog 4', author: 'Author B' },
      { title: 'Blog 5', author: 'Author B' },
    ]

    const result = listHelper.mBlogs(blogs)

    expect(result).toEqual({ author: 'Author B', blogs: 3 })
  })
})

describe('mostLikes', () => {
  test('returns the author with the most likes and the total number of likes', () => {
    const blogs = [
      { title: 'Blog 1', author: 'Author A', likes: 10 },
      { title: 'Blog 2', author: 'Author B', likes: 5 },
      { title: 'Blog 3', author: 'Author A', likes: 15 },
      { title: 'Blog 4', author: 'Author B', likes: 20 },
      { title: 'Blog 5', author: 'Author B', likes: 30 },
    ]
    const result = listHelper.mLikes(blogs)
    expect(result).toEqual({ author: 'Author B', likes: 55 })
  })
})