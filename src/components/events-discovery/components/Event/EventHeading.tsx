import React from 'react';
import HeroIcon from '../../../simple/heroIcon';
import { Heading } from '../../../simple/Heading';
import SbLink from '../../../../utilities/sbLink';
import { SrOnlyText } from '../../../accessibility/SrOnlyText';
import { type EventLink } from '../../types';

export type EventHeadingProps = {
  headingLevel?: number;
  title: string;
  eventUrl: EventLink;
};

export const EventHeading = ({
  headingLevel = 3,
  title,
  eventUrl,
}: EventHeadingProps) => {
  const headlineIconStyles = 'su-relative su-inline-block su-text-digital-red-xlight';

  return (
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
      <SbLink
        link={eventUrl}
        classes="su-group su-text-black hocus:su-text-black hocus:su-underline su-underline-offset-[3px] su-decoration-[0.12em] su-decoration-digital-red-xlight focus:su-outline-none"
      >
        <SrOnlyText>Event</SrOnlyText>
        {title}
        <HeroIcon
          iconType="external"
          className={headlineIconStyles}
          srText={undefined}
          isAnimate
        />
      </SbLink>
    </Heading>
  );
};
