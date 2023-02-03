import React, { useRef, useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/outline';
import { useLocation } from '@reach/router';
import UserNavItems from './MainNav/userNavItems';
import AuthContext from '../../contexts/AuthContext';
import useOnClickOutside from '../../hooks/useOnClickOutside';
import useEscape from '../../hooks/useEscape';
import { isExpanded } from '../../utilities/menuHelpers';
import useDisplay from '../../hooks/useDisplay';
import NavItem from './navItem';
import { SrOnlyText } from '../accessibility/SrOnlyText';
import * as styles from './MainNav/userNavItems.styles';

const Initial = ({ string }) => {
  const initial = string?.substr(0, 1);
  return (
    <div
      className="su-flex su-justify-center su-transition su-leading su-text-center su-w-40 su-h-40 su-text-24 su-border-2 su-border-digital-red-xlight su-rounded-full group-hover:su-bg-cardinal-red-xdark group-focus:su-bg-cardinal-red-xdark"
      aria-hidden
    >
      {initial}
    </div>
  );
};

const AccountLinks = ({ mainLinkClasses }) => {
  const location = useLocation();
  const ref = useRef(null);
  const buttonRef = useRef(null);
  const [expanded, setExpanded] = useState(false);
  const loginParams = new URLSearchParams({
    final_destination: location.pathname + location.search,
  });

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

  const logoutLinkClasses = showDesktop
    ? mainLinkClasses
    : styles.utilityNavLink;

  return (
    <AuthContext.Consumer>
      {({ isAuthenticated, isAuthenticating, userProfile }) => (
        <>
          {isAuthenticating && (
            <li>
              <div className="su-spinner su-flex su-relative su-w-[4rem] su-h-[4rem]">
                <div className="su-block su-absolute su-w-[4rem] su-h-[4rem] su-border-[.2rem] su-border-[white_transparent_transparent_transparent] su-rounded-full su-box-border su-animate-spin" />
                <div className="su-block su-absolute su-w-[4rem] su-h-[4rem] su-border-[.2rem] su-border-[white_transparent_transparent_transparent] su-rounded-full su-box-border su-animate-spin su-delay-75" />
                <div className="su-block su-absolute su-w-[4rem] su-h-[4rem] su-border-[.2rem] su-border-[white_transparent_transparent_transparent] su-rounded-full su-box-border su-animate-spin" />
                <div className="su-block su-absolute su-w-[4rem] su-h-[4rem] su-border-[.2rem] su-border-[white_transparent_transparent_transparent] su-rounded-full su-box-border su-animate-spin" />
              </div>
            </li>
          )}

          {!isAuthenticating && (
            <>
              {isAuthenticated && (
                <li
                  className="su-text-white su-relative su-pb-10 lg:su-pt-0 lg:su-pb-0 su-list-none"
                  ref={ref}
                >
                  {showDesktop && (
                    <button
                      type="button"
                      ref={buttonRef}
                      aria-expanded={expanded}
                      onClick={() => setExpanded(!expanded)}
                      className="su-flex su-items-center su-group"
                    >
                      <span
                        className={`su-inline-block su-mr-10 ${
                          showDesktopXl ? '' : 'su-hidden'
                        }`}
                      >{`Hi, ${
                        userProfile.name?.digitalName ||
                        `${`${userProfile.session.firstName} ${userProfile.session.lastName}`}`
                      }`}</span>
                      <SrOnlyText>
                        {`${expanded ? ' Close' : ' Open'} user menu`}
                      </SrOnlyText>
                      <Initial
                        string={
                          userProfile.name?.digitalName ||
                          userProfile.session?.firstName
                        }
                      />
                      <ChevronDownIcon
                        className={`su-inline-block lg:su-relative su-ml-8 su-w-[19px] lg:su-w-[19px] lg:su-pt-0 lg:su-pb-0 lg:su-px-0 su-text-white lg:group-hover:su-text-digital-red-xlight group-focus:su-text-digital-red-xlight su-transition
                ${expanded ? 'su-rotate-180 su-transform-gpu' : ''}`}
                        aria-hidden="true"
                      />
                    </button>
                  )}

                  <UserNavItems expanded={expanded} />
                </li>
              )}
              {!isAuthenticated && (
                <>
                  <NavItem
                    className={logoutLinkClasses}
                    blok={{
                      link: {
                        url: `/api/auth/login${
                          loginParams ? `?${loginParams.toString()}` : ''
                        }`,
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
