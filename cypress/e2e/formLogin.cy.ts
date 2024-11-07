describe('Login', () => {
    beforeEach(() => {
      cy.viewport(1440, 900);
      cy.visit('/')
      cy.contains('¿Ya tienes cuenta? Ingresa Aquí').click()
    })

    const validUserData = {
      sellerEmail: 'sellerTest@gmail.com',
      sellerPassword: 'Password123!',
      buyerEmail: 'buyerTest@gmail.com',
      buyerPassword: 'Password123!'
    }
  
    it('should login a seller successfully', () => {
      cy.get('#email').type(validUserData.sellerEmail)
      cy.get('#password').type(validUserData.sellerPassword)
      cy.get('.text-white').click()
  
      cy.url().should('include', '/seller/products')
    })
  
    it('should login a buyer successfully', () => {
      cy.get('#email').type(validUserData.buyerEmail)
      cy.get('#password').type(validUserData.buyerPassword)
      cy.get('.text-white').click()
  
      cy.url().should('include', '/buyer/products')
    })
  
    it('should show an error for invalid credentials', () => {
      cy.get('#email').type('invalidUser@example.com')
      cy.get('#password').type('WrongPassword123')
      cy.get('.text-white').click()
  
      cy.get('.text-red-500').should('contain', 'Correo o contraseña incorrectos')
    })
  
    it('should show an error for admin user login', () => {
      cy.get('#email').type('admin@example.com')
      cy.get('#password').type('Password123!')
      cy.get('.text-white').click()
  
      cy.get('.text-red-500').should('contain', 'Admin no es permitido en esta sección')
    })
  })