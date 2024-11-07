describe('SubCategories', () => {
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

    cy.get('.container > div > :nth-child(3)').click();
    cy.url().should('include', '/seller/categories');
  })

    it('should filter subcategories by category', () => {
        cy.get(':nth-child(2) > .w-full').click();
        cy.contains('Vestidos').should('be.visible');
    });

    it('should create a new subcategory', () => {
        cy.get(':nth-child(2) > .w-full').click();
        cy.contains('Añadir Subcategoría').click();

        cy.get('.mb-4 > .w-full').type('Subcategoría de Prueba');
        cy.get('.bg-blue-500').click();

        cy.contains('Subcategoría de Prueba').should('be.visible');
    });

    it('should cancel subcategory creation', () => {
        cy.get(':nth-child(2) > .w-full').click();
        cy.contains('Añadir Subcategoría').click();

        cy.get('.mb-4 > .w-full').type('Subcategoría Cancelada');
        cy.get('.text-gray-600').click();

        cy.contains('Subcategoría Cancelada').should('not.exist');
    });

    it('should delete a subcategory', () => {
        cy.get(':nth-child(2) > .w-full').click();

        cy.contains('Subcategoría de Prueba').should('be.visible');

        cy.contains('Subcategoría de Prueba').parent().find('button').contains('Eliminar').click();
        cy.get('.bg-red-500').click();

        cy.contains('Subcategoría de Prueba').should('not.exist');
    });

    it('should display message when no subcategories are available', () => {
        cy.get(':nth-child(3) > .w-full').click();
        cy.contains('No hay subcategorías para esta categoría.').should('be.visible');
    });

    it('should display subcategories for the selected category', () => {
        cy.get(':nth-child(2) > .w-full').click(); 
        cy.contains('Vestidos').should('be.visible');

        cy.get(':nth-child(1) > .space-y-3 > :nth-child(1) > .w-full').click();
        cy.contains('Vestidos').should('not.exist');
        cy.contains('CAMISETA').should('be.visible');
    });

})