/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************
require('dotenv').config();
const { AdaptAuth } = require('adapt-auth-sdk');

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config

  // Cypress node tasks
  on('task', {
    // Sign jwt token for mocking auth session
    signToken: async (user) => {
      const auth = new AdaptAuth();
      const token = await auth.signToken(user);
      return token;
    },
  });
};
