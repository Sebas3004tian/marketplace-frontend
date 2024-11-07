

describe('Seller Registration', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.get('.justify-start > a > .flex').click()
  })

  const generateRandomEmail = () => {
    const timestamp = new Date().getTime()
    return `seller_${timestamp}@test.com`
  }

  const fillRegistrationForm = ({
    fullName = 'Test Seller',
    email = generateRandomEmail(),
    password = 'Password123!',
    address = 'Calle Test 123'
  } = {}) => {
    cy.get('.space-y-4 > :nth-child(1) > .w-full').type(fullName)
    cy.get('.space-y-4 > :nth-child(2) > .w-full').type(email)
    cy.get(':nth-child(3) > .w-full').type(password)
    cy.get(':nth-child(4) > .w-full').type(password)
    cy.get(':nth-child(5) > .w-full').type(address)
  }

  it('should register a seller successfully', () => {
    cy.intercept('POST', 'https://marketplace-backend-production-d4eb.up.railway.app/auth/register').as('registerRequest')

    fillRegistrationForm()

    cy.get('.space-y-4 > .bg-\\[\\#2B2D42\\]').click()

    cy.wait('@registerRequest').then((interception) => {
      expect(interception.response?.statusCode).to.equal(201)
    })

    cy.url().should('include', '/seller/products')
  })

  it('should show validation errors for invalid inputs', () => {
    const testCases = [
      {
        scenario: 'short name',
        data: { fullName: 'Te' },
        expectedError: 'El nombre completo debe tener al menos 3 caracteres'
      },
      {
        scenario: 'invalid email',
        data: { email: 'invalid-email' },
        expectedError: 'El correo electrónico no es válido'
      },
      {
        scenario: 'short password',
        data: { password: 'Aa1!' },
        expectedError: 'La contraseña debe tener al menos 6 caracteres'
      },
      {
        scenario: 'weak password',
        data: { password: '123456' },
        expectedError: 'La contraseña es demasiado débil'
      },
      {
        scenario: 'short address',
        data: { address: 'Cal' },
        expectedError: 'La dirección debe tener al menos 5 caracteres'
      }
    ]

    testCases.forEach(({ scenario, data, expectedError }) => {
      it(`should validate ${scenario}`, () => {
        const formData = {
          fullName: 'Test Seller',
          email: generateRandomEmail(),
          password: 'Password123!',
          address: 'Calle Test 123',
          ...data
        }
        
        fillRegistrationForm(formData)
        cy.get('.space-y-4 > .bg-\\[\\#2B2D42\\]').click()
        cy.get('.text-red-500').should('contain', expectedError)
      })
    })
  })

  it('should handle server errors gracefully', () => {
    cy.intercept('POST', 'https://marketplace-backend-production-d4eb.up.railway.app/auth/register', {
      statusCode: 500,
      body: {
        message: 'Error interno del servidor'
      }
    }).as('failedRequest')

    fillRegistrationForm()
    cy.get('.space-y-4 > .bg-\\[\\#2B2D42\\]').click()
    
    cy.get('.text-red-500').should('contain', 'Error al registrar el usuario')
  })

  it('should prevent duplicate email registration', () => {
    const testEmail = generateRandomEmail()
    
    cy.intercept('POST', 'https://marketplace-backend-production-d4eb.up.railway.app/auth/register', {
      statusCode: 400,
      body: {
        message: 'El correo electrónico ya está registrado'
      }
    }).as('duplicateEmailRequest')

    fillRegistrationForm({ email: testEmail })
    cy.get('.space-y-4 > .bg-\\[\\#2B2D42\\]').click()
    
    cy.get('.text-red-500').should('be.visible')
  })

  it('should have proper password confirmation validation', () => {
    fillRegistrationForm()
    cy.get(':nth-child(4) > .w-full').clear().type('DifferentPassword123!')
    cy.get('.space-y-4 > .bg-\\[\\#2B2D42\\]').click()
    
    cy.get('.text-red-500').should('contain', 'Las contraseñas no coinciden')
  })
})


