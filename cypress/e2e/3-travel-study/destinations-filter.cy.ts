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

    // Confirm that Iran trip card exists
    cy.get('h3').should('contain.text', 'Iran');

    // Select Filter Month
    cy.get('[data-test="filter-option--october"]').check();

    // Confirm that Canada trip card exists
    cy.get('h3').should('contain.text', 'Canada');

    // Clear Filters
    cy.get('[data-test="filter-btn--clear-all"]').click();

    //  Select Filter Experience
    cy.get('[data-test="filter-option--family-focused"]').check();

    // Confirm that Southeast Asia trip card exists
    cy.get('h3').should('contain.text', 'Southeast');

    // Clear Filters
    cy.get('[data-test="filter-btn--clear-all"]').click();
  });
    
});
