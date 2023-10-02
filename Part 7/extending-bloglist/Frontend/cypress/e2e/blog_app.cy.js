describe('Blog app', function() {
  const backUrl = 'http://localhost:3003'
  const frontUrl = 'http://localhost:5173'
  const user = {
    name: 'mtuan',
    username: 'mtuan',
    password: 'mtuan',
  }
  const anotherUser = {
    username: 'thuygiang',
    name: 'thuygiang',
    password: 'thuygiang',
  }
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.request('POST', 'http://localhost:3003/api/users/', anotherUser)
    cy.visit(`${frontUrl}`)
  })

  it('Login form is shown', function() {
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type(`${user.username}`)
      cy.get('#password').type(`${user.password}`)
      cy.get('#login-button').click()

      cy.contains('mtuan logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('mtuann')
      cy.get('#password').type('mtuann')
      cy.get('#login-button').click()

      cy.contains('Wrong username or password')
    })
  })

  describe('When logged in', function() {
    const newBlog = {
      title: 'King of Elements',
      author: 'James',
      url: 'youtube.com',
    }

    beforeEach(function() {
      cy.login(user)
    })

    it('should be able to create blog', function() {
      cy.contains('New blog').click()
      cy.get('#newAuthor').type(newBlog.author)
      cy.get('#newTitle').type(newBlog.title)
      cy.get('#newUrl').type(newBlog.url)
      cy.contains('save').click()
      cy.contains('A new blog "King of Elements" by James added')
    })
    it('should be able to like a blog', function() {
      cy.contains('New blog').click()
      cy.get('#newAuthor').type(newBlog.author)
      cy.get('#newTitle').type(newBlog.title)
      cy.get('#newUrl').type(newBlog.url)
      cy.contains('save').click()
      cy.contains('View Details').click()
      cy.contains('0 likes')
      cy.contains('Like').click()
      cy.contains('1 likes')
    })

    it('should be able to delete a blog', function() {
      cy.contains('New blog').click()
      cy.get('#newAuthor').type(newBlog.author)
      cy.get('#newTitle').type(newBlog.title)
      cy.get('#newUrl').type(newBlog.url)
      cy.contains('save').click()
      cy.contains('View Details').click()
      cy.contains('Delete').click()
      cy.contains(`${newBlog.title} ${newBlog.author}`).should('not.exist')
    })

    it('only the creator can see the delete button of a blog, not anyone else.', function() {
      cy.contains('New blog').click()
      cy.get('#newAuthor').type(newBlog.author)
      cy.get('#newTitle').type(newBlog.title)
      cy.get('#newUrl').type(newBlog.url)
      cy.contains('save').click()
      cy.contains('Log out').click()
      cy.get('#username').type('thuygiang')
      cy.get('#password').type('thuygiang')
      cy.get('#login-button').click()
      cy.contains('View Details').click()
      cy.contains('Delete').click()
      cy.contains(`${newBlog.title} ${newBlog.author}`)
    })
  })
})
