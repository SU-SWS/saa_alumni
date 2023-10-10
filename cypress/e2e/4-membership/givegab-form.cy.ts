describe('Membership GiveGab Form Page', () => {
  it('should redirect users to /membership/join', () => {
    // Login
    cy.login();

    // Visit the membership form page URL
    cy.visit('/membership/join/form');

    // Confirm that the URL matches the expected URL
    cy.reload(); // Needed for local Gatsby build
    cy.url().should('include', '/membership/join');

    cy.get('h1').should('contain.text', 'Join now!');
  });
    
  it('should be able to navigate to the Pay in Full form page', () => {
    // Login
    cy.login();

    // Visit the membership form page URL
    cy.visit('/membership/join');
    
    // Confirm that the myself membership card exists
    cy.getByTestId('card-myself').should('exist');

    // Confirm that the card is selected
    cy.getByTestId('card-myself').first().should('have.class', 'su-border-digital-blue');
    cy.getByTestId('card-pay-in-full').first().should('have.class', 'su-border-digital-blue');

    // Confirm that continue button is enabled
    cy.get('[data-cy="continue-btn"]').first().click();

    // Confirm that the URL matches the expected URL
    cy.url().should('include', '/membership/join/form');
    cy.get('h1').first().should('contain.text', 'Stanford Alumni Association');
    
    // Confirm that form exists
    cy.get('[id="su-embed"]').should('exist');
    cy.get('form').should('exist');

    // Confirm that the Registration section exists
    cy.get('[data-fieldid="RegistrationType"]').should('exist');

    // Confirm that the user's name is prefilled
    cy.get('[data-fieldid="DigitalName"]').should('contain.value', 'Teri Dactyl');
    
    // Confirm that button exists
    cy.get('button').should('have.class', 'ggeButton--forward');
  });
});
