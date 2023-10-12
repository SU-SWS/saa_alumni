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

    // Confirm that a trip card exists
    cy.get('article h3').should('exist');

    // Select Filter Month
    cy.get('[data-test="filter-option--october"]').first().check({ force: true });
    cy.reload(); // Needed for local Gatsby build

    // Confirm that a trip card exists
    cy.get('article h3').should('exist');

    // Clear Filters
    cy.get('[data-test="filter-btn--clear-all"]').first().click({force: true});
    cy.reload(); // Needed for local Gatsby build

    //  Select Filter Experience
    cy.get('[data-test="filter-option--family-focused"]').first().check({force: true});
    cy.reload(); // Needed for local Gatsby build

    // Confirm that Southeast Asia trip card exists
    cy.get('h3').should('contain.text', 'Southeast');

    // Clear Filters
    cy.get('[data-test="filter-btn--clear-all"]').first().click({force: true});
    cy.reload(); // Needed for local Gatsby build
  });
    
});
