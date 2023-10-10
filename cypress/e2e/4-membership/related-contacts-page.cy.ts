describe('Membership Related Contact Form Page', () => {
  it('should redirect users to /membership/join', () => {
    // Login
    cy.login();

    // Visit the membership form page URL
    cy.visit('/membership/join/related-contact');

    // Confirm that the URL matches the expected URL
    cy.url().should('include', '/membership/join');

    cy.get('h1').should('contain.text', 'Join now!');
  });
    
  it('should be able to navigate to related contacts page and select a contact', () => {
    // Login
    cy.login();

    // Visit the membership form page URL
    cy.visit('/membership/join');
    
    // Confirm that the myself membership card exists
    cy.getByTestId('card-myself').should('exist');

    // Find and click on membership card
    cy.getByTestId('card-someone-else').first().click();

    // Confirm that the card is selected
    cy.getByTestId('card-someone-else').first().should('have.class', 'su-border-digital-blue');

    // Confirm that continue button is enabled
    cy.get('[data-cy="continue-btn"]').first().click();

    // Confirm that the URL matches the expected URL
    cy.url().should('include', '/membership/join/related-contacts');
    cy.get('h1').should('contain.text', 'Welcome, Teri');
    
    // Find and click on Meg Alodon
    cy.getByTestId('card-meg-alodon').first().click();

    // Confirm that the card is selected
    cy.getByTestId('card-meg-alodon').first().should('have.class', 'su-border-digital-blue');

    // Confirm that continue button is enabled
    cy.get('[data-cy="next-btn"]').should('exist');
  });
});
