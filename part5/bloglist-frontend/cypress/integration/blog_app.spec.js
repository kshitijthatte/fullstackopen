describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Jhon Doe',
      username: 'jhon',
      password: 'jhon',
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user) 
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('login to application')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.contains('login').click()
      cy.get('#username').type('jhon')
      cy.get('#password').type('jhon')
      cy.get('#login-button').click()

      cy.contains('Jhon Doe logged in')
    })

    it('fails with wrong credentials', function () {
      cy.contains('login').click()
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'wrong credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', 'Jhon Doe logged in')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'jhon', password: 'jhon' })
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('Blog Title')
      cy.get('#author').type('cypress')
      cy.get('#url').type('Blog URL')
      cy.get('#create').click()
      cy.contains('a new blog Blog Title by cypress added')
    })

    describe('and several blogs exist', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'Microservices and the First Law of Distributed Objects',
          author: 'Martin Fowler',
          url:
            'https://martinfowler.com/articles/distributed-objects-microservices.html',
          likes: 10
        })
        cy.createBlog({
          title: 'Type wars',
          author: 'Robert C. Martin',
          url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
          likes: 2
        })
        cy.createBlog({
          title: 'You’re NOT gonna need it!',
          author: 'Ron Jeffries',
          url: 'https://ronjeffries.com/xprog/articles/practices/pracnotneed/',
          likes: 6
        })
      })

      it('user can like a blog', function () {
        cy.contains('Microservices and the First Law of Distributed Objects')
          .contains('view')
          .click()
        cy.contains('like').click()
        cy.contains('likes 11')
      })

      it('user can delete a blog', function () {
        cy.contains('Microservices and the First Law of Distributed Objects')
          .contains('view')
          .click()
        cy.get('#remove').click()
    
        cy.get('html').should(
          'not.contain',
          'Microservices and the First Law of Distributed Objects'
        )
      })

      it('blogs are ordered according to likes', function() {
        cy.get('.blog').then(blogs => {
          cy.wrap(blogs[0]).contains('Microservices and the First Law of Distributed Objects')
          cy.wrap(blogs[1]).contains('You’re NOT gonna need it!')
          cy.wrap(blogs[2]).contains('Type wars')
        })
      })
    })
  })
})
