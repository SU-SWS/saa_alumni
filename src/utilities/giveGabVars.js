const lookup = require('country-code-lookup');

/**
 * Find the user's preferred phone number.
 *
 * @param {array} phoneNumbers
 *   An array of objects containing phone numbers.
 *
 * @returns {string|boolean}
 *   The phone number when found or false
 */
const findPreferredPhoneNumber = (phoneNumbers) => {
  let ret = false;

  // Check the first phone number for the preferred type. Abort if anything is missing.
  if (
    !Array.isArray(phoneNumbers) ||
    !phoneNumbers[0]?.preferredPhoneNumberType
  ) {
    return ret;
  }

  // The preferred phone number is nested as a key in each of the options and we have
  // to loop through each of the phoneNumbers looking for it.
  const pref = phoneNumbers[0].preferredPhoneNumberType;
  phoneNumbers.forEach((val, ind, arr) => {
    if (val?.phoneNumberType === pref) {
      ret = val.phoneNumber;
    }
  });

  return ret;
};

/**
 * Find the user's phone number.
 *
 * @param {array} phoneNumbers
 *   An array of objects containing phone numbers.
 *
 * @returns {string|boolean}
 *   The phone number when found or false
 */
const findPhoneNumberType = (phoneNumbers, type) => {
  let ret = false;
  const BreakException = {};
  try {
    phoneNumbers.forEach((val, ind, arr) => {
      if (val.phoneNumberType === type) {
        ret = val.phoneNumber;
        throw BreakException;
      }
    });
  } catch (e) {
    if (e !== BreakException) throw e;
  }

  return ret;
};

/**
 * Find the preferred phone number type
 *
 * @param {array} phoneNumbers
 *   An array of objects containing phone number information.
 *
 * @returns {string}
 *   The preferred phone number type
 */
export const findPhoneNumber = (phoneNumbers) => {
  let phoneNumber;
  if (Array.isArray(phoneNumbers)) {
    phoneNumber = findPreferredPhoneNumber(phoneNumbers);
    if (!phoneNumber) {
      phoneNumber = findPhoneNumberType(phoneNumbers, 'Home Phone');
    }
    if (!phoneNumber) {
      phoneNumber = findPhoneNumberType(phoneNumbers, 'Mobile');
    }
    if (!phoneNumber) {
      phoneNumber = findPhoneNumberType(phoneNumbers, 'Business Phone');
    }
  }
  return phoneNumber;
};

/**
 * Find the user's preferred phone number.
 *
 * @param {array} phoneNumbers
 *   An array of objects containing phone numbers.
 * @param {string} prefPhoneNumber
 *   Preferred phone number.
 *
 * @returns {string|boolean}
 *   The pref phone number type
 */
export const findPreferredPhoneNumberType = (
  phoneNumbers = [],
  prefPhoneNumber
) => {
  let pref = 'Home Phone';

  if (phoneNumbers[0]?.preferredPhoneNumberType === null) {
    return pref;
  }

  phoneNumbers.forEach((val, ind, arr) => {
    if (val?.phoneNumber === prefPhoneNumber) {
      pref = val.phoneNumberType;
    }
  });

  return pref;
};

/**
 * Find the user's preferred email.
 *
 * @param {array} emails
 *   An array of objects containing email information.
 *
 * @returns {string|boolean}
 *   The email when found or false
 */
const findPreferredEmail = (emails) => {
  let ret = false;

  // Check the first email for the preferred type. Abort if anything is missing.
  if (!Array.isArray(emails) || !emails[0]?.preferredEmailType) {
    return ret;
  }

  // The preferred email is nested as a key in each of the options and we have
  // to loop through each of the emails looking for it.
  const pref = emails[0].preferredEmailType;
  emails.forEach((val, ind, arr) => {
    if (val?.emailType === pref && val?.emailStatus === 'Active') {
      ret = val.emailAddress;
    }
  });

  return ret;
};

/**
 * Find the email address information.
 *
 * @param {array} emails
 *   An array of objects containing email information.
 *
 * @param {string} type
 *   The keyword string to look for.
 *
 * @returns {string|boolean}
 *   The email string when found or false
 */
const findEmailType = (emails, type) => {
  let ret = false;
  const BreakException = {};
  try {
    emails.forEach((val, ind, arr) => {
      if (val.emailType === type && val.emailStatus === 'Active') {
        ret = val.emailAddress;
        throw BreakException;
      }
    });
  } catch (e) {
    if (e !== BreakException) throw e;
  }

  return ret;
};

/**
 * Find the preferred email type
 *
 * @param {array} emails
 *   An array of objects containing email information.
 *
 * @returns {string}
 *   The preferred email type
 */
export const findEmail = (emails) => {
  let email;
  if (Array.isArray(emails)) {
    email = findPreferredEmail(emails);
    if (!email) {
      email = findEmailType(emails, 'Home Email');
    }
    if (!email) {
      email = findEmailType(emails, 'Business Email');
    }
    if (!email) {
      email = findEmailType(emails, 'Other Email');
    }
  }
  return email;
};

