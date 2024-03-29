describe("Membership Type of Registrant Form Page", () => {
  it("should load the membership form page at /membership/join", () => {
    // Login
    cy.login();

    // Visit the membership form page URL
    cy.visit("/membership/join");

    cy.get("h1").should("contain.text", "Join now!");

    // Check if the promo code field exists on the page
    cy.getByTestId("su-promocode").should("exist");
  });

  it("should display membership data in myself card", () => {
    // Login
    cy.login();

    // Visit the membership form page URL
    cy.visit("/membership/join");

    // Confirm that the myself membership card exists
    cy.getByTestId("card-myself").should("exist");
    cy.getByTestId("card-myself").should("contain.text", '123456789');
  });

  it("should click someone else membership card and the continue button should be enabled", () => {
    // Login
    cy.login();

    // Visit the membership form page URL
    cy.visit("/membership/join");

    // Confirm that the myself membership card exists
    cy.getByTestId("card-myself").should("exist");

    // Find and click on membership card
    cy.getByTestId("card-someone-else").first().click();

    // Confirm that the card is selected (you can check for a visual change or an active state)
    cy.getByTestId("card-someone-else")
      .first()
      .should("have.class", "su-border-digital-blue");

    // Confirm that continue button is enabled
    cy.get('[data-cy="continue-btn"]').should("exist");
  });

  it("should select someone else, unselect someone else card and the continue button should be disabled", () => {
    // Login
    cy.login();

    // Visit the membership form page URL
    cy.visit("/membership/join");

    // Confirm that the myself membership card exists
    cy.getByTestId("card-myself").should("exist");

    // Confirm that the full payment card exists
    cy.getByTestId("card-pay-in-full").should("exist");

    // Find and click on someone else membership card
    cy.getByTestId("card-someone-else").first().click();

    // Confirm that continue button is enabled
    cy.get('[data-cy="continue-btn"]').should("exist");

    // Find and click on someone else membership card
    cy.getByTestId("card-someone-else").first().click();

    // Confirm that continue button is disabled
    cy.get('[data-cy="disabled-btn"]').should("exist");
  });
});
