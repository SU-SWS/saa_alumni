describe('Membership SAA Card Page', () => {
  it('should display message to login to view card at /membership/saacard', () => {
    // Visit the membership form page URL
    cy.visit('/membership/saacard');

    cy.get('h1').should('contain.text', 'Your Stanford Alumni Association Membership');
    cy.get('h3').should('contain.text', 'Are you a Stanford Alumni Association member looking for your digital membership card?');

    // Check if the promo code field exists on the page
    cy.get('a').should('contain.text', 'Log in'); 
  });

  it('should load the saa membership card page at /membership/saacard', () => {
    // Login
    cy.login();

    // Visit the membership form page URL
    cy.visit('/membership/saacard');

    // Confirm that the URL matches the expected URL
    cy.url().should('include', '/membership/saacard');

    cy.get('h1').should('contain.text', 'Your Stanford Alumni Association Membership');

    // Check if the saa card image exists
    cy.get('img').should('exist'); 
    cy.get('span').should('contain.text', 'Teri'); 
  });
});
