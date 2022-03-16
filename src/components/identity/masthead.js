import React, { useState, useRef } from 'react';
import SbEditable from 'storyblok-react';
import { dcnb } from 'cnbuilder';
import CreateBloks from '../../utilities/createBloks';
import Logo from './logo';
import { FlexBox } from '../layout/FlexBox';
import OpenSearchModalButton from '../search/openSearchModalButton';
import SearchModal from '../search/searchModal';
import * as styles from './GlobalHeader/GlobalHeader.styles';
import useEscape from '../../hooks/useEscape';
import useDisplay from '../../hooks/useDisplay';
import AccountLinks from '../navigation/accountLinks';

const Masthead = ({
  blok: { mainNav, utilityNav, searchPageUrl },
  blok,
  hasHero,
  isDark,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const desktopRef = useRef(null);
  const mobileRef = useRef(null);
  const openSearchRef = useRef(null);
  const openSearchMobileRef = useRef(null);

  let mainNavBgColorXl =
    'xl:su-bg-transparent xl:su-bg-gradient-to-b xl:su-from-masthead-black-top xl:su-to-masthead-black-bottom su-backface-hidden';
  let mainNavBgColorLg =
    'su-bg-transparent su-bg-gradient-to-b su-from-masthead-black-top su-to-masthead-black-bottom su-backface-hidden';

  if (isDark && !hasHero) {
    mainNavBgColorXl = 'xl:su-bg-saa-black';
    mainNavBgColorLg = 'su-bg-saa-black';
  }

  const returnFocus = () => {
    if (openSearchRef.current) {
      openSearchRef.current.focus();
    } else if (openSearchMobileRef.current) {
      openSearchMobileRef.current.focus();
    }
  };

  const handleClose = () => {
    setModalOpen(false);
    returnFocus();
  };

  useEscape(() => {
    // Only do this if the search modal is open
    if (modalOpen) {
      const searchInputModal =
        document.getElementsByClassName('search-input-modal')[0];

      // Only close the modal with Escape key if the autocomplete dropdown is not open
      if (searchInputModal.getAttribute('aria-expanded') !== 'true') {
        setModalOpen(false);
        returnFocus();
      }
    }
  });

  // Use the useDisplay hook to determine whether to display the desktop of mobile header
  const { showDesktop, showMobile } = useDisplay();

  return (
    <SbEditable content={blok}>
      {showMobile && (
        <div
          className="masthead-mobile su-relative su-w-full lg:su-hidden su-bg-cardinal-red-xdark"
          ref={mobileRef}
        >
          <nav aria-label="Utility Menu" className={styles.utilNavMobile}>
            <ul className={styles.utilNavMenuMobile}>
              <CreateBloks
                blokSection={utilityNav}
                className="first:su-ml-0 su-link-regular"
                hasExternalIcon
              />
              <AccountLinks />
            </ul>
          </nav>
          <FlexBox className="su-cc" alignItems="center">
            <FlexBox alignItems="center" className="su-rs-py-1">
              <Logo className="su-w-[18rem]" />
            </FlexBox>
            <OpenSearchModalButton
              openOpen={modalOpen}
              setModalOpen={setModalOpen}
              ref={openSearchMobileRef}
            />
            <CreateBloks blokSection={mainNav} className="su-flex-shrink-0" />
          </FlexBox>
        </div>
      )}
      {showDesktop && (
        <div
          className={`masthead-desktop su-hidden lg:su-block su-w-full su-z-20
                  ${hasHero ? 'su-absolute' : 'su-relative'}`}
          ref={desktopRef}
        >
          <FlexBox>
            <FlexBox
              alignItems="center"
              className="su-flex-shrink-0 lg:su-px-30 xl:su-items-end xl:su-pl-61 xl:su-pr-45 2xl:su-pr-45 2xl:su-pl-61 3xl:su-cc 3xl:su-pr-70 xl:su-pb-38 su-ml-0 su-bg-gradient-to-b su-to-digital-red su-from-cardinal-red"
            >
              <Logo className="su-w-[18rem] lg:su-w-[20rem] xl:su-w-[19vw] 2xl:su-w-[26rem]" />
            </FlexBox>
            <FlexBox
              direction="col"
              className={dcnb(
                'su-flex-grow lg:su-pr-30 xl:su-pr-[6rem] 2xl:su-pr-61 3xl:su-cc lg:su-pl-0 xl:su-pl-30 3xl:su-pl-61 su-bg-cardinal-red-xdark xl:su-border-b xl:su-border-solid xl:su-border-black-90',
                mainNavBgColorXl
              )}
            >
              <FlexBox
                direction="row"
                className="su-rs-my-0 xl:su-mb-0 su-flex-grow"
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
                  openOpen={modalOpen}
                  setModalOpen={setModalOpen}
                  ref={openSearchRef}
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
              'lg:su-flex xl:su-hidden su-rs-pt-1 su-pr-20 su-border-b su-border-solid su-border-black-90',
              mainNavBgColorLg
            )}
          />
        </div>
      )}
      <SearchModal
        isOpen={modalOpen}
        setIsOpen={setModalOpen}
        onClose={handleClose}
        searchPageUrl={searchPageUrl}
      />
    </SbEditable>
  );
};

export default Masthead;
