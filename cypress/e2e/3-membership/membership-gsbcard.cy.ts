describe('Membership GSB Card Page', () => {
  it('should load the gsb membership card page at /membership/gsbcard', () => {
    // Login
    cy.login();

    // Visit the membership form page URL
    cy.visit('/membership/gsbcard');

    // Confirm that the URL matches the expected URL
    cy.url().should('include', '/membership/gsbcard');

    cy.get('h1').should('contain.text', 'Graduate School of Business');

    // Check if the gsb card image exists
    cy.get('img').should('exist'); 
    cy.get('span').should('contain.text', 'Teri');
    cy.get('span').should('contain.text', `MBA '03`);
  });
});
