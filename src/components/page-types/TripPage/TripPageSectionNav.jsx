import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import { Container } from 'decanter-react';
import * as styles from './TripPageSectionNav.styles';
import { SBLinkType } from '../../../types/storyblok/SBLinkType';
import SAALinkButton from '../../cta/SAALinkButton';
import useEscape from '../../../hooks/useEscape';
import useOnClickOutside from '../../../hooks/useOnClickOutside';
import { isExpanded } from '../../../utilities/menuHelpers';

export const TripPageSectionNavProps = {
  renderFacultySection: PropTypes.bool,
  renderItinerarySection: PropTypes.bool,
  renderDetailsSection: PropTypes.bool,
  ariaLabel: PropTypes.string,
  status: PropTypes.oneOf(['notify', 'reserve']),
  inquireURL: SBLinkType,
  reservationURL: SBLinkType,
  activeSection: PropTypes.number,
};

export const TripPageSectionNav = (props) => {
  const {
    renderFacultySection,
    renderItinerarySection,
    renderDetailsSection,
    ariaLabel,
    status,
    inquireURL,
    reservationURL,
    activeSection,
  } = props;

  const [navOpened, setNavOpened] = useState(false);
  const ref = useRef(null);
  const burgerRef = useRef(null);

  const toggleNav = () => {
    setNavOpened(!navOpened);
  };

  let NavIcon = MenuIcon;
  if (navOpened) {
    NavIcon = XIcon;
  }

  // Close menu if escape key is pressed and return focus to the menu button
  useEscape(() => {
    if (burgerRef.current && isExpanded(burgerRef.current)) {
      setNavOpened(false);
      burgerRef.current.focus();
    }
  });

  useOnClickOutside(ref, () => setNavOpened(false));

  return (
    <>
      <nav aria-label={ariaLabel} className={styles.root}>
        <ul className={styles.menu}>
          <li className={styles.listItem}>
            <a
              href="#overview-section"
              className={styles.link({ isActive: activeSection === 1 })}
              aria-current={activeSection === 1}
            >
              Overview
            </a>
          </li>
          {renderFacultySection && (
            <li className={styles.listItem}>
              <a
                href="#faculty-leader-section"
                className={styles.link({ isActive: activeSection === 2 })}
                aria-current={activeSection === 2}
              >
                Faculty Leader
              </a>
            </li>
          )}
          {renderItinerarySection && (
            <li className={styles.listItem}>
              <a
                href="#itinerary-section"
                className={styles.link({ isActive: activeSection === 3 })}
                aria-current={activeSection === 3}
              >
                Itinerary
              </a>
            </li>
          )}
          {renderDetailsSection && (
            <li className={styles.listItem}>
              <a
                href="#trip-details-section"
                className={styles.link({ isActive: activeSection === 4 })}
                aria-current={activeSection === 4}
              >
                Trip Details
              </a>
            </li>
          )}
        </ul>
        {status === 'reserve' && reservationURL?.cached_url && (
          <SAALinkButton
            link={reservationURL}
            size="small-short"
            className={styles.button}
          >
            Reserve
          </SAALinkButton>
        )}
        {status === 'notify' && inquireURL?.cached_url && (
          <SAALinkButton
            link={inquireURL}
            size="small-short"
            className={styles.button}
          >
            Notify me
          </SAALinkButton>
        )}
      </nav>

      <Container className={styles.navWrapperMobile}>
        <nav aria-label={ariaLabel} className={styles.rootMobile} ref={ref}>
          <button
            type="button"
            onClick={toggleNav}
            aria-label={`${navOpened ? 'Close' : 'Open'} section menu`}
            aria-expanded={!!navOpened}
            ref={burgerRef}
            className={styles.burger({ navOpened })}
          >
            <span>{navOpened ? 'Close' : 'Section menu'}</span>
            <NavIcon aria-hidden className={styles.burgerIcon({ navOpened })} />
          </button>
          <div
            aria-hidden={!navOpened}
            className={styles.menuMobile({ navOpened })}
          >
            <ul className={styles.listMobile}>
              <li className={styles.listItemMobile}>
                <a
                  href="#overview-section"
                  className={styles.linkMobile}
                  onClick={() => setNavOpened(false)}
                >
                  Overview
                </a>
              </li>
              {renderFacultySection && (
                <li className={styles.listItemMobile}>
                  <a
                    href="#faculty-leader-section"
                    className={styles.linkMobile}
                    onClick={() => setNavOpened(false)}
                  >
                    Faculty Leader
                  </a>
                </li>
              )}
              {renderItinerarySection && (
                <li className={styles.listItemMobile}>
                  <a
                    href="#itinerary-section"
                    className={styles.linkMobile}
                    onClick={() => setNavOpened(false)}
                  >
                    Itinerary
                  </a>
                </li>
              )}
              {renderDetailsSection && (
                <li className={styles.listItemMobile}>
                  <a
                    href="#trip-details-section"
                    className={styles.linkMobile}
                    onClick={() => setNavOpened(false)}
                  >
                    Trip Details
                  </a>
                </li>
              )}
            </ul>
            {status === 'reserve' && reservationURL?.cached_url && (
              <div className={styles.buttonWrapperMobile}>
                <SAALinkButton
                  link={reservationURL}
                  className={styles.buttonMobile}
                  size="small"
                >
                  Reserve
                </SAALinkButton>
              </div>
            )}
            {status === 'notify' && inquireURL?.cached_url && (
              <div className={styles.buttonWrapperMobile}>
                <SAALinkButton
                  link={inquireURL}
                  className={styles.buttonMobile}
                  size="small"
                >
                  Notify me
                </SAALinkButton>
              </div>
            )}
          </div>
        </nav>
      </Container>
    </>
  );
};
TripPageSectionNav.propTypes = TripPageSectionNavProps;
