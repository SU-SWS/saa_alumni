describe('Search Overlay', () => {
  it('should display search overlay', () => {
    // Visit the initial URL that doesn't exist on Alumni Homesite
    cy.visit('/');

    cy.get('h1').should('contain.text', 'Stanford Alumni Association');
    cy.get('header').first().within(() => {
      cy.get('[data-test="search--nav-bar"]').first().click();
    })

    cy.get('[data-test="search--modal-input"]').should('exist');
  });
});
