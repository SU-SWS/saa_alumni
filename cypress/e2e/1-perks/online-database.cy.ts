describe('Perks - Online Databases Page', () => {
  it('should load the additional payment page at /perks/online-databases/', () => {
    // Login
    cy.login();

    // Visit the online publication databases page
    cy.visit('/benefits/online-publication-databases/');

    cy.get('h1').should('contain.text', 'Online Publication Databases');
    cy.get('main').within(() => {
      cy.get('h3').first().next().should('contain.text', 'We’re sorry, but this benefit is not available for your account.');
    })

  });
});
