describe('Travel-Study Additional Payment Page', () => {
  it('should load the additional payment page at /travel-study/payment', () => {
    // Login
    cy.login();

    // Visit the membership form page URL
    cy.visit('/travel-study/payment');

    // Confirm that the URL matches the expected URL
    cy.url().should('include', '/travel-study/payment');

    // Confirm form exists
    cy.get('[id="su-embed"]').should('exist');
    cy.get('form').should('exist');

    // Confirm that the user's name is prefilled
    cy.get('[data-fieldid="DigitalName"]').should('contain.value', 'Teri Dactyl');
    
    // Confirm email is prefilled
    cy.get('[data-fieldid="ContactEmail"]').should('contain.value', 'tdactyl@test.com');
    
    // Confirm that button exists
    cy.get('button').should('have.class', 'ggeButton--forward');
  });
    
});
