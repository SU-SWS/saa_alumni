describe('Search No Results', () => {
  it('should return no search results when searching lorem ipsum', () => {
    cy.visit('/search/?q=lorem%20ipsum');
    cy.reload() // Needed for local Gatsby build

    cy.get('h1').should('contain.text', 'Search for...');
    cy.get('section > div form input[data-test="search--modal-input"]').should('contain.value','lorem ipsum');

    cy.get('h2').should('contain.text', 'We’re sorry, we couldn’t find results for “lorem ipsum”.')
    cy.get('h3').should('contain.text', 'Consider Browsing by Category:')
    cy.get('h4').should('contain.text', 'Popular Topics')
  });
});
