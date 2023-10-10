describe('Search Results', () => {
  it('should return travel study search results', () => {
    // Visit the initial URL that doesn't exist on Alumni Homesite
    cy.visit('/');

    cy.get('h1').should('contain.text', 'Stanford Alumni Association');
    cy.get('header').first().within(() => {
      cy.get('[data-test="search--nav-bar"]').first().click();
    })

    cy.get('[data-test="search--modal-input"]').should('exist').type('travel study');
    cy.get('[data-cy="search--submit-btn"]').first().click();

    cy.reload() // Needed for local Gatsby build
    cy.url().should('include', '/search/?q=travel%20study');

    cy.get('h1').should('contain.text', 'Search for...');
    cy.get('[data-test="search--modal-input"]').should('exist');
    cy.get('div[id="search-results"] h3').first().within(() => {
      cy.get('a > span').should('contain.text', 'Stanford Travel/Study');
    })

    // Confirm Alumni facet filter exists and check
    cy.get('input[value="Alumni"]').should('exist').check({ force: true });

    cy.reload() // Needed for local Gatsby build
    cy.url().should('include', '/search/?q=travel%20study&site=Alumni');

    cy.get('div#search-results').within(() => {
      cy.get('span').should('contain.text', '14');
    });
  });
});
