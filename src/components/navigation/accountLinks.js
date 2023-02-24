import React, { useRef, useState } from 'react';
import { useLocation } from '@reach/router';
import { dcnb } from 'cnbuilder';
import UserNavItems from './MainNav/userNavItems';
import AuthContext from '../../contexts/AuthContext';
import useOnClickOutside from '../../hooks/useOnClickOutside';
import useEscape from '../../hooks/useEscape';
import { isExpanded } from '../../utilities/menuHelpers';
import useDisplay from '../../hooks/useDisplay';
import NavItem from './navItem';
import { SrOnlyText } from '../accessibility/SrOnlyText';

const Initial = ({ userProfile }) => {
  const string =
    userProfile.name?.digitalName || userProfile.session?.firstName;
  const initial = string?.substr(0, 1);
  return (
    <div
      className={dcnb(
        'su-flex su-justify-center su-transition su-leading su-text-center su-border-2',
        'su-border-digital-red-xlight su-rounded-full group-hover:su-bg-cardinal-red-xdark group-focus:su-bg-cardinal-red-xdark',
        'su-w-full su-h-full'
      )}
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
          {isAuthenticating && (
            <div className="su-spinner su-flex su-relative su-w-[4rem] su-h-[4rem]">
              <div className="su-block su-absolute su-w-[4rem] su-h-[4rem] su-border-[.2rem] su-border-[white_transparent_transparent_transparent] su-rounded-full su-box-border su-animate-spin" />
              <div className="su-block su-absolute su-w-[4rem] su-h-[4rem] su-border-[.2rem] su-border-[white_transparent_transparent_transparent] su-rounded-full su-box-border su-animate-spin su-delay-75" />
              <div className="su-block su-absolute su-w-[4rem] su-h-[4rem] su-border-[.2rem] su-border-[white_transparent_transparent_transparent] su-rounded-full su-box-border su-animate-spin" />
              <div className="su-block su-absolute su-w-[4rem] su-h-[4rem] su-border-[.2rem] su-border-[white_transparent_transparent_transparent] su-rounded-full su-box-border su-animate-spin" />
            </div>
          )}

          {!isAuthenticating && (
            <>
              {isAuthenticated && (
                <>
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
                          `${userProfile.session.firstName} ${userProfile.session.lastName}`
                        }`}</span>
                        <SrOnlyText>
                          {`${expanded ? ' Close' : ' Open'} user menu`}
                        </SrOnlyText>
                        <div className="su-w-40 su-h-40 su-text-24">
                          <Initial userProfile={userProfile} />
                        </div>
                      </button>
                    )}

                    <UserNavItems
                      expanded={expanded}
                      userProfile={userProfile}
                      Initial={() => <Initial userProfile={userProfile} />}
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
                        : `su-transition su-text-20 children:su-px-20 children:su-py-32 children:su-flex su-leading-display children:su-text-white hocus:children:su-text-white hocus:su-bg-cardinal-red-xxdark hocus:children:su-decoration-digital-red-xlight su-underline-offset-2 children:su-w-full su-mt-[7rem]`
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
