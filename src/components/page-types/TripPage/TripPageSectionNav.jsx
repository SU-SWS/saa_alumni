import React from 'react';
import PropTypes from 'prop-types';
import { dcnb } from 'cnbuilder';
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
    facultyHeading,
    itineraryHeading,
    detailsHeading,
    ariaLabel,
    inquireURL,
    reservationURL,
  } = props;

  return (
    <>
      <nav aria-label={ariaLabel} className={styles.root}>
        <ul className={styles.menu}>
          <li className={styles.listItem}>
            <a href="#trip-overview-section" className={styles.link}>
              Overview
            </a>
          </li>
          {facultyHeading && (
            <li>
              <a href="#trip-faculty-leader-section" className={styles.link}>
                Faculty Leader
              </a>
            </li>
          )}
          {itineraryHeading && (
            <li className={styles.listItem}>
              <a href="#trip-itinerary-section" className={styles.link}>
                Itinerary
              </a>
            </li>
          )}
          {detailsHeading && (
            <li className={styles.listItem}>
              <a href="#trip-details-section" className={styles.link}>
                Details
              </a>
            </li>
          )}
          {reservationURL?.cached_url && (
            <SAALinkButton
              link={reservationURL}
              size="small"
              className={styles.button}
            >
              Reserve
            </SAALinkButton>
          )}
          {!reservationURL?.cached_url && inquireURL?.cached_url && (
            <SAALinkButton
              link={inquireURL}
              size="small"
              className={styles.button}
            >
              Nofity
            </SAALinkButton>
          )}
        </ul>
      </nav>

      <nav aria-label={ariaLabel} className={styles.rootMobile}>
        <ul className={styles.menu}>
          <li className={styles.listItem}>
            <a href="#trip-overview-section">Overview</a>
          </li>
          {facultyHeading && (
            <li className={styles.listItem}>
              <a href="#trip-faculty-leaders-section">Faculty Leaders</a>
            </li>
          )}
          {itineraryHeading && (
            <li className={styles.listItem}>
              <a href="#trip-itinerary-section">Itinerary</a>
            </li>
          )}
          {detailsHeading && (
            <li className={styles.listItem}>
              <a href="#trip-details-section">Details</a>
            </li>
          )}
        </ul>
        {reservationURL?.cached_url && (
          <SAALinkButton link={reservationURL} size="small">
            Reserve
          </SAALinkButton>
        )}
        {!reservationURL?.cached_url && inquireURL?.cached_url && (
          <SAALinkButton link={inquireURL} size="small">
            Nofity
          </SAALinkButton>
        )}
      </nav>
    </>
  );
};
TripPageSectionNav.propTypes = TripPageSectionNavProps;
