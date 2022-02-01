// Please read the comments to learn more about the Netlify Build plugin syntax.
// Find more information in the Netlify documentation.
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');
const vaultReq = require('node-vault');
const util = require('util');

/**
 * Fetches and sets the variables from the Vault.
 */
const setVaultVars = async (inputs, build, status, netlifyConfig) => {
  // Vault client config options.
  const options = {
    apiVersion: 'v1',
    endpoint: inputs.endpoint,
  };

  // Need some environment variables to run.
  dotenv.config();

  // Initialize the vault client with the config options.
  const vault = vaultReq(options);

  // Overwrite existing secrets.
  const overwrite = process.env.VAULT_OVERWRITE || false;
  console.log(
    `Overwrite existing secrets was set to: ${overwrite.toString()}`
  );

  // Login credentials config object.
  const credentials = {
    secret_id: process.env[inputs.secretId],
    role_id: process.env[inputs.roleId],
  };

  try {
    await vault.approleLogin(credentials);
    console.log('Logged in to Vault Successfully');
  } catch (err) {
    build.failBuild('Failed to authenticate to vault', { err });
  }

  let secrets = {};

  console.log('Fetching vault secrets and adding to env...');
  await Promise.all(
    inputs.secrets.map(async (vaultPath) => {
      try {
        console.log(`Fetching secret from ${vaultPath}`);
        const secret = await vault.read(vaultPath);
        secrets = { ...secrets, ...secret.data.data };
        console.log(`Successfully fetched secret from ${vaultPath}`);
      } catch (err) {
        build.failBuild('Failed to fetch secret paths from vault', { err });
      }
    })
  );

  // Store the secrets to write to the .env file.
  const secretsToWrite = [];

  // Create an array of things to write to the env file.
  Object.keys(secrets).forEach((key) => {
    if (!process.env[key] || overwrite) {
      console.log(`Adding ${key} to env`);
      const val = JSON.stringify(secrets[key]);
      netlifyConfig.build.environment[key] = val;
      secretsToWrite.push(`${key}=${val}`);
    }
  });

  let existingSecrets = '';
  const envFilePath = path.resolve(process.cwd(), '.env');
  console.log(`Environment file path: ${envFilePath}`);

  // Read existing env file.
  try {
    existingSecrets = fs.readFileSync(envFilePath).toString();
  } catch (err) {
    // Don't fail when no .env file already
  }

  // Write new env file.
  const vaultSecretsString = secretsToWrite.join('\n');
  const allSecretsString = `${existingSecrets}\n${vaultSecretsString}`;
  fs.writeFileSync(envFilePath, allSecretsString);

  // Put the new vars back into the env.
  dotenv.config();

  // Display success information
  status.show({
    summary: `Added environment variables from vault to .env`,
  });
}

/**
 * Overrides an ENV var with a value if it exists
 * @param {*} key the key to overwrite if found
 * @param {*} contextOrBranch the value to check
 * @param {*} mode the mode to use (prefix or suffix)
 */
 function setEnvWithValue(key, contextOrBranch, mode, netlifyConfig) {
  const envVar = mode === 'prefix' ? `${contextOrBranch}_${key}` : `${key}_${contextOrBranch}`;

  if (!process.env[envVar]) {
    return;
  }

  console.log('Replacing ' + key + ' with ' + envVar);
  netlifyConfig.build.environment[key] = process.env[envVar];

  return `${key}=${process.env[envVar]}\n`;
}

/**
 * Set the environment variables to their contextual values.
 *
 * @param {*} inputs
 */
const contextualizeVars = (inputs, status, netlifyConfig) => {
  const context = `${process.env.CONTEXT}`.toUpperCase().replace(/-/g, '_');
  const branch = `${process.env.BRANCH}`.toUpperCase().replace(/-/g, '_');
  const { mode } = inputs;

  const envOverrides = Object.keys(process.env).map((key) => [
    setEnvWithValue(key, context, mode, netlifyConfig),
    setEnvWithValue(key, branch, mode, netlifyConfig),
  ]);

  const replaced = [].concat(...envOverrides).filter(Boolean);

  if (replaced.length) {
    status.show({
      summary: `Replaced ${replaced.length} ENVs`,
    });
  } else {
    status.show({
      summary: `Nothing found... keeping default ENVs`,
    });
  }
}

/* eslint-disable no-unused-vars */
module.exports = {
  async onPreBuild({
    inputs,
    // Core utilities
    utils: { build, status },
    netlifyConfig
  }) {

    // First set the variables from vault.
    setVaultVars(inputs, build, status, netlifyConfig);

    // Then contextualize them.
    contextualizeVars(inputs, status, netlifyConfig);
  },
};
