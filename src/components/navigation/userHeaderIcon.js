import React from 'react';
import { UserIcon } from '@heroicons/react/outline';
import AuthContext from '../../contexts/AuthContext';
import useDisplay from '../../hooks/useDisplay';
import { Spinner } from './Spinner';
import * as styles from './MainNav/mainNav.styles';

const Initial = ({ string, isAuthenticated, menuCircle }) => {
  const initial = string && string.substr(0, 1);
  const classes = menuCircle ? styles.menuCircles : styles.headerUserCircle;

  return (
    <div className={classes} aria-hidden>
      {isAuthenticated && initial}
      {!isAuthenticated && (
        <UserIcon
          className="su-w-20 su-h-20 su-flex su-self-center"
          aria-hidden="true"
        />
      )}
    </div>
  );
};

const UserHeaderIcon = ({ menuCircle }) => {
  const { showDesktop } = useDisplay('xl');

  return (
    <AuthContext.Consumer>
      {({ isAuthenticated, isAuthenticating, userProfile }) => (
        <>
          {/* Mobile Spinner in place of avatar */}
          {isAuthenticating && <Spinner className="lg:su-hidden" />}

          {!isAuthenticating && (
            <div className="su-flex su-items-center su-group su-relative">
              {isAuthenticated && (
                <span
                  className={`su-inline-block su-mr-10 ${
                    showDesktop ? '' : 'su-hidden'
                  }`}
                >{`Hi, ${userProfile?.name?.fullNameParsed?.firstName} ${userProfile?.name?.fullNameParsed?.lastName}`}</span>
              )}

              <Initial
                isAuthenticated={isAuthenticated}
                menuCircle={menuCircle}
                string={
                  isAuthenticated &&
                  userProfile?.name?.fullNameParsed?.firstName
                }
              />
            </div>
          )}
        </>
      )}
    </AuthContext.Consumer>
  );
};

export default UserHeaderIcon;
