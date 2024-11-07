

describe('Seller Login', () => {
    it('passes Login',() => {
        cy.visit('/')
        cy.contains('¿Ya tienes cuenta? Ingresa Aquí').click()

        cy.get('#email').type('sellerTest@gmail.com')
        cy.get('#password').type('Password123!')

        cy.get('.text-white').click()

        
    cy.url().should('include', '/seller/products')
    })
  })

describe('Buyer Login', () => {
    it('passes Login',() => {
        cy.visit('/')
        cy.contains('¿Ya tienes cuenta? Ingresa Aquí').click()

        cy.get('#email').type('buyerTest@gmail.com')
        cy.get('#password').type('Password123!')

        cy.get('.text-white').click()


        cy.url().should('include', '/buyer/products')
    })
})