import 'cypress-file-upload';

describe('UserSeller', () => {
  beforeEach(() => {
    cy.viewport(1440, 900);
    cy.visit('/')
    cy.contains('¿Ya tienes cuenta? Ingresa Aquí').click()

    const validUserData = {
      sellerEmail: 'sellerTest@gmail.com',
      sellerPassword: 'Password123!',
    }    
    cy.get('#email').type(validUserData.sellerEmail)
    cy.get('#password').type(validUserData.sellerPassword)
    cy.get('.text-white').click()

    cy.url().should('include', '/seller/products')
  })

  it('should have the profile information', () => {
    cy.get('.bg-\\[\\#D9D9D9\\]').click()  
    cy.get(':nth-child(2) > span').should('contain', 'sellerTest@gmail.com') 
  })

  it('should edit user successfully', () => {
    cy.get('.bg-\\[\\#D9D9D9\\]').click()  
    cy.get('.border-b').click()
    
    cy.get('#fullName').type(' edit')
    cy.get('.justify-end > .text-white').click()

    cy.get('.text-2xl').should('contain', 'sellerTest edit')
    cy.get('.bg-\\[\\#D9D9D9\\]').click()  
    cy.get('.bg-\\[\\#D9D9D9\\]').click()  
    cy.get('.border-b').click()
    
    cy.get('#fullName').clear().type('sellerTest')
    cy.get('.justify-end > .text-white').click()
  })
})
describe('UserBuyer', () => {
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
  
    it('should have the profile information', () => {
      cy.get('.bg-\\[\\#D9D9D9\\]').click()  
      cy.get(':nth-child(2) > span').should('contain', 'buyerTest@gmail.com') 
    })
  
    it('should edit user successfully', () => {
      cy.get('.bg-\\[\\#D9D9D9\\]').click()  
      cy.get('ul > :nth-child(2)').click()
      
      cy.get('#fullName').type(' edit')
      cy.get('.justify-end > .text-white').click()
  
      cy.get('.text-2xl').should('contain', 'buyerTest edit')
      cy.get('.bg-\\[\\#D9D9D9\\]').click()  
      cy.get('.bg-\\[\\#D9D9D9\\]').click() 
      cy.get('ul > :nth-child(2)').click()
      
      cy.get('#fullName').clear().type('buyerTest')
      cy.get('.justify-end > .text-white').click()
    })
  })