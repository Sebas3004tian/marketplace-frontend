import 'cypress-file-upload';

describe('Options', () => {
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

  it('Add product and sizes for test', () => {
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
    cy.get('.absolute > .bg-\\[\\#2B2D42\\]').click()
    cy.contains('+ Añadir').click()
    cy.get('.mb-4 > .w-full').type('M')
    cy.get('.flex > .bg-blue-500').click()

    
    cy.contains('+ Añadir').click()
    cy.get('.mb-4 > .w-full').type('XL')
    cy.get('.flex > .bg-blue-500').click()
  })

  it('Add option for product', () => {
    cy.get('.absolute > .bg-\\[\\#2B2D42\\]').click()
    cy.get('.space-y-2 > :nth-child(1)').click()
    cy.get(':nth-child(3) > .bg-gray-100 > .flex > .px-3').click()

    cy.get('form > :nth-child(1) > .w-full').type('Color Black')
    cy.get('form > :nth-child(2) > .w-full').attachFile('ColorNegro.png');
    cy.get('.flex > .bg-blue-500').click()

    cy.get(':nth-child(1) > .items-center > div > .font-semibold').should('contain', 'Color Black')

    cy.get(':nth-child(1) > .flex-col > .text-blue-500').click()
    cy.get('form > :nth-child(4) > .w-full').type('300')
    cy.get('.flex > .bg-blue-500').click()

    cy.get('.text-gray-500').should('contain', '300')
  })

  it('Add option for product', () => {
    cy.get('.absolute > .bg-\\[\\#2B2D42\\]').click()
    cy.get('.space-y-2 > :nth-child(1)').click()
    
    cy.get('.flex-col > .text-red-500').click()
    cy.get('.bg-red-500').click()
    cy.get('.text-gray-500').should('be.visible');
  })

  it('Delete a test product', () => {
    cy.get(':nth-child(1) > .top-4 > img').click()
    cy.get('.bg-red-500').click()
    cy.get('.text-gray-600').should('contain', 'No hay productos disponibles.')
    cy.get(':nth-child(1) > .text-3xl').should('contain', '0')
  })
})