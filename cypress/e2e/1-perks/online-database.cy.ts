describe('Perks - Online Databases Page', () => {
  it('should load the additional payment page at /benefits/online-publication-databases/', () => {
    // Login
    cy.login();

    // Visit the additional payment form page URL
    cy.visit('/benefits/online-publication-databases/');

    cy.get('h1').should('contain.text', 'Online Publication Databases');
    cy.get('main').within(() => {
      cy.get('p:contains("We’re sorry, but this benefit is not available for your account.")').should('exist');
    });
  });
});
