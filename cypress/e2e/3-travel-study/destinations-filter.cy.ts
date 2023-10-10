describe('Travel-Study Destinations Page', () => {
  it('should load the destinations page at /travel-study/destinations/', () => {
    // Login
    cy.login();

    // Visit the destinations page URL
    cy.visit('/travel-study/destinations/');

    // Confirm that the URL matches the expected URL
    cy.url().should('include', '/travel-study/destinations');

    // Confirm form exists
    cy.get('h1').should('contain.text', 'Destinations');

    // Confirm that Iran card exists
    cy.get('h3').should('contain.text', 'Iran');

  });
    
});
