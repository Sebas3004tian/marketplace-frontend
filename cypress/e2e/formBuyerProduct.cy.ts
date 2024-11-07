
describe('UserproductOrder', () => {
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


    it('Ver informacion del producto', () => {
        cy.get(':nth-child(1) > .w-full').click()
        cy.get(':nth-child(3) > .text-gray-600').should('contain', 'Vestido de mujer, negro')
    })
    it('Add and delete product to shopping cart', () => {
        cy.get(':nth-child(1) > .w-full').click()

        cy.get('.px-4').click()
        cy.get('.mt-8 > :nth-child(3) > .p-2').select('Corto en seda con cinturón')

        cy.get('.rounded-r-lg').click()
        cy.get('.w-full').click()

        cy.get('.bg-slate-300').click()
        cy.get('.grid > .flex').should('contain', 'Vestido')

        cy.get('.bg-red-600').click()
        cy.get('.bg-white > .text-lg').should('contain', 'Tu carrito está vacío.')
    })

    it('Empty shopping cart', () => {
        cy.get(':nth-child(1) > .w-full').click()

        cy.get('.px-4').click()
        cy.get('.mt-8 > :nth-child(3) > .p-2').select('Corto en seda con cinturón')

        cy.get('.rounded-r-lg').click()
        cy.get('.w-full').click()

        cy.get('.bg-slate-300').click()
        cy.get('.grid > .flex').should('contain', 'Vestido')
        cy.get('.bg-red-700').click()
        cy.get('.bg-white > .text-lg').should('contain', 'Tu carrito está vacío.')
    })

    it('Add and delete product to shopping cart and pay', () => {
        cy.get(':nth-child(1) > .w-full').click()

        cy.get('.px-4').click()
        cy.get('.mt-8 > :nth-child(3) > .p-2').select('Corto en seda con cinturón')

        cy.get('.rounded-r-lg').click()
        cy.get('.w-full').click()

        cy.get('.bg-slate-300').click()
        cy.get('.grid > .flex').should('contain', 'Vestido')
        cy.get('.bg-gray-900').click()

        cy.get('.bg-white > .text-2xl').should('contain', 'Carrito')
        cy.get('.max-w-sm > .text-lg').should('contain', '300000')

        cy.get('.max-w-sm > .w-full').click()
    })

    it('view order history', () => {
        cy.get('.container > :nth-child(2) > :nth-child(5)').click()

        cy.get('.bg-white > .justify-between').should('contain', 'Vestido')
    })
  })