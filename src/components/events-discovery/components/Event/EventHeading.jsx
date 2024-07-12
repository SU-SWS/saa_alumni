import React from 'react';
import HeroIcon from '../../../simple/heroIcon';
import { Heading } from '../../../simple/Heading';
import SbLink from '../../../../utilities/sbLink';
import { SrOnlyText } from '../../../accessibility/SrOnlyText';
// eslint-disable-next-line no-unused-vars, import/extensions
import { EventLink } from '../../types';

/**
 * @typedef {object} Props
 * @property {number} [headingLevel]
 * @property {string} title
 * @property {EventLink} [eventUrl]
 */

/**
 * @type {React.FC<Props>}
 * @returns {React.ReactElement}
 */
export const EventHeading = ({ headingLevel = 3, title, eventUrl }) => (
  <Heading
    level={headingLevel}
    font="serif"
    tracking="normal"
    className="su-relative su-inline su-type-1 su-mb-16"
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
        classes="su-group su-text-black hocus:su-text-black hocus:su-underline su-underline-offset-[3px] su-decoration-[0.12em] su-decoration-digital-red-xlight focus:su-outline-none"
      >
        <SrOnlyText>Event</SrOnlyText>
        {title}
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
        {title}
      </div>
    )}
  </Heading>
);
