const lookup = require('country-code-lookup');

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
 * Set the window variables for the pre populated forms.
 * .
 * @param {*} user
 */
const setGiveGabVars = (user) => {
  // Set the `did` value to the encoded SUID variable.
  window.did = user.encodedSUID || null;

  // Logic for finding an address.
  //
  // If entity has preferred valid mailing address (either Home or Business), use that address first
  // If entity has no preference then use valid Home mailing address
  // If neither preferred or Home exist then use valid Business mailing address
  let address;
  if (Array.isArray(user.addresses)) {
    address = findPreferredAddress(user.addresses);
    if (!address) {
      address = findAddressType(user.addresses, 'Home');
    }
    if (!address) {
      address = findAddressType(user.addresses, 'Business');
    }
    if (!address) {
      address = findAddressType(user.addresses, 'Other');
    }
  }

  // Find the preferred email address. If none, use the one they logged in with.
  let email;
  if (Array.isArray(user.emails)) {
    email = findPreferredEmail(user.emails);
    if (!email) {
      email = findEmailType(user.emails, 'Home Email');
    }
    if (!email) {
      email = findEmailType(user.emails, 'Business Email');
    }
    if (!email) {
      email = findEmailType(user.emails, 'Other Email');
    }
  }

  // Concatenate street address 2 and 3.
  const street2 = [address?.streetAddress2, address?.streetAddress3]
    .join(' ')
    .trim();

  // Used within the Registration, Additional Payment, Notify Me, and Journey request form
  // TODO: Finalize structure of firstName and lastName. (e.g. user?.registrationNameFirst or user?.fullNameParsed?.firstName)
  window.dname =
    user?.name?.digitalName || `${user?.firstName} ${user?.lastName}` || '';
  window.su_first_name =
    user?.name?.fullNameParsed.firstName || user?.firstName || '';
  window.su_last_name =
    user?.name?.fullNameParsed.lastName || user?.lastName || '';
  window.su_birthDate = user?.birthDate || '';
  window.su_email = user?.email || '';
  window.su_phone = user?.phoneNumber || '';

  // Reservation Number does not exist in API
  // window.su_res_conf_code = user?.registrationConfirmationCode || '';

  // Used within the Registration and Additional Payment request form
  // TODO: Determine if additional mapping is needed for different country/postal code formats.
  window.su_address = address?.streetAddress1 || '';
  window.su_address2 = street2 || '';
  window.su_city = address?.city || '';
  window.su_state = address?.stateProvince || '';
  window.su_zip = address?.zipPostalCode || '';
  window.su_country = lookup.byCountry(address?.addressCountry)?.iso2;
};

export default setGiveGabVars;
