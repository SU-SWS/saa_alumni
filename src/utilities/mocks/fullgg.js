import { affiliationsMockData } from './affiliations';

export const fullggMockData = {
  encodedSUID: '12345678910',
  birthDate: '1979-08-14',
  name: {
    digitalName: 'Teri Dactyl',
    preferredPronouns: null,
    myFriendsCallMe: 'Teri',
    envelopeName: 'Mr. Teri Dactyl',
    fullNameParsed: {
      prefix: 'Mr.',
      firstName: 'Teri',
      middleName: null,
      lastName: 'Dactyl',
      suffixPersonal: null,
      suffixProfessional: null,
    },
    registrationNameString: 'Mr. Teri Dactyl',
    registrationNameParsed: {
      registrationNamePrefix: 'Mr.',
      registrationNameFirst: 'Teri',
      registrationNameMiddle: null,
      registrationNameLast: 'Dactyl',
      registrationNameSuffixPersonal: null,
      registrationNameSuffixProfessional: null,
    },
  },
  emails: [
    {
      communicationMethodID: 'a0h46000001ezKdAAI',
      emailAddress: 'teridactyl@jurrasicpark.com',
      emailType: 'Home Email',
      preferredEmailType: 'SAA Email',
      emailStatus: 'Active',
    },
    {
      communicationMethodID: 'a0h46000001ezKYAAY',
      emailAddress: 't@dactyl.com',
      emailType: 'Other Email',
      preferredEmailType: 'SAA Email',
      emailStatus: 'Active',
    },
    {
      communicationMethodID: 'a0h46000001ezKXAAY',
      emailAddress: 't@dactyl.com',
      emailType: 'Business Email',
      preferredEmailType: 'SAA Email',
      emailStatus: 'Active',
    },
    {
      communicationMethodID: 'a0h46000001ezKaAAI',
      emailAddress: 'tdactyl@alumni.stanfordgsb.org',
      emailType: 'SAA Email',
      preferredEmailType: 'SAA Email',
      emailStatus: 'Active',
    },
  ],
  addresses: [
    {
      addressID: 'a0046000005uG9IAAU',
      addressVerified: 'false',
      addressType: 'Home',
      preferredAddressType: 'Home',
      addressStartDay: '07',
      addressStartMonth: '01',
      addressStartYear: '2021',
      addressEndDay: null,
      addressEndMonth: null,
      addressEndYear: null,
      addressLastUpdatedDate: '2021-09-26T00:45:21.000',
      ADIVGeoCode: '91600',
      addressString: null,
      addressParsed: {
        addressCountry: 'Malaysia',
        careOfLine: null,
        streetAddress1: 'Unit 5A, Block A3, Astana Damansara',
        streetAddress2: '33, Jalan17/1',
        streetAddress3: null,
        city: 'Petaling Jaya',
        stateProvince: 'Selangor',
        zipPostalCode: '46400',
      },
    },
    {
      addressID: 'a00460000043iKGAAY',
      addressVerified: 'false',
      addressType: 'Business',
      preferredAddressType: 'Home',
      addressStartDay: '01',
      addressStartMonth: '09',
      addressStartYear: '2014',
      addressEndDay: null,
      addressEndMonth: null,
      addressEndYear: null,
      addressLastUpdatedDate: '2021-09-26T00:45:40.000',
      ADIVGeoCode: '91600',
      addressString: null,
      addressParsed: {
        addressCountry: 'China',
        careOfLine: null,
        streetAddress1: 'A103, Qing Mai Shi Dai',
        streetAddress2: 'No. 10 Jiu Xian Qiao Dong Lu',
        streetAddress3: 'Chaoyang District',
        city: 'Beijing',
        stateProvince: null,
        zipPostalCode: '100015',
      },
    },
  ],
  relationships: [
    {
      relationshipID: '0034600000xKKeNAAW-0034600000xKKeMAAW-Spouse/Partner',
      category: 'Family',
      relationshipType: 'Spouse/Partner',
      relatedContact: '0034600000xKKeMAAW',
      relatedContactEncodedID: '10987654321',
      relatedContactGender: 'Female',
      relatedContactDigitalName: 'Allie Grater',
      relatedContactMyFriendsCallMe: 'Allie',
      relatedContactBirthDate: '1981-01-02',
      relatedContactFullNameParsed: {
        relatedContactPrefix: 'Ms.',
        relatedContactFirstName: 'Allie',
        relatedContactMiddleName: null,
        relatedContactLastName: 'Grater',
        relatedContactPersonalSuffix: null,
        relatedContactProfessionalSuffix: null,
      },
    },
    {
      relationshipID: '0034700000xKKeNAAW-0034700000xKKeMAAW-Child',
      category: 'Family',
      relationshipType: 'Child',
      relatedContact: '0034600000xKKeMAAW',
      relatedContactEncodedID: '10987654324',
      relatedContactGender: 'Female',
      relatedContactDigitalName: 'Jessie Grater',
      relatedContactMyFriendsCallMe: 'Jessie',
      relatedContactBirthDate: '1998-05-22',
      relatedContactFullNameParsed: {
        relatedContactPrefix: 'Miss',
        relatedContactFirstName: 'Jessie',
        relatedContactMiddleName: null,
        relatedContactLastName: 'Grater',
        relatedContactPersonalSuffix: null,
        relatedContactProfessionalSuffix: null,
      },
    },
  ],
  phoneNumbers: [
    {
      communicationMethodId: 'a0h46000001d5iMAAQ',
      phoneNumberType: 'Home Phone',
      phoneNumber: '1-408-555-1212',
      preferredPhoneNumberType: null,
      internationalPhoneNumber: 'true',
    },
    {
      communicationMethodId: 'a0h46000001d5iNAAQ',
      phoneNumberType: 'Mobile',
      phoneNumber: '1-555-555-1212',
      preferredPhoneNumberType: null,
      internationalPhoneNumber: 'true',
    },
  ],
  privacy: {
    digitalName: 'Show',
    preferredPronouns: 'Hide',
    registrationNameString: 'Show',
    emails: [
      {
        emailAddress: 'Hide',
        emailType: 'Home Email',
      },
      {
        emailAddress: 'Show',
        emailType: 'Business Email',
      },
      {
        emailAddress: 'Show',
        emailType: 'GSB Email',
      },
      {
        emailAddress: 'Show',
        emailType: 'SAA Email',
      },
      {
        emailAddress: 'Show',
        emailType: 'Other Email',
      },
    ],
    homeAddressString: 'Hide',
    businessAddressString: 'Show',
    relationships: [
      {
        relationshipCategory: 'Family',
        Category: 'Hide',
        relationshipType: 'Hide',
        relatedContactGender: 'Hide',
        relatedContactDigitalName: 'Hide',
      },
      {
        relationshipCategory: 'Other',
        Category: 'Internal',
        relationshipType: 'Internal',
        relatedContactGender: 'Internal',
        relatedContactDigitalName: 'Internal',
      },
    ],
    locationAddress: 'Show',
    myFriendsCallMe: 'Hide',
    envelopeName: 'Hide',
    prefix: 'Hide',
    firstName: 'Hide',
    middleName: 'Hide',
    lastName: 'Hide',
    suffixPersonal: 'Hide',
    suffixProfessional: 'Hide',
    emailType: 'Hide',
    preferredEmailType: 'Hide',
    preferredPhoneType: 'Hide',
    preferredAddressType: 'Hide',
    addressStartDate: 'Hide',
    addressEndDate: 'Hide',
    addressCountry: 'Hide',
    careOfLine: 'Hide',
    streetAddress1: 'Hide',
    streetAddress2: 'Hide',
    streetAddress3: 'Hide',
    addressCity: 'Hide',
    stateProvince: 'Hide',
    zipPostalCode: 'Hide',
    startingMonth: 'Hide',
    startingDay: 'Hide',
    stoppingMonth: 'Hide',
    stoppingDay: 'Hide',
    encodedSuid: 'Internal',
    gender: 'Internal',
    registrationNamePrefix: 'Internal',
    registrationNameFirst: 'Internal',
    registrationNameMiddle: 'Internal',
    registrationNameLast: 'Internal',
    registrationNameSuffixPersonal: 'Internal',
    registrationNameSuffixProfessional: 'Internal',
    salesforceConstituentType: 'Internal',
    primary: 'Internal',
    emailCommunicationMethodId: 'Internal',
    emailStatus: 'Internal',
    addressId: 'Internal',
    addressVerified: 'Internal',
    adivGeoCode: 'Internal',
    addressStatus: 'Internal',
    relationshipId: 'Internal',
    relatedContact: 'Internal',
    relatedContactEncodedId: 'Internal',
    relatedContactMyFriendsCallMe: 'Internal',
    relatedContactBirthDate: 'Internal',
    relatedContactPrefix: 'Internal',
    relatedContactFirstName: 'Internal',
    relatedContactMiddleName: 'Internal',
    relatedContactLastName: 'Internal',
    relatedContactPersonalSuffix: 'Internal',
    relatedContactProfessionalSuffix: 'Internal',
    addressType: 'Show',
    constituentStatus: 'Show',
    deceasedDate: 'Show',
  },
  original: {
    version: 'v1',
    encodedSUID: '12345678910',
    access_method: 'GET',
  },
  // TODO: Resolve affiliations differences in ADAPTSM-171
  // affiliations: affiliationsMockData,
  // affiliations: [],
  affiliations: [
    'GSB Alum',
    'GSB SEP',
    'Non-Student',
    'GSB Defined Alums and Students',
    'SAA Member',
    // 'Friend,
  ],
  memberships: [
    // Test Data for SAA Alum
    // {
    //   membershipStatus: 'Active',
    //   membershipNumber: '0001223551',
    //   membershipType: 'Life',
    //   membershipAffiliation: 'Alum',
    //   membershipStartDate: '2011',
    //   membershipGroup: 'SAA',
    // },
    //  Test Data for SAA Affiliate
    // {
    //   membershipStatus: 'Active',
    //   membershipNumber: '0001223552',
    //   membershipType: 'Life',
    //   membershipAffiliation: 'Affiliate',
    //   membershipStartDate: '2011',
    //   membershipGroup: 'SAA',
    // },
    // Test Data for GSB Membership
    // {
    //   membershipStatus: 'Active',
    //   membershipNumber: '0001223551',
    //   membershipType: 'Life',
    //   membershipAffiliation: 'Alum',
    //   membershipStartDate: '2011',
    //   membershipGroup: 'GSB',
    // },
  ],
  profilePhotoURL: 'https://placekitten.com/300/300',
};
