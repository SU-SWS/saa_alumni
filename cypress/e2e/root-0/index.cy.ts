describe('Home Page', () => {
  describe('Login Users', () => {
    it('Visit home page', () => {
      cy.login();
      cy.visit('/');

      cy.getByTestId('user-menu-greeting', undefined, { timeout: 15000 }).should('contain', 'Teri Dactyl');
    });
  });
});
