import React from 'react';
import PropTypes from 'prop-types';
import * as styles from './TripPageSectionNav.styles';
import { SBLinkType } from '../../../types/storyblok/SBLinkType';
import SAALinkButton from '../../cta/SAALinkButton';

export const TripPageSectionNavProps = {
  facultyHeading: PropTypes.string,
  itineraryHeading: PropTypes.string,
  detailsHeading: PropTypes.string,
  ariaLabel: PropTypes.string,
  inquireURL: SBLinkType,
  reservationURL: SBLinkType,
};

export const TripPageSectionNav = (props) => {
  const {
    renderFacultySection,
    renderItinerarySection,
    renderDetailsSection,
    ariaLabel,
    inquireURL,
    reservationURL,
    activeSection,
  } = props;

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
        {reservationURL?.cached_url && (
          <SAALinkButton
            link={reservationURL}
            size="small-short"
            className={styles.button}
          >
            Reserve
          </SAALinkButton>
        )}
        {!reservationURL?.cached_url && inquireURL?.cached_url && (
          <SAALinkButton
            link={inquireURL}
            size="small-short"
            className={styles.button}
          >
            Nofity
          </SAALinkButton>
        )}
      </nav>

      <nav aria-label={ariaLabel} className={styles.rootMobile}>
        <ul className={styles.menu}>
          <li className={styles.listItem}>
            <a href="#overview-section">Overview</a>
          </li>
          {renderFacultySection && (
            <li className={styles.listItem}>
              <a href="#faculty-leaders-section">Faculty Leaders</a>
            </li>
          )}
          {renderItinerarySection && (
            <li className={styles.listItem}>
              <a href="#itinerary-section">Itinerary</a>
            </li>
          )}
          {renderDetailsSection && (
            <li className={styles.listItem}>
              <a href="#trip-details-section">Trip Details</a>
            </li>
          )}
        </ul>
        {reservationURL?.cached_url && (
          <SAALinkButton link={reservationURL} size="small-short">
            Reserve
          </SAALinkButton>
        )}
        {!reservationURL?.cached_url && inquireURL?.cached_url && (
          <SAALinkButton link={inquireURL} size="small-short">
            Nofity
          </SAALinkButton>
        )}
      </nav>
    </>
  );
};
TripPageSectionNav.propTypes = TripPageSectionNavProps;
