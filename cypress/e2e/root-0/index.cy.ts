describe('Home Page', () => {
  describe('Login Users', () => {
    it('Visit home page', () => {
      cy.login();
      cy.visit('/');

      cy.getByTestId('user-menu-greeting', null, { timeout: 15000 }).should('contain', 'John Doe');
    });
  });
});
