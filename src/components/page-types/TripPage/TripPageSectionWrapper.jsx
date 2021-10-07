import React from 'react';
import PropTypes from 'prop-types';
import { dcnb } from 'cnbuilder';
import { Container, Heading } from 'decanter-react';
import { slugify } from '../../../utilities/slugify';
import * as styles from './TripPageSectionWrapper.styles';

export const TripPageSectionWrapperProps = {
  heading: PropTypes.string.isRequired,
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  isCenter: PropTypes.bool,
};

export const TripPageSectionWrapper = ({
  heading,
  className,
  children,
  isCenter,
}) => (
  <Container
    id={`trip-${slugify(heading)}-section`}
    className={dcnb(className, styles.root)}
    width="full"
  >
    <Container width="site">
      <Heading
        level={2}
        size={1}
        weight="semibold"
        className={styles.sectionHeading({ isCenter })}
      >
        {heading}
      </Heading>
    </Container>
    {children}
  </Container>
);
TripPageSectionWrapper.propTypes = TripPageSectionWrapperProps;
