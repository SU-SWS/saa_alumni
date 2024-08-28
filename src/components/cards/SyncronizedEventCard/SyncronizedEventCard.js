import React from 'react';
import PropTypes from 'prop-types';
import { dcnb } from 'cnbuilder';
import { FlexBox } from '../../layout/FlexBox';
import { Heading } from '../../simple/Heading';
import { SrOnlyText } from '../../accessibility/SrOnlyText';
import SbLink from '../../../utilities/sbLink';
import CardImage from '../../media/cardImage';
import TabLabel from '../../simple/tabLabel';
import { largeMarginBottom } from '../../../utilities/dataSource';
import HeroIcon from '../../simple/heroIcon';
import * as styles from './GradientCard.styles';
import { SBLinkType } from '../../../types/storyblok/SBLinkType';
import { HeadingLevelType } from '../../../types/HeadingLevelType';
import { ClassNameType } from '../../../types/CommonType';

export const SyncronizedEventCardProps = {
  headline: PropTypes.string,
  description: PropTypes.string,
  link: SBLinkType,
  filename: PropTypes.string,
  focus: PropTypes.string,
  imageFocus: PropTypes.string,
  tabText: PropTypes.string,
  headingLevel: HeadingLevelType,
  orientation: PropTypes.string,
  spacingBottom: PropTypes.string,
  isDark: PropTypes.bool,
  className: ClassNameType,
};

const SyncronizedEventCard = ({
  headline,
  headingLevel = 3,
  description,
  link,
  filename,
  focus,
  imageFocus,
  tabText,
  orientation,
  spacingBottom,
  isDark,
  className,
}) => {
  let marginBottom = '';

  // Horizontal card styles and options
  if (orientation === 'horizontal') {
    marginBottom = largeMarginBottom[spacingBottom] ?? largeMarginBottom.md;
  }

  return (
    <div>
      
    </div>
  );
};
SyncronizedEventCard.propTypes = SyncronizedEventCardProps;

export default SyncronizedEventCard;
