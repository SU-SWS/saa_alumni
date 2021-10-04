import React from 'react';
import { FlexBox, Heading, SrOnlyText } from 'decanter-react';
import PropTypes from 'prop-types';
import { dcnb } from 'cnbuilder';
import SbLink from '../../../utilities/sbLink';
import CardImage from '../../media/cardImage';
import TabLabel from '../../simple/tabLabel';
import { largeMarginBottom } from '../../../utilities/dataSource';
import HeroIcon from '../../simple/heroIcon';
import * as styles from './GradientCard.styles';
import { SBLinkType } from '../../../types/storyblok/SBLinkType';

export const GradientCardProps = {
  headline: PropTypes.string,
  description: PropTypes.string,
  link: SBLinkType,
  filename: PropTypes.string,
  focus: PropTypes.string,
  imageFocus: PropTypes.string,
  tabText: PropTypes.string,
  headingLevel: PropTypes.number,
  orientation: PropTypes.string,
  spacingBottom: PropTypes.string,
  isDark: PropTypes.bool,
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

const GradientCard = ({
  headline,
  headingLevel,
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
    <FlexBox
      direction="col"
      element="article"
      className={dcnb(
        styles.root({ orientation, isDark }),
        marginBottom,
        className
      )}
    >
      <div className={styles.imageWrapper({ orientation })} aria-hidden="true">
        {filename?.startsWith('http') && (
          <CardImage
            filename={filename}
            smartFocus={focus}
            imageFocus={imageFocus}
            className={styles.image}
            loading={orientation === 'horizontal' ? 'eager' : 'lazy'}
            size={orientation === 'horizontal' ? 'large_3x2' : 'vertical_3x2'}
            width={orientation === 'horizontal' ? '1200' : '600'}
            height={orientation === 'horizontal' ? '800' : '400'}
          />
        )}
        <div className={styles.gradient({ orientation })} aria-hidden="true" />
      </div>
      {tabText && <TabLabel text={tabText} aria-hidden />}
      <FlexBox
        direction="col"
        className={styles.contentWrapper({ orientation })}
      >
        <SbLink link={link} classes={styles.link({ orientation })}>
          <Heading
            level={headingLevel}
            font="serif"
            tracking="normal"
            className={styles.heading}
          >
            {tabText && <SrOnlyText srText={`${tabText}: `} />}
            {headline}
          </Heading>
          <HeroIcon
            iconType={link.linktype === 'url' ? 'external' : 'arrow-right'}
            className={styles.icon}
            isAnimate
          />
        </SbLink>
        <p className={styles.description({ orientation })}>{description}</p>
      </FlexBox>
    </FlexBox>
  );
};
GradientCard.propTypes = GradientCardProps;

export default GradientCard;
