require('regenerator-runtime/runtime');

exports.handler = async function (event, context) {
  return {
    statusCode: 200,
    body: JSON.stringify({
      ADAPT_AUTH_SAML_RETURN_PATH: process.env.ADAPT_AUTH_SAML_RETURN_PATH,
    }),
  };
};
