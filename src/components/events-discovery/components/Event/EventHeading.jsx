import React from 'react';
import { Highlight } from 'react-instantsearch';
import { dcnb } from 'cnbuilder';
import HeroIcon from '../../../simple/heroIcon';
import { Heading } from '../../../simple/Heading';
import SbLink from '../../../../utilities/sbLink';
import { SrOnlyText } from '../../../accessibility/SrOnlyText';
// eslint-disable-next-line no-unused-vars, import/extensions
import { EventLink, EventHit } from '../../types';

/**
 * @typedef {object} Props
 * @property {number} [headingLevel]
 * @property {string} title
 * @property {EventLink} [eventUrl]
 * @property {boolean} [stretchLink]
 * @property {EventHit} [hit]
 */

/**
 * @type {React.FC<Props>}
 * @returns {React.ReactElement}
 */
export const EventHeading = ({
  headingLevel = 3,
  title,
  eventUrl,
  stretchLink = false,
  hit,
}) => (
  <Heading
    level={headingLevel}
    font="serif"
    tracking="normal"
    className="su-inline su-type-1 su-mb-16"
    size={undefined}
    align={undefined}
    id={undefined}
    uppercase={undefined}
    italic={undefined}
    srOnly={undefined}
  >
    {eventUrl ? (
      <SbLink
        link={eventUrl}
        classes={dcnb(
          'su-group su-text-black hocus:su-text-black hocus:su-underline su-underline-offset-[3px] su-decoration-[0.12em] su-decoration-digital-red-xlight focus:su-outline-none',
          {
            'su-stretched-link': stretchLink,
          }
        )}
      >
        <SrOnlyText>Event</SrOnlyText>
        {hit ? <Highlight attribute="title" hit={hit} /> : title}
        <HeroIcon
          iconType="external"
          className="su-relative su-inline-block su-text-digital-red-xlight"
          srText={undefined}
          isAnimate
        />
      </SbLink>
    ) : (
      <div className="su-text-black">
        <SrOnlyText>Event</SrOnlyText>
        {hit ? <Highlight attribute="title" hit={hit} /> : title}
      </div>
    )}
  </Heading>
);
