import React from 'react';
import PropTypes from 'prop-types';
import { dcnb } from 'cnbuilder';
import * as styles from './StanfordLogo.styles';
import { ClassNameType } from '../../../types/CommonType';

export const StanfordLogoProps = {
  type: PropTypes.oneOf(['full', 'short', 'stacked']),
  color: PropTypes.oneOf(['cardinal-red', 'black', 'white']),
  isLink: PropTypes.bool,
  className: ClassNameType,
};

export const StanfordLogo = ({
  type = 'short',
  color = 'white',
  isLink = true,
  className,
}) => {
  let logoText;

  switch (type) {
    case 'full':
      logoText = 'Stanford University';
      break;

    case 'stacked':
      logoText = (
        <>
          Stanford
          <br />
          University
        </>
      );
      break;

    case 'short':
    default:
      logoText = 'Stanford';
      break;
  }

  if (isLink) {
    return (
      <a
        className={dcnb('su-logo', styles.logoColor({ color }), className)}
        href="https://www.stanford.edu"
      >
        {logoText}
      </a>
    );
  }

  return (
    <div className={dcnb('su-logo', styles.logoColor({ color }), className)}>
      {logoText}
    </div>
  );
};
StanfordLogo.propTypes = StanfordLogoProps;
