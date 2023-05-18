// in cypress/support/index.ts
// load type definitions that come with Cypress module
/// <reference types="cypress" />
import { sessionMockData } from '../../src/utilities/mocks/session';

// Now we're a module
export {};

/**
 * Custom cypress commands.
 */

declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      assertRoute(route: string): Chainable<Window>;
      getByTestId(
        id: string,
        el?: string,
        options?: Partial<Cypress.Loggable & Cypress.Timeoutable & Cypress.Withinable & Cypress.Shadow>
      ): Chainable<any>;
      getByName(
        name: string,
        el?: string,
        options?: Partial<Cypress.Loggable & Cypress.Timeoutable & Cypress.Withinable & Cypress.Shadow>
      ): Chainable<any>;
      login(username?: string): void;
    }
  }
}

/**
 * Assert absolute route
 */
Cypress.Commands.add('assertRoute', (route: string) => {
  cy.wait(1500);
  cy.location('pathname').should('match', new RegExp(`^${route}/?()?$`));
});

/**
 * Get element by data-test attribute
 */
Cypress.Commands.add(
  'getByTestId',
  { prevSubject: 'optional' },
  (
    subject,
    id: string,
    el?: string,
    options?: Partial<Cypress.Loggable & Cypress.Timeoutable & Cypress.Withinable & Cypress.Shadow>
  ) => {
    if (subject) {
      return cy.wrap(subject).find(`${el || ''}[data-test=${id}]`, options);
    }

    return cy.get(`${el || ''}[data-test=${id}]`, options);
  }
);

/**
 * Get element by name attribute
 */
Cypress.Commands.add(
  'getByName',
  { prevSubject: 'optional' },
  (
    subject,
    name: string,
    el?: string,
    options?: Partial<Cypress.Loggable & Cypress.Timeoutable & Cypress.Withinable & Cypress.Shadow>
  ) => {
    if (subject) {
      return cy.wrap(subject).find(`${el || ''}[name=${name}]`, options);
    }

    return cy.get(`${el || ''}[name=${name}]`, options);
  }
);

/**
 * Login user
 * NOTE: We may want to alter how we mock auth for integration testing.
 * Consider altering our _middleware stack to prevent page redirects during integration testing.
 */
Cypress.Commands.add('login', (username: string = '') => {
  // const users = Object.values(mockData.constituents);
  // const defaultUser = users.find((u) => u.contact.name.username === maxDataUser.contact.name.username);
  // const foundUser = users.find((u) => u.contact.name.username === username);
  // const user = foundUser || defaultUser;

  const userToken = { ...sessionMockData };

  // Generate mock auth token
  cy.task('signToken', userToken).then((token) => {
    cy.log(`Logging in as: ${userToken.userName}`);
    console.log('Auth Token:', token);

    // Set mocked auth cookies to send with request
    cy.setCookie('adapt-auth-session', 'active');
    cy.setCookie('adapt-auth', token as string);
  });
});
