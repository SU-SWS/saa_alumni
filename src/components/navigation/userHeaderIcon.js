import React from 'react';
import { UserIcon } from '@heroicons/react/outline';
import AuthContext from '../../contexts/AuthContext';
import { FlexBox } from '../layout/FlexBox';
import { Spinner } from './Spinner';
import * as styles from './MainNav/mainNav.styles';

const Initial = ({ string, isAuthenticated, menuCircle }) => {
  const initial = string && string.substr(0, 1);
  const classes = menuCircle ? styles.menuCircles : styles.headerUserCircle;

  return (
    <div className={classes} aria-hidden>
      {isAuthenticated && initial}
      {!isAuthenticated && <UserIcon className="su-w-20 su-h-20" aria-hidden />}
    </div>
  );
};

const UserHeaderIcon = ({ menuCircle }) => (
  <AuthContext.Consumer>
    {({ isAuthenticated, isAuthenticating, userProfile }) => (
      <>
        {/* Mobile Spinner in place of avatar */}
        {isAuthenticating && <Spinner className="lg:su-hidden" />}

        {!isAuthenticating && (
          <FlexBox alignItems="center" className="su-group su-relative">
            <Initial
              isAuthenticated={isAuthenticated}
              menuCircle={menuCircle}
              string={
                isAuthenticated && userProfile?.name?.fullNameParsed?.firstName
              }
            />
          </FlexBox>
        )}
      </>
    )}
  </AuthContext.Consumer>
);

export default UserHeaderIcon;
