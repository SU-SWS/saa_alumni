import MockAdapter from 'axios-mock-adapter';
import { contactMockData, affiliationsMockData } from './mocks';

export default function mockServer(axiosInstance) {
  const mock = new MockAdapter(axiosInstance);

  mock.onGet(/\/[0-9]+\/profiles\/contact/).reply(200, contactMockData);

  mock
    .onGet(/\/[0-9]+\/profiles\/affiliations/)
    .reply(200, affiliationsMockData);

  return mock;
}
