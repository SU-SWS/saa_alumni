const activeEnv =
  process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || 'development';

console.log(`Using environment config: '${activeEnv}'`);

require('dotenv').config({
  path: `.env.${activeEnv}`,
});
const fs = require('fs');
const path = require('path');
const Vault = require('node-vault');

const vaultEnv = async () => {
  console.log('Fetching vault secrets and adding to env...');
  const vault = Vault({
    apiVersion: 'v1',
    endpoint: 'https://vault.stanford.edu',
  });
  // Overwrite existing values if present
  const overwrite = !!process.env.VAULT_OVERWRITE;

  const envFilePath = path.join(__dirname, '../../.env');

  // Fetch Vault Secrets
  try {
    await vault.approleLogin({
      role_id: process.env.VAULT_ROLE_ID,
      secret_id: process.env.VAULT_SECRET_ID,
    });
    const result = await vault.read('secret/data/projects/adapt/myaccount');
    const secrets = result.data.data;

    const secretsToWrite = [];
    Object.keys(secrets).forEach((secretKey) => {
      if (!process.env[secretKey] || overwrite) {
        secretsToWrite.push(
          `${secretKey}=${JSON.stringify(secrets[secretKey])}`
        );
      }
    });

    let existingSecrets = '';

    try {
      existingSecrets = fs.readFileSync(envFilePath).toString();
    } catch (err) {
      // Don't fail when no .env file already
    }
    const vaultSecretsString = secretsToWrite.join('\n');
    const allSecretsString = `${existingSecrets}\n${vaultSecretsString}`;
    fs.writeFileSync(envFilePath, allSecretsString);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  vaultEnv,
};

if (require.main === module) {
  vaultEnv();
}
