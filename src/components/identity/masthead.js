import React, { useContext } from 'react';
import SbEditable from 'storyblok-react';
import { dcnb } from 'cnbuilder';
import CreateBloks from '../../utilities/createBloks';
import Logo from './logo';
import { FlexBox } from '../layout/FlexBox';
import OpenSearchModalButton from '../search/Modal/OpenSearchModalButton';
import SearchModal from '../search/Modal/SearchModal';
import * as styles from './GlobalHeader/GlobalHeader.styles';
import useDisplay from '../../hooks/useDisplay';
import AccountLinks from '../navigation/accountLinks';
import SearchModalContext from '../search/Modal/SearchModalContext';

const Masthead = ({ blok: { mainNav, utilityNav }, blok, hasHero, isDark }) => {
  let mainNavBgColorXl =
    'xl:su-bg-transparent xl:su-bg-gradient-to-b xl:su-from-masthead-black-top xl:su-to-masthead-black-bottom su-backface-hidden';
  let mainNavBgColorLg =
    'su-bg-transparent su-bg-gradient-to-b su-from-masthead-black-top su-to-masthead-black-bottom su-backface-hidden';

  if (isDark && !hasHero) {
    mainNavBgColorXl = 'xl:su-bg-saa-black';
    mainNavBgColorLg = 'su-bg-saa-black';
  }

  // Use the useDisplay hook to determine whether to display the desktop of mobile header
  const { showDesktop, showMobile } = useDisplay();

  // Get refs from the SearchModalContext
  const { desktopButtonRef, mobileButtonRef } = useContext(SearchModalContext);

  return (
    <SbEditable content={blok}>
      {showMobile && (
        <div className="masthead-mobile su-relative su-w-full lg:su-hidden su-bg-cardinal-red-xdark">
          <nav aria-label="Utility Menu" className={styles.utilNavMobile}>
            <ul className={styles.utilNavMenuMobile}>
              <CreateBloks
                blokSection={utilityNav}
                className="first:su-ml-0 su-link-regular"
                hasExternalIcon
              />
            </ul>
          </nav>
          <FlexBox
            className="su-cc"
            alignItems="center"
            justifyContent="between"
          >
            <FlexBox alignItems="center" className="su-rs-py-1">
              <Logo className="su-w-150" />
            </FlexBox>
            <FlexBox>
              <OpenSearchModalButton
                id="mastead-search-openmodal-mobile"
                ref={mobileButtonRef}
              />
              <CreateBloks blokSection={mainNav} className="su-shrink-0" />
            </FlexBox>
          </FlexBox>
        </div>
      )}
      {showDesktop && (
        <div
          className={`masthead-desktop su-hidden lg:su-block su-w-full su-z-20
                  ${hasHero ? 'su-absolute' : 'su-relative'}`}
        >
          <FlexBox>
            <FlexBox
              alignItems="center"
              className="su-shrink-0 lg:su-px-30 xl:su-items-end xl:su-pl-61 xl:su-pr-45 2xl:su-pr-45 2xl:su-pl-61 3xl:su-cc 3xl:su-pr-70 xl:su-pb-38 su-ml-0 su-bg-gradient-to-b su-to-digital-red su-from-cardinal-red"
            >
              <Logo className="su-w-[18rem] lg:su-w-200 xl:su-w-[19vw] 2xl:su-w-[26rem]" />
            </FlexBox>
            <FlexBox
              direction="col"
              className={dcnb(
                'su-grow lg:su-pr-30 xl:su-pr-60 2xl:su-pr-61 3xl:su-cc lg:su-pl-0 xl:su-pl-30 3xl:su-pl-61 su-bg-cardinal-red-xdark xl:su-border-b  xl:su-border-black-90',
                mainNavBgColorXl
              )}
            >
              <FlexBox
                direction="row"
                className="su-rs-my-0 xl:su-mb-0 su-grow"
              >
                <nav aria-label="Utility Menu" className={styles.utilNav}>
                  <ul className={styles.utilNavMenu}>
                    <CreateBloks
                      blokSection={utilityNav}
                      className={`${styles.utilNavItem} su-link-regular`}
                      hasExternalIcon
                    />
                    <AccountLinks mainLinkClasses={styles.utilNavItem} />
                  </ul>
                </nav>
                <OpenSearchModalButton
                  id="mastead-search-openmodal-desktop"
                  ref={desktopButtonRef}
                />
              </FlexBox>
              <CreateBloks
                blokSection={mainNav}
                className="su-hidden lg:su-hidden xl:su-flex xl:su-mt-12 2xl:su-mt-27"
              />
            </FlexBox>
          </FlexBox>
          <CreateBloks
            blokSection={mainNav}
            className={dcnb(
              'lg:su-flex xl:su-hidden su-rs-pt-1 su-pr-20 su-border-b su-border-black-90',
              mainNavBgColorLg
            )}
          />
        </div>
      )}
      <SearchModal />
    </SbEditable>
  );
};

export default Masthead;
