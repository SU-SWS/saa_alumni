/**
 * Find the user's preferred phone number.
 *
 * @param {array} phoneNumbers
 *   An array of objects containing phone numbers.
 *
 * @returns {string|boolean}
 *   The phone number when found or false
 */
const findPreferredPhoneNumber = (phoneNumbers, prefPhoneNumberType) => {
  let ret = false;

  // The preferred phone number is nested as a key in each of the options and we have
  // to loop through each of the phoneNumbers looking for it.
  if (prefPhoneNumberType) {
    phoneNumbers.forEach((val) => {
      if (val?.type === prefPhoneNumberType) {
        ret = val.phoneNumber;
      }
    });
  }

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
    phoneNumbers.forEach((val) => {
      if (val.type === type) {
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
export const findPhoneNumber = (phoneNumbers, prefPhoneNumberType) => {
  let phoneNumber;
  if (Array.isArray(phoneNumbers)) {
    phoneNumber = findPreferredPhoneNumber(phoneNumbers, prefPhoneNumberType);
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
  let pref = '';

  phoneNumbers.forEach((val) => {
    if (val?.phoneNumber === prefPhoneNumber) {
      pref = val.type;
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
const findPreferredEmail = (emails, prefEmailType) => {
  let ret = false;

  // The preferred email is nested as a key in each of the options and we have
  // to loop through each of the emails looking for it.
  if (prefEmailType) {
    emails.forEach((val) => {
      if (val?.type === prefEmailType) {
        ret = val.emailAddress;
      }
    });
  }

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
    emails.forEach((val) => {
      if (val.type === type) {
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
export const findEmail = (emails, prefEmailType) => {
  let email;
  if (Array.isArray(emails)) {
    email = findPreferredEmail(emails, prefEmailType);
    if (!email) {
      email =
        findEmailType(emails, 'Home Email') ||
        findEmailType(emails, 'Business Email') ||
        findEmailType(emails, 'SAA Email') ||
        findEmailType(emails, 'GSB Email') ||
        findEmailType(emails, 'Other Email');
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
  let pref;

  emails.forEach((val) => {
    if (val?.emailAddress === prefEmail) {
      if (val?.type?.includes('SAA') || val?.type?.includes('GSB')) {
        pref = 'Other Email';
      } else {
        pref = val.type;
      }
    }
  });

  return pref;
};

/**
 * Set the window variables for the pre populated forms.
 * .
 * @param {*} userProfile
 */
const setGiveGabVars = (userProfile) => {
  // Set the `did` value to the encoded SUID variable.
  window.su_did = userProfile?.session?.encodedSUID || null;

  // Find the preferred email address. If none, use the one they logged in with.
  const email = findEmail(userProfile?.emails);

  // Find the preferred phone number.
  const phoneNumber = findPhoneNumber(userProfile?.phoneNumbers);

  // In the event that the Megaprofile information is not available, only the following fields would be prefilled:
  // - Digital Name (generated by combining the First and Last name)
  // - First Name
  // - Last Name
  // - Email
  window.su_dname =
    userProfile?.contact.name?.digitalName ||
    `${userProfile?.session?.firstName} ${userProfile?.session?.lastName}`;
  window.su_first_name =
    userProfile?.contact.name?.fullNameParsed?.firstName ||
    userProfile?.session?.firstName ||
    '';
  window.su_last_name =
    userProfile?.contact.name?.fullNameParsed?.lastName ||
    userProfile?.session?.lastName ||
    '';
  window.su_email = email || userProfile?.session?.email || '';
  window.su_birthDate = userProfile?.contact.birthDate || '';
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
  delete window.su_birthDate;
  delete window.su_phone;
};

export { setGiveGabVars, unsetGiveGabVars };
