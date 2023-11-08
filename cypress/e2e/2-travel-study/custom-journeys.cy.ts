describe('Travel-Study Custom Journeys Request Page', () => {
  it('should load the custom journey request page at /travel-study/custom-journeys/request/', () => {
    // Login
    cy.login();

    // Visit the custom journeys form page URL
    cy.visit('/travel-study/custom-journeys/request/');

    // Confirm form exists
    cy.get('[id="su-embed"]').should('exist');
    cy.get('form').should('exist');

    // Confirm that the user's name is prefilled
    cy.get('[data-fieldid="DigitalName"]').should('contain.value', 'Teri Dactyl');
    
    // Confirm email is prefilled
    cy.get('[data-fieldid="ContactEmail"]').should('contain.value', 'tdactyl@test.com');
    // Confirm phone number is prefilled
    cy.get('[data-fieldid="PhoneNumber"]').should('contain.value', '4081111111');
    
    // Confirm that button exists
    cy.get('button').should('have.class', 'ggeButton--forward');
  });
    
});
