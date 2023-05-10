import { mockData } from '../../src/services/megaprofile/mocks/mock-data/mock-data';

export const maxDataUser = mockData.constituents['1234567890'];
export const minDataUser = mockData.constituents['1000000000'];
export const nonStanfordUser = mockData.constituents['2000000000'];
export const nonStudentUser = mockData.constituents['3000000000'];
export const affiliatedRegistrant = mockData.affiliates.find((af) => af.lastName === 'email');
export const existingRegistrant = mockData.affiliates.find((af) => af.lastName === 'exists');
export const noEmailRegistrant = mockData.affiliates.find((af) => af.lastName === 'noemail');

export const medicineDegreeUser = mockData.constituents['1000000011'];
export const medicineCertUser = mockData.constituents['1000000012'];
export const gsbUser = mockData.constituents['1000000013'];
export const gsbAlumniUser = mockData.constituents['1000000014'];
export const saaAlumniUser = mockData.constituents['1000000015'];

export const zguanUser = mockData.constituents['67390094139'];
