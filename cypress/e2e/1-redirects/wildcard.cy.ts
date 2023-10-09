describe('WildCard 404 Redirect', () => {
  it('should redirect to a 404 page on a different domain', () => {
    // Visit the initial URL that doesn't exist on Alumni Homesite
    cy.visit('/membership/form');

    // Check to confirm page has redirected to Cardinal Alumni 404 page
    cy.url().should('eq', 'https://cardinalalumni.stanford.edu/get/page/system/pagenotfound?page=/membership/form');

    // Confirm that page is indeed a 404
    cy.get('h1').should('contain.text', '404 Page Not Found');
    cy.get('p').should('contain.text', 'The requested page (/membership/form) does not exist on this server.');
  });
});
