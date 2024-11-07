
describe('Comment', () => {
    beforeEach(() => {
      cy.viewport(1440, 900);
      cy.visit('/')
      cy.contains('¿Ya tienes cuenta? Ingresa Aquí').click()
  
      const validUserData = {
        sellerEmail: 'buyerTest@gmail.com',
        sellerPassword: 'Password123!',
      }    
      cy.get('#email').type(validUserData.sellerEmail)
      cy.get('#password').type(validUserData.sellerPassword)
      cy.get('.text-white').click()
  
      cy.url().should('include', '/buyer/products')

    })

    it('Add comment to product', () => {    
        cy.get('.container > :nth-child(2) > :nth-child(5)').click()
        cy.get('.bg-white > .justify-between').should('contain', 'Vestido')
        cy.get('.flex > div > .w-full').click()

        cy.get('.space-x-2 > :nth-child(4)').click()
        cy.get('.border').type('Comentario de prueba')

        cy.get('.mt-4').click()
    })

    it('See comment to product', () => {    
        cy.get(':nth-child(1) > .w-full').click()
        cy.get('.relative > :nth-child(4)').should('contain', 'Comentario de prueba')
    })

  })