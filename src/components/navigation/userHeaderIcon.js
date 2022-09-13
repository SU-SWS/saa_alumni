import React from 'react';
import { UserIcon } from '@heroicons/react/outline';
import AuthContext from '../../contexts/AuthContext';
import useDisplay from '../../hooks/useDisplay';
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
          {isAuthenticating && (
            <div className="su-spinner su-flex su-relative su-w-[3.4rem] su-h-[3.4rem] lg:su-w-[4rem] lg:su-h-[4rem]">
              <div className="su-block su-absolute su-w-[3.4rem] su-h-[3.4rem] lg:su-w-[4rem] lg:su-h-[4rem] su-border-[.2rem] su-border-[white_transparent_transparent_transparent] su-rounded-full su-box-border su-animate-spin" />
              <div className="su-block su-absolute su-w-[3.4rem] su-h-[3.4rem] lg:su-w-[4rem] lg:su-h-[4rem] su-border-[.2rem] su-border-[white_transparent_transparent_transparent] su-rounded-full su-box-border su-animate-spin su-delay-75" />
              <div className="su-block su-absolute su-w-[3.4rem] su-h-[3.4rem] lg:su-w-[4rem] lg:su-h-[4rem] su-border-[.2rem] su-border-[white_transparent_transparent_transparent] su-rounded-full su-box-border su-animate-spin" />
              <div className="su-block su-absolute su-w-[3.4rem] su-h-[3.4rem] lg:su-w-[4rem] lg:su-h-[4rem] su-border-[.2rem] su-border-[white_transparent_transparent_transparent] su-rounded-full su-box-border su-animate-spin" />
            </div>
          )}

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
