import React, { useRef, useState } from 'react';
import { useLocation } from '@reach/router';
import { dcnb } from 'cnbuilder';
import { Avatar } from './Avatar';
import UserNavItems from './MainNav/userNavItems';
import AuthContext from '../../contexts/AuthContext';
import useOnClickOutside from '../../hooks/useOnClickOutside';
import useEscape from '../../hooks/useEscape';
import { isExpanded } from '../../utilities/menuHelpers';
import useDisplay from '../../hooks/useDisplay';
import NavItem from './navItem';
import { Spinner } from './Spinner';
import { SrOnlyText } from '../accessibility/SrOnlyText';
import * as styles from './accountLinks.styles';

const AccountLinks = ({ mainLinkClasses }) => {
  const location = useLocation();
  const ref = useRef(null);
  const buttonRef = useRef(null);
  const [expanded, setExpanded] = useState(false);
  const loginParams = new URLSearchParams({
    final_destination: location.pathname + location.search,
  });

  const loginUrl = `/api/auth/login${
    loginParams ? `?${loginParams.toString()}` : ''
  }`;

  const { showDesktop: showDesktopXl } = useDisplay('xl');
  const { showDesktop } = useDisplay();

  useOnClickOutside(ref, () => {
    setExpanded(false);
  });

  useEscape(() => {
    if (buttonRef.current && isExpanded(buttonRef.current)) {
      setExpanded(false);
      buttonRef.current.focus();
    }
  });

  return (
    <AuthContext.Consumer>
      {({ isAuthenticated, isAuthenticating, userProfile }) => (
        <>
          {/* Desktop spinner in utility nav */}
          {isAuthenticating && <Spinner className="su-hidden lg:su-flex" />}

          {!isAuthenticating && (
            <>
              {isAuthenticated && (
                <>
                  <li
                    className="su-relative su-pb-10 lg:su-pt-0 lg:su-pb-0 su-list-none"
                    ref={ref}
                  >
                    {showDesktop && (
                      <button
                        type="button"
                        ref={buttonRef}
                        aria-expanded={expanded}
                        onClick={() => setExpanded(!expanded)}
                        className="su-flex su-items-center su-group su-text-white"
                      >
                        <span
                          className={styles.greeting(showDesktopXl)}
                          data-test="user-menu-greeting"
                        >{`Hi, ${
                          userProfile?.contact?.name.digitalName ||
                          `${userProfile.session.firstName} ${userProfile.session.lastName}`
                        }`}</span>
                        <SrOnlyText>
                          {`${expanded ? ' Close' : ' Open'} user menu`}
                        </SrOnlyText>
                        <div className={styles.initialCircleWrapper}>
                          <Avatar userProfile={userProfile} />
                        </div>
                      </button>
                    )}

                    <UserNavItems
                      expanded={expanded}
                      userProfile={userProfile}
                    />
                  </li>
                </>
              )}
              {!isAuthenticated && (
                <>
                  <NavItem
                    className={dcnb(
                      showDesktop
                        ? mainLinkClasses
                        : `su-border-t su-border-t-digital-red-xlight su-transition su-text-20 children:su-px-20 children:su-py-32 children:su-flex su-leading-display children:su-text-white hocus:children:su-text-white hocus:su-bg-cardinal-red-xxdark hocus:children:su-decoration-digital-red-xlight su-underline-offset-2 children:su-w-full su-mt-[7rem]`
                    )}
                    blok={{
                      link: {
                        url: loginUrl,
                      },
                      text: 'Log in',
                    }}
                  />
                </>
              )}
            </>
          )}
        </>
      )}
    </AuthContext.Consumer>
  );
};

export default AccountLinks;
