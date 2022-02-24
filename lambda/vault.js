const {
  fetchVaultSecrets,
} = require('netlify-plugin-vault-variables/src/runtime');

exports.handler = async function (event, context) {
  const secrets = await fetchVaultSecrets();

  return {
    statusCode: 200,
    body: JSON.stringify({
      ADAPT_AUTH_SAML_RETURN_PATH: process.env.ADAPT_AUTH_SAML_RETURN_PATH,
    }),
  };
};
