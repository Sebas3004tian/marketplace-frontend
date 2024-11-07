import 'cypress-file-upload';

describe('template spec', () => {
  beforeEach(() => {
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

  it('should navigate to create product page', () => {
    cy.get('.bg-green-600').click();
    cy.url().should('include', '/seller/products/create');
  });
  

  it('should create a product', () => {

    cy.get('.flex-col > .flex').click()
    cy.get(':nth-child(1) > .mt-1').type('Producto de prueba')
    cy.get(':nth-child(2) > .mt-1').type('Descripcion de prueba')
    cy.get(':nth-child(3) > .mt-1').type('10000')
    cy.get(':nth-child(4) > .mt-1').attachFile('vestidoMujer.jpeg');
    cy.get(':nth-child(5) > .mt-1').select('Mujer')
    cy.get(':nth-child(6) > .mt-1').select('Vestidos')

    cy.get('.bg-green-600').click()

    cy.get('.text-xl').should('contain', 'Producto de prueba')
    cy.get(':nth-child(1) > .text-3xl').should('contain', '1')
  })

  it('should search products by name', () => {
    cy.get('input[placeholder="Buscar productos por nombre..."]').type('Producto de prueba');
    cy.get('.text-xl').should('contain', 'Producto de prueba');
  });

  it('should filter products by category', () => {
    cy.get('select').eq(0).select('Mujer');
    cy.get('.text-xl').should('contain', 'Producto de prueba')
    cy.get('.flex-grow > :nth-child(2)').each(($el) => {
      cy.wrap($el).should('contain', 'Mujer');
    });
  });

  it('should filter products by subcategory', () => {
    cy.get('select').eq(0).select('Mujer');
    cy.get('select').eq(1).select('Vestidos');
    cy.get('.text-xl').should('contain', 'Producto de prueba')
    cy.get('.flex-grow > :nth-child(2)').each(($el) => {
      cy.wrap($el).should('contain', 'Mujer');
    });
    cy.get('.flex-grow > :nth-child(2)').each(($el) => {
      cy.wrap($el).should('contain', 'Vestidos');
    });
  });

  it('should delete a product', () => {
    cy.get(':nth-child(1) > .top-4 > img').click()
    cy.get('.bg-red-500').click()
    cy.get('.text-gray-600').should('contain', 'No hay productos disponibles.')
    cy.get(':nth-child(1) > .text-3xl').should('contain', '0')
  })
  
  
})