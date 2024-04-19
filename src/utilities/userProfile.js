import { fetchEmail, fetchPhone } from './giveGabVars';
import { formatUsDate } from './transformDate';
import {
  findSelectOption,
  emailTypeList,
  phoneNumberTypeList,
} from '../components/page-types/registrationFormPage/registationFormOptions';

export const extractUserData = (userProfile) => {
  const emailData = fetchEmail(
    userProfile?.emails,
    userProfile?.contact?.preferredEmail
  );

  const primaryRegistrantEmail = emailData?.email || userProfile?.session.email;
  const primaryRegistrantEmailType = emailData?.type || null;

  const phoneData = fetchPhone(
    userProfile?.phoneNumbers,
    userProfile?.contact?.preferredPhoneType
  );

  const primaryRegistrantPhoneNumber = phoneData?.phoneNumber || null;
  const primaryRegistrantPhoneNumberType = phoneData?.type || null;

  const affiliations = userProfile?.affiliation.affiliations || [];

  // Additional user information parsing
  const firstName =
    userProfile?.contact.name?.fullNameParsed?.firstName ||
    userProfile?.session?.firstName;
  const middleName =
    userProfile?.contact.name?.fullNameParsed?.middleName === null ||
    userProfile?.contact.name?.fullNameParsed?.middleName === undefined
      ? '&nbsp;'
      : userProfile?.contact.name?.fullNameParsed?.middleName;
  const lastName =
    userProfile?.contact.name?.fullNameParsed?.lastName ||
    userProfile?.session?.lastName;
  const digitalName =
    userProfile?.contact.name?.digitalName || `${firstName} ${lastName}`;

  return {
    su_did: userProfile?.session?.encodedSUID,
    su_dname: digitalName,
    su_title: userProfile?.contact.name?.fullNameParsed?.prefix,
    su_first_name: firstName,
    su_middle_name: middleName,
    su_last_name: lastName,
    su_email: primaryRegistrantEmail,
    su_email_type: findSelectOption(emailTypeList, primaryRegistrantEmailType),
    su_recipient_email_type: primaryRegistrantEmailType || undefined,
    su_phone: primaryRegistrantPhoneNumber,
    su_phone_type: findSelectOption(
      phoneNumberTypeList,
      primaryRegistrantPhoneNumberType
    ),
    su_recipient_phone_type: primaryRegistrantPhoneNumberType || undefined,
    su_dob: userProfile?.contact.birthDate
      ? formatUsDate(userProfile?.contact.birthDate)
      : '',
    su_affiliations: affiliations,
  };
};
