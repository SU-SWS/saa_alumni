const timestamp = Date.now();
const expiration = Math.floor(timestamp / 1000) + 3600;

export const sessionMockData = {
  userName: 'tdactyl',
  email: 'tdactyl@alumni-test.stanford.edu',
  firstName: 'Teri',
  lastName: 'Dactyl',
  SUID: '00055212221',
  encodedSUID: '67355212221',
  exp: expiration,
};
