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

    // Select Filter Month and check for URL update
    cy.get('[data-test="filter-option--october"]').first().check({ force: true });
    cy.url().should('contain', 'trip-month=oct');

    // Load the filter from the URL
    cy.visit('/travel-study/destinations/?page=1&trip-month=oct');

    // Confirm chip exists
    cy.get('[data-test="chip:October"]').should('exist');

    // Confirm that a trip card exists
    cy.get('.trip-filter-page article h3').should('exist');

    // Clear Filters and check for URL update
    cy.get('[data-test="filter-btn--clear-all"]').first().click({force: true});
    cy.url().should('eq', Cypress.config().baseUrl + '/travel-study/destinations/');

    // Enable family focused filter
    cy.visit('/travel-study/destinations/?page=1&trip-experience=family-focused');

    // Confirm that the filter chip exists (and wait for filters to be applied)
    cy.get('[data-test="chip:Family-Focused"]').should('exist');
    // Confirm that Southeast Asia trip card exists
    cy.get('.trip-filter-page article').contains('Southeast Asia').should('exist');
  });
});
