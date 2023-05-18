import MockAdapter from 'axios-mock-adapter';
import { affiliationsMockData, fullprofileMockData } from './mocks';

export default function mockServer(axiosInstance) {
  const mock = new MockAdapter(axiosInstance);

  mock.onGet(/\/[0-9]+\/profiles\/fullprofile/).reply(200, fullprofileMockData);

  mock
    .onGet(/\/[0-9]+\/profiles\/affiliations/)
    .reply(200, affiliationsMockData);

  return mock;
}