describe('Buyer Registration', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.get('.justify-end > a > .flex').click()
  })

  const generateRandomEmail = () => {
    const timestamp = new Date().getTime()
    return `buyer_${timestamp}@test.com`
  }

  const fillRegistrationForm = ({
    fullName = 'Test Buyer',
    email = generateRandomEmail(),
    password = 'Password123!',
    address = 'Calle Test 123'
  } = {}) => {
    cy.get('.space-y-4 > :nth-child(1) > .w-full').type(fullName)
    cy.get('.space-y-4 > :nth-child(2) > .w-full').type(email)
    cy.get(':nth-child(3) > .w-full').type(password)
    cy.get(':nth-child(4) > .w-full').type(password)
    cy.get(':nth-child(5) > .w-full').type(address)
  }

  it('should register a buyer successfully', () => {
    cy.intercept('POST', 'https://marketplace-backend-production-d4eb.up.railway.app/auth/register').as('registerRequest')

    fillRegistrationForm()

    cy.get('.space-y-4 > .bg-\\[\\#2B2D42\\]').click()

    cy.wait('@registerRequest').then((interception) => {
      expect(interception.response?.statusCode).to.equal(201)
    })

    cy.url().should('include', '/buyer/products')
  })

  it('should show validation errors for invalid inputs', () => {
    const testCases = [
      {
        scenario: 'short name',
        data: { fullName: 'Te' },
        expectedError: 'El nombre completo debe tener al menos 3 caracteres'
      },
      {
        scenario: 'invalid email',
        data: { email: 'invalid-email' },
        expectedError: 'El correo electrónico no es válido'
      },
      {
        scenario: 'short password',
        data: { password: 'Aa1!' },
        expectedError: 'La contraseña debe tener al menos 6 caracteres'
      },
      {
        scenario: 'weak password',
        data: { password: '123456' },
        expectedError: 'La contraseña es demasiado débil'
      },
      {
        scenario: 'short address',
        data: { address: 'Cal' },
        expectedError: 'La dirección debe tener al menos 5 caracteres'
      }
    ]

    testCases.forEach(({ scenario, data, expectedError }) => {
      it(`should validate ${scenario}`, () => {
        const formData = {
          fullName: 'Test Buyer',
          email: generateRandomEmail(),
          password: 'Password123!',
          address: 'Calle Test 123',
          ...data
        }
        
        fillRegistrationForm(formData)
        cy.get('.space-y-4 > .bg-\\[\\#2B2D42\\]').click()
        cy.get('.text-red-500').should('contain', expectedError)
      })
    })
  })

  it('should handle server errors gracefully', () => {
    cy.intercept('POST', 'https://marketplace-backend-production-d4eb.up.railway.app/auth/register', {
      statusCode: 500,
      body: {
        message: 'Error interno del servidor'
      }
    }).as('failedRequest')

    fillRegistrationForm()
    cy.get('.space-y-4 > .bg-\\[\\#2B2D42\\]').click()
    
    cy.get('.text-red-500').should('contain', 'Error al registrar el usuario')
  })

  it('should prevent duplicate email registration', () => {
    const testEmail = generateRandomEmail()
    
    cy.intercept('POST', 'https://marketplace-backend-production-d4eb.up.railway.app/auth/register', {
      statusCode: 400,
      body: {
        message: 'El correo electrónico ya está registrado'
      }
    }).as('duplicateEmailRequest')

    fillRegistrationForm({ email: testEmail })
    cy.get('.space-y-4 > .bg-\\[\\#2B2D42\\]').click()
    
    cy.get('.text-red-500').should('be.visible')
  })

  it('should have proper password confirmation validation', () => {
    fillRegistrationForm()
    cy.get(':nth-child(4) > .w-full').clear().type('DifferentPassword123!')
    cy.get('.space-y-4 > .bg-\\[\\#2B2D42\\]').click()
    
    cy.get('.text-red-500').should('contain', 'Las contraseñas no coinciden')
  })

  it('should have the correct background color for buyer registration', () => {
    cy.get('.min-h-screen').should('have.class', 'bg-[#2B2D42]')
  })

  it('should have accessible form labels', () => {
    cy.get('label').should('have.length', 5)
    cy.get('label').each(($label) => {
      cy.wrap($label).should('be.visible')
    })
  })
})