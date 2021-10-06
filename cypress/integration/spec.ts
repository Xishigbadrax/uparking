describe('My First Test', () => {
  it('Visits the initial project page', () => {
    cy.visit('/')
    cy.contains('Энд Танилцуулага байна.')
    cy.contains(' Хамуга Систем ')
  })
})
