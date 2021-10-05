import React from 'react';
import PropTypes from 'prop-types';
import { dcnb } from 'cnbuilder';
import { Container } from 'decanter-react';
import { slugify } from '../../../utilities/slugify';
import * as styles from './TripPageSectionWrapper.styles';

export const TripPageSectionWrapperProps = {
  heading: PropTypes.string.isRequired,
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
};

export const TripPageSectionWrapper = ({ heading, className, children }) => (
  <Container
    id={`trip-${slugify(heading)}-section`}
    className={dcnb(className, styles.root)}
    width="full"
  >
    <Container width="site">
      <h2 className={styles.sectionHeading}>{heading}</h2>
    </Container>
    {children}
  </Container>
);
TripPageSectionWrapper.propTypes = TripPageSectionWrapperProps;
