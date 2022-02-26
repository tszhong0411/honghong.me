describe('Nav Menus', () => {
  context('720px res', () => {
    beforeEach(() => {
      cy.viewport(1280, 720)
    })

    describe('When you visit home', () => {
      it('Should navigate to home page', () => {
        cy.visit('/')
      })

      describe('nav', () => {
        it('Should navigate to Blog page', () => {
          cy.get('[data-cy=nav-item]').contains('Blog').click()
          cy.url().should('include', '/blog')
        })
      })
    })
  })
})
