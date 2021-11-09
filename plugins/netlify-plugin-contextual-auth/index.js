const fs = require('fs');

module.exports = {
  async onPostBuild({ inputs, utils: { build, status } }) {
    const contextMatch = inputs.context === process.env.CONTEXT;
    const branchMatch = inputs.branch
      ? inputs.branch === process.env.BRANCH
      : true;

    // Correct build context?
    if (contextMatch && branchMatch) {
      try {
        // Add basic auth headers
        const auth = `Basic ${Buffer.from(
          `${inputs.username}:${inputs.password}`
        ).toString('base64')}`;
        fs.appendFileSync(
          inputs.file,
          `\n${inputs.path}\n  Authorization: ${auth}`
        );
      } catch (error) {
        // Report a user error
        build.failBuild('Error message', { error });
      }

      // Display success information
      status.show({
        summary: `Added basic auth "${inputs.username}:${inputs.password} for path "${inputs.path}""`,
      });
    }
  },
};
