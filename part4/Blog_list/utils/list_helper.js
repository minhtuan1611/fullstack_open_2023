const dummy = (blogs) => {
  blogs
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favouriteBlog = (blogs) => {
  return blogs.reduce((maxB, curB) => {
    if(curB.likes > maxB.likes) {
      return curB
    } else {
      return maxB
    }
  })
}

const lod = require('lodash')

const mBlogs = (blogs) => {
  const authorC = lod.countBy(blogs,'author')
  const topAu = lod.maxBy(lod.keys(authorC), (author) => authorC[author])
  return { author: topAu, blogs: authorC[topAu] }
}

const mLikes = (blogs) => {
  const authorL = lod.groupBy(blogs, 'author')
  lod.forEach(authorL, (authorB, author) => {
    authorL[author] = lod.sumBy(authorB, 'likes')
  })

  const topAu = lod.maxBy(lod.keys(authorL),(author) => authorL[author])
  return { author:  topAu , likes: authorL[topAu] }
}


module.exports = {
  totalLikes,
  dummy,
  favouriteBlog,
  mLikes,
  mBlogs,
}