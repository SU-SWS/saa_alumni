const timestamp = Date.now();
const expiration = Math.floor(timestamp / 1000) + 3600;

export const sessionMockData = {
  userName: 'jdoe',
  email: 'john.doe@stanford.edu',
  firstName: 'John',
  lastName: 'Doe',
  SUID: '2003829304234',
  exp: expiration,
};
