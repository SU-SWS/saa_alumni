describe('Travel-Study Trip Registration Form Page', () => {
  it('should load the interstitial form page at /travel-study/destinations/finland-2022/finland-reg-form/', () => {
    // Login
    cy.login();

    // Visit the registration form page URL
    cy.visit('/travel-study/destinations/finland-2022/finland-reg-form/');

    // Confirm that the URL matches the expected URL
    cy.url().should('include', '/travel-study/destinations/finland-2022/finland-reg-form/');

    cy.get('main').within(() => {
      cy.get('h3').first().should('contain.text', 'Before you register');
    })
  })

  it('should be able to navigate to givegab form and validate that prefill data exists', () => {
    // Login
    cy.login();

    // Visit the membership form page URL
    cy.visit('/travel-study/destinations/finland-2022/finland-reg-form/');

    // Confirm that the URL matches the expected URL
    cy.url().should('include', '/travel-study/destinations/finland-2022/finland-reg-form/');

    // Primary card should exist
    cy.get('[data-test="card-teri-dactyl"]').should('exist');

    // Related contact card should exist
    cy.get('[data-test="card-allie-grater"]').should('exist');

    // Select related contact
    cy.get('[data-test="card-allie-grater"]').click();

    // Confirm that related contact has been selected
    cy.get('[data-test="card-allie-grater"]').within(() => {
      cy.get('p').should('contain.text', 'Added!');
    });

    cy.get('[data-test="list-allie-grater"]').should('exist')

    // Check if next button exists and click to continue to GG form
    cy.get('[data-cy=next-btn]').should('exist').click();

    // Confirm that the URL matches the expected URL
    cy.url().should('include', '/travel-study/destinations/finland-2022/finland-reg-form/form');

    // Confirm form exists
    cy.get('[id="su-embed"]').should('exist');
    cy.get('form').should('exist');
    
    // Confirm that the user's name is prefilled
    cy.get('[data-fieldid="DigitalName"]').should('contain.value', 'Teri Dactyl');
    
    // Confirm email is prefilled
    cy.get('[data-fieldid="ContactEmail"]').should('contain.value', 'tdactyl@test.com');

    // Confirm phone number is prefilled
    cy.get('[data-fieldid="PhoneNumber"]').should('contain.value', '4081111111');
  
    // Fill required questions
    cy.get('[data-fieldid="Pre-TripExtension__0"]').check({force: true});
    cy.get('[data-fieldid="Post-TripExtension__0"]').check({force: true});

    // Confirm that button exists
    cy.get('button').should('have.class', 'ggeButton--forward');
  });

  it('should redirect to the interstitial form page at /travel-study/destinations/finland-2022/finland-reg-form', () => {
    // Login
    cy.login();

    // Visit the membership form page URL
    cy.visit('/travel-study/destinations/finland-2022/finland-reg-form/form');
  
    // Confirm that the URL redirect to the expected URL
    cy.url().should('include', '/travel-study/destinations/finland-2022/finland-reg-form');
    cy.visit('/travel-study/destinations/finland-2022/finland-reg-form/'); // Needed for local Gatsby build

    cy.get('main').within(() => {
      cy.get('h3').first().should('contain.text', 'Before you register');
    })
  });
});
