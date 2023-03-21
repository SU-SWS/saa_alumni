import React from 'react';
import { dcnb } from 'cnbuilder';
import { FlexBox } from '../layout/FlexBox';
import * as styles from './accountLinks.styles';
import PrivateImage from '../media/privateImage';

export const Avatar = ({ userProfile, className }) => {
  const string =
    userProfile.name?.digitalName || userProfile.session?.firstName;
  const initial = string?.substr(0, 1);

  return (
    <FlexBox
      justifyContent="center"
      className={dcnb(styles.initialCircle, className)}
      aria-hidden
    >
      {userProfile?.profilePhotoURL ? (
        <PrivateImage
          filename={userProfile.profilePhotoURL}
          loading="eager"
          width="50"
          height="50"
        />
      ) : (
        initial
      )}
    </FlexBox>
  );
};
