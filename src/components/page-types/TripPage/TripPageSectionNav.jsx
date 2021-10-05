import React from 'react';
import PropTypes from 'prop-types';
import { dcnb } from 'cnbuilder';
import * as styles from './TripPageSectionNav.styles';

export const TripPageSectionNavProps = {
  facultyHeading: PropTypes.string,
  itineraryHeading: PropTypes.string,
  detailsHeading: PropTypes.string,
};

export const TripPageSectionNav = (props) => {
  const { facultyHeading, itineraryHeading, detailsHeading } = props;

  return (
    <nav>
      <ul>
        <li>
          <a href="#trip-overview-section">Overview</a>
        </li>
        {facultyHeading && (
          <li>
            <a href="#trip-faculty-leaders-section">Faculty Leaders</a>
          </li>
        )}
        {itineraryHeading && (
          <li>
            <a href="#trip-itinerary-section">Itinerary</a>
          </li>
        )}
        {detailsHeading && (
          <li>
            <a href="#trip-details-section">Details</a>
          </li>
        )}
      </ul>
    </nav>
  );
};
TripPageSectionNav.propTypes = TripPageSectionNavProps;
