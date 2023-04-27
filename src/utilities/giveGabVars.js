/**
 * Find the preferred phone number and type
 *
 * @param {array} phoneNumbers
 *   An array of objects containing phone number information.
 * @param {string} type
 *   A string of prefPhoneNumberType
 *
 * @returns {obj}
 *   Contains the preferred phone number and type
 */
export const findPhoneNumber = (phoneNumbers, type) => {
  const found =
    Array.isArray(phoneNumbers) && type
      ? phoneNumbers.find((item) => item.type === type)
      : false;
  return found && { phoneNumber: found.phoneNumber, type };
};

export const fetchPhone = (phoneNumbers, type) =>
  findPhoneNumber(phoneNumbers, type) ||
  findPhoneNumber(phoneNumbers, 'Home Phone') ||
  findPhoneNumber(phoneNumbers, 'Mobile') ||
  findPhoneNumber(phoneNumbers, 'Business Phone');

/**
 * Find the preferred email and type
 *
 * @param {array} emails
 *   An array of objects containing emails.
 * @param {string} type
 *   A string of prefEmailType
 *
 * @returns {obj}
 *   Contains the preferred email and type
 */
export const findEmail = (emails, type) => {
  const found =
    Array.isArray(emails) && type
      ? emails.find((item) => item.type === type)
      : false;
  return found && { email: found.email, type };
};

export const fetchEmail = (emails, type) =>
  findEmail(emails, type) ||
  findEmail(emails, 'Home Email') ||
  findEmail(emails, 'Business Email') ||
  findEmail(emails, 'SAA Email') ||
  findEmail(emails, 'GSB Email') ||
  findEmail(emails, 'Other Email');

/**
 * Set the window variables for the pre populated forms.
 * .
 * @param {*} userProfile
 */
const setGiveGabVars = (userProfile) => {
  // Set the `did` value to the encoded SUID variable.
  window.su_did = userProfile?.session?.encodedSUID || null;

  // Find the preferred email address. If none, use the one they logged in with.
  const email =
    findEmail(userProfile?.emails, userProfile?.contact?.preferredEmail) ||
    userProfile?.session.email;

  // Find the preferred phone number.
  const phoneNumber = findPhoneNumber(
    userProfile?.phoneNumbers,
    userProfile?.contact?.preferredPhoneType
  );

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
