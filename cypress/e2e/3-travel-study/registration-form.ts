describe('Membership Registration Form Page', () => {
  it('should load the interstitial form page at /travel-study/destinations/finland-2022/finland-reg-form/', () => {
    // Login
    cy.login();

    // Visit the membership form page URL
    cy.visit('/travel-study/destinations/finland-2022/finland-reg-form/');

    // Confirm that the URL matches the expected URL
    cy.url().should('include', '/travel-study/destinations/finland-2022/finland-reg-form/');

    cy.get('h3').first().should('contain.text', 'Before you register');
  })

  it('should be able to navigate to givegab form', () => {
    // Login
    cy.login();

    // Visit the membership form page URL
    cy.visit('/travel-study/destinations/finland-2022/finland-reg-form/');

    // Confirm that the URL matches the expected URL
    cy.url().should('include', '/travel-study/destinations/finland-2022/finland-reg-form/');

    cy.get('h3').first().should('contain.text', 'Before you register');

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
    cy.get('[next-btn]').should('exist').click();

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
    cy.get('[data-fieldid="Pre-TripExtension__0"]').click();
    cy.get('[data-fieldid="Post-TripExtension__0"]').click();

    // Confirm that button exists
    cy.get('button').should('have.class', 'ggeButton--forward').click();

    // Confirm that the user contact's name is prefilled
    cy.get('[data-fieldid="DigitalName"]').should('contain.value', 'Allie Grater');
    
    // Fill email input
    cy.get('[data-fieldid="ContactEmail"]').type('tdactyl@test.com');
    cy.get('data-fieldid="EmailType__0"').click();

    // Fill phone number
    cy.get('[data-fieldid="PhoneNumber"]').type('1234567890');
  
    // Fill required questions
    cy.get('[data-fieldid="Pre-TripExtension__0"]').click();
    cy.get('[data-fieldid="Post-TripExtension__0"]').click();

    // Confirm that button exists
    cy.get('button').should('have.class', 'ggeButton--forward').click();

    // Confirm that tally table exists
    cy.get('table').should('have.class', 'ggeTallyTable');

  });

  it('should redirect to the interstitial form page at /travel-study/destinations/finland-2022/finland-reg-form', () => {
    // Login
    cy.login();

    // Visit the membership form page URL
    cy.visit('/travel-study/destinations/finland-2022/finland-reg-form/form');
  
    // Confirm that the URL redirect to the expected URL
    cy.url().should('include', '/travel-study/destinations/finland-2022/finland-reg-form/');
    cy.visit('/travel-study/destinations/finland-2022/finland-reg-form/'); // Needed for local Gatsby build

    cy.get('h3').first().should('contain.text', 'Before you register');
  });
});
