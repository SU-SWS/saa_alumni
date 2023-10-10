describe('Search No Results', () => {
  it('should travel study search results', () => {
    // Visit the initial URL that doesn't exist on Alumni Homesite
    cy.visit('/');

    cy.get('h1').should('contain.text', 'Stanford Alumni Association');
    cy.get('header').first().within(() => {
      cy.get('[data-test="search--nav-bar"]').first().click();
    })

    cy.get('[data-test="search--modal-input"]').should('exist').type('lorem ipsum');
    cy.get('[data-cy="search--submit-btn"]').first().click();

    cy.reload() // Needed for local Gatsby build
    cy.url().should('include', '/search/?q=lorem%20ipsum');

    cy.get('h1').should('contain.text', 'Search for...');
    cy.get('section > div form input[data-test="search--modal-input"]').should('contain.value','lorem ipsum');

    cy.get('h2').should('contain.text', 'We’re sorry, we couldn’t find results for “lorem ipsum”.')
    cy.get('h3').should('contain.text', 'Consider Browsing by Category:')
    cy.get('h4').should('contain.text', 'Popular Topics')
  });
});
