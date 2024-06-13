describe('Perks - Online Databases Page', () => {
  it('should load the online databases page at /benefits/online-publication-databases/', () => {
    // Login
    cy.login();

    // Visit the online databases form page URL
    cy.visit('/benefits/online-publication-databases/');

    cy.get('h1').should('contain.text', 'Online Publication Databases');
    
    // Allowed user
    cy.get('#topperk').within(() => {
      cy.get('h3').should('not.exist');
      cy.get('p').should('have.length', 4);
    });
  });
});
