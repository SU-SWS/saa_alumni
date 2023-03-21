import React from 'react';
import { UserIcon } from '@heroicons/react/outline';
import { Avatar } from './Avatar';
import AuthContext from '../../contexts/AuthContext';
import { Spinner } from './Spinner';
import * as styles from './MainNav/mainNav.styles';

const UserHeaderIcon = () => (
  <AuthContext.Consumer>
    {({ isAuthenticated, isAuthenticating, userProfile }) => (
      <>
        {/* On mobile while logged out, display generic HeroIcon user in circle */}
        {!isAuthenticated && !isAuthenticating && (
          <div className={styles.menuCircles} aria-hidden>
            <UserIcon className="su-w-20 su-h-20" aria-hidden />
          </div>
        )}
        {/* While authenticating on mobile, display Spinner in place of avatar */}
        {isAuthenticating && <Spinner className="lg:su-hidden" />}

        {/* If authenticated, show the avatar (initial or image) */}
        {!isAuthenticating && isAuthenticated && (
          <Avatar userProfile={userProfile} className={styles.menuCircles} />
        )}
      </>
    )}
  </AuthContext.Consumer>
);

export default UserHeaderIcon;
