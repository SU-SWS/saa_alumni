describe('Membership Type of Registrant Form Page', () => {
  it('should load the membership form page at /membership/join', () => {
    // Visit the membership form page URL
    cy.visit('/membership/join');

    // Confirm that the URL matches the expected URL
    cy.url().should('eq', '/membership/join');

    cy.get('h1').should('contain.text', 'Join now!');
    cy.getByTestId('su-promocode').should('exist'); // Check if a form element exists on the page
  });
  
  it('should click a membership card', () => {
    // Confirm that the myself membership card exists
    cy.getByTestId('card-myself').should('exist');

    // Find and click on membership card
    cy.getByTestId('card-someone-else').first().click();

    // Confirm that the card is selected (you can check for a visual change or an active state)
    cy.getByTestId('card-someone-else').first().should('have.class', 'su-border-digital-blue');

    // Confirm that continue button exists
    cy.get('[data-cy="continue-button"]').should('exist');
  });
});