/**
 * Find the user's preferred email type.
 *
 * @param {array} emails
 *   An array of objects containing email type.
 * @param {string} prefEmail
 *   Preferred email type.
 *
 * @returns {string|boolean}
 *   The pref email type
 */
export const findPreferredEmailType = (emails = [], prefEmail) => {
  let pref = 'Home Email';

  if (emails[0]?.preferredEmailType === null) {
    return pref;
  }

  emails.forEach((val, ind, arr) => {
    if (val?.email === prefEmail) {
      pref = val.preferredEmailType;
    }
  });

  return pref;
};

/**
 * Find the home address information.
 *
 * @param {array} addresses
 *   An array of objects containing address information.
 *
 * @returns {object|boolean}
 *   The addressParsed object when found or false
 */
const findPreferredAddress = (addresses) => {
  let ret = false;

  // Check the first address for the preferred type. Abort if anything is missing.
  if (!Array.isArray(addresses) || !addresses[0]?.preferredAddressType) {
    return ret;
  }

  // The preferred address is nested as a key in each of the options and we have
  // to loop through each of the addresses looking for it.
  const pref = addresses[0].preferredAddressType;
  addresses.forEach((val, ind, arr) => {
    if (val?.addressType === pref) {
      ret = val.addressParsed;
    }
  });

  return ret;
};

/**
 * Find the home address information.
 *
 * @param {array} addresses
 *   An array of objects containing address information.
 *
 * @param {string} type
 *   The keyword string to look for.
 *
 * @returns {object|boolean}
 *   The addressParsed object when found or false
 */
const findAddressType = (addresses, type) => {
  let ret = false;
  const BreakException = {};
  try {
    addresses.forEach((val, ind, arr) => {
      if (val.addressType === type) {
        ret = val.addressParsed;
        throw BreakException;
      }
    });
  } catch (e) {
    if (e !== BreakException) throw e;
  }

  return ret;
};

/**
 * Find the preferred address type
 *
 * @param {array} addresses
 *   An array of objects containing address information.
 *
 * @returns {string}
 *   The preferred address type
 */
export const findAddress = (addresses) => {
  let address;
  if (Array.isArray(addresses)) {
    address = findPreferredAddress(addresses);
    if (!address) {
      address = findAddressType(addresses, 'Home');
    }
    if (!address) {
      address = findAddressType(addresses, 'Business');
    }
    if (!address) {
      address = findAddressType(addresses, 'Other');
    }
  }
  return address;
};

/**
 * Set the window variables for the pre populated forms.
 * .
 * @param {*} userProfile
 */
const setGiveGabVars = (userProfile) => {
  // Set the `did` value to the encoded SUID variable.
  window.su_did =
    userProfile?.encodedSUID || userProfile?.session?.encodedSUID || null;

  // Logic for finding an address.
  //
  // If entity has preferred valid mailing address (either Home or Business), use that address first
  // If entity has no preference then use valid Home mailing address
  // If neither preferred or Home exist then use valid Business mailing address
  const address = findAddress(userProfile?.addresses);

  // Find the preferred email address. If none, use the one they logged in with.
  const email = findEmail(userProfile?.emails);

  // Find the preferred phone number.
  const phoneNumber = findPhoneNumber(userProfile?.phoneNumbers);

  // Concatenate street address 2 and 3.
  const street2 = [address?.streetAddress2, address?.streetAddress3]
    .join(' ')
    .trim();

  // In the event that the Megaprofile information is not available, only the following fields would be prefilled:
  // - Digital Name
  // - First Name
  // - Last Name
  // - Email
  window.su_dname =
    userProfile?.name?.digitalName ||
    `${userProfile?.session?.firstName} ${userProfile?.session?.lastName}`;
  window.su_first_name =
    userProfile?.name?.fullNameParsed?.firstName ||
    userProfile?.session?.firstName ||
    '';
  window.su_last_name =
    userProfile?.name?.fullNameParsed?.lastName ||
    userProfile?.session?.lastName ||
    '';
  window.su_email = email || userProfile?.session?.email || '';
  window.su_address = address?.streetAddress1 || '';
  window.su_address2 = street2 || '';
  window.su_city = address?.city || '';
  window.su_state = address?.stateProvince || '';
  window.su_zip = address?.zipPostalCode || '';
  window.su_country = lookup.byCountry(address?.addressCountry)?.iso2;
  window.su_birthDate = userProfile?.birthDate || '';
  window.su_phone = phoneNumber || '';
};

/**
 * Unset the window variables for the pre populated forms.
 */
const unsetGiveGabVars = () => {
  delete window.su_did;
  delete window.su_dname;
  delete window.su_first_name;
  delete window.su_last_name;
  delete window.su_email;
  delete window.su_address;
  delete window.su_address2;
  delete window.su_city;
  delete window.su_state;
  delete window.su_zip;
  delete window.su_country;
  delete window.su_birthDate;
  delete window.su_phone;
};

export { setGiveGabVars, unsetGiveGabVars };
