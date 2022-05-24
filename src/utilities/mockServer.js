import MockAdapter from 'axios-mock-adapter';
import { affiliationsMockData, fullggMockData } from './mocks';

export default function mockServer(axiosInstance) {
  const mock = new MockAdapter(axiosInstance);

  mock.onGet(/\/[0-9]+\/profiles\/fullgg/).reply(200, fullggMockData);

  mock
    .onGet(/\/[0-9]+\/profiles\/affiliations/)
    .reply(200, affiliationsMockData);

  return mock;
}
