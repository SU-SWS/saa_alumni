describe('Travel-Study Destinations Page', () => {
  it('should load at /travel-study/destinations/', () => {
    // Visit the destinations page URL
    cy.visit('/travel-study/destinations/');

    // Confirm that the URL matches the expected URL
    cy.url().should('include', '/travel-study/destinations');

    // Confirm form exists
    cy.get('h1').should('contain.text', 'Destinations');

    // Confirm that a trip card exists
    cy.get('.trip-filter-page article h3').should('exist');
  });
  it('should have working filters', () => {
    // Visit the destinations page URL
    cy.visit('/travel-study/destinations/');

    // Select Filter Month
    cy.get('[data-test="filter-option--october"]').first().check({ force: true });
    cy.reload(); // Needed for local Gatsby build

    // Confirm that a trip card exists
    cy.get('.trip-filter-page article h3').should('exist');

    // Clear Filters
    cy.get('[data-test="filter-btn--clear-all"]').first().click({force: true});
    cy.reload(); // Needed for local Gatsby build

    //  Select Filter Experience
    cy.get('[data-test="filter-option--family-focused"]').first().check({force: true});
    cy.reload(); // Needed for local Gatsby build

    // Confirm that Southeast Asia trip card exists
    cy.get('.trip-filter-page article').contains('Southeast Asia').should('exist');

    // Clear Filters
    cy.get('[data-test="filter-btn--clear-all"]').first().click({force: true});
    cy.reload(); // Needed for local Gatsby build
  });
    
});
