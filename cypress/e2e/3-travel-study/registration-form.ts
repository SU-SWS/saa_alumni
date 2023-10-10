describe('Membership Registration Form Page', () => {
  it('should load the interstitial form page at /travel-study/destinations/finland-2022/finland-reg-form/', () => {
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

    // Check if the promo code field exists on the page
    cy.get('[next-btn]').should('exist').click();
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
