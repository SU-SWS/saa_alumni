describe('Perks - Online Databases Page', () => {
  it('should load the additional payment page at /perks/online-databases/', () => {
    // Login
    cy.login();

    // Visit the additional payment form page URL
    cy.visit('/perks/online-databases/');

    cy.get('h1').should('contain.text', 'Online Publication Databases');
    cy.get('main').within(() => {
      cy.get('h3').first().should('contain.text', 'I am sorry but your account is not allowed to see this content.');
    })

  });
});
