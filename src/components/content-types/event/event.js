import SbEditable from 'storyblok-react';
import React from 'react';
import {
  CalendarIcon,
  DesktopComputerIcon,
  LocationMarkerIcon,
  UserIcon,
} from '@heroicons/react/outline';
import { DateTime } from 'luxon';
import { dcnb } from 'cnbuilder';
import { Heading } from '../../simple/Heading';
import { FlexBox } from '../../layout/FlexBox';
import { SrOnlyText } from '../../accessibility/SrOnlyText';
import SbLink from '../../../utilities/sbLink';
import CardImage from '../../media/cardImage';
import TabLabel from '../../simple/tabLabel';
import DateBlock from '../../simple/dateBlock';
import HeroIcon from '../../simple/heroIcon';

const Event = ({
  blok: {
    image: { filename, focus } = {},
    imageFocus,
    title,
    start,
    end,
    location,
    isVirtual,
    organizer,
    externalUrl,
  },
  blok,
  isBigHeadline,
  isMinimal,
  headingLevel = 3,
  tabText,
  hideTab,
  isDark,
}) => {
  // Link to external URL (always external for MVP)
  const eventLink = { linktype: 'url', url: externalUrl } ?? '';

  // The date/time string we get from Storyblok is in UTC
  // Convert string to luxon DateTime object and format the pieces for display
  // Start date and time
  const luxonStart = DateTime.fromFormat(start, 'yyyy-MM-dd T', { zone: 'UTC' })
    .setZone('America/Los_Angeles')
    .setLocale('en-us');
  const timeZone = luxonStart.toFormat('ZZZZ');
  const longStartDate = luxonStart.toFormat('DDDD');
  const startTime = luxonStart.toFormat('t');
  const startMonth = luxonStart.toFormat('LLL');
  const startDay = luxonStart.toFormat('dd');

  // Valid datetime for HTML Time element
  const startHtmlDate = `${start}Z`;

  // End date and time
  const luxonEnd = DateTime.fromFormat(end, 'yyyy-MM-dd T', { zone: 'UTC' })
    .setZone('America/Los_Angeles')
    .setLocale('en-us');
  const longEndDate = luxonEnd.toFormat('DDDD');
  const endTime = luxonEnd.toFormat('t');
  const endMonth = luxonEnd.toFormat('LLL');
  const endDay = luxonEnd.toFormat('dd');
  const endHtmlDate = `${end}Z`;

  // Boolean to check if this is a same day event for conditional rendering elements
  const isSameDay = longStartDate === longEndDate;

  // Find current UTC date/time
  const currentUTCDate = new Date();
  const luxonCurrent = DateTime.fromJSDate(currentUTCDate);

  // If the current date/time is after the event end date/time, don't render the card
  if (luxonCurrent > luxonEnd) {
    return null;
  }

  let wrapperClasses =
    'su-rs-pb-3 su-bg-white su-border su-border-solid su-bg-clip-padding su-shadow-sm focus-within:su-shadow-md hover:su-shadow-md su-backface-hidden';

  // This border works well for our light background colors
  let borderColor = 'su-border-black-30-opacity-40';
  let headlinePadding = 'su-rs-px-2';
  let detailsPadding = 'su-rs-px-2';
  let headlineColor = 'su-text-black hocus:su-text-black';
  let headlineIconStyles = 'su-relative su-inline-block';
  let headlineIconColor = 'su-text-digital-red-xlight';
  let textColor = 'su-text-black';

  if (isDark) {
    borderColor = 'su-border-black-90';
  }

  if (isMinimal) {
    wrapperClasses = 'su-bg-transparent';
    headlinePadding = 'su-pt-01em';
    detailsPadding = '';

    // Use different text color if card has minimal style and is placed in a dark region
    if (isDark) {
      textColor = 'su-text-black-20';
      headlineColor = 'su-text-white hocus:su-text-white';
      headlineIconColor =
        'su-text-digital-red-light group-hover:su-text-white group-focus:su-text-white';
    }
  }

  headlineIconStyles = dcnb(headlineIconStyles, headlineIconColor);

  let headlineSize = 'su-type-1';

  if (isBigHeadline) {
    headlineSize = 'su-type-2';
  }

  const iconClasses =
    'su-inline-block su-flex-shrink-0 su-mt-2 md:su-mt-3 su-mr-06em su-w-[1em]';
  let locationIcon = (
    <LocationMarkerIcon className={iconClasses} aria-hidden="true" />
  );

  if (isVirtual) {
    locationIcon = (
      <DesktopComputerIcon className={iconClasses} aria-hidden="true" />
    );
  }

  return (
    <SbEditable content={blok}>
      <FlexBox
        direction="col"
        as="article"
        className={dcnb(
          'event-card su-group su-relative su-overflow-hidden sm:su-max-w-[42rem] md:su-max-w-full su-text-black su-break-words su-basefont-23 su-w-full',
          wrapperClasses,
          borderColor,
          textColor
        )}
      >
        {!isMinimal && (
          <div
            className="event-card-image-wrapper su-relative su-aspect-w-3 su-aspect-h-2"
            aria-hidden="true"
          >
            {filename?.startsWith('http') && (
              <figure className="su-overflow-hidden su-w-full su-h-full">
                <CardImage
                  filename={filename}
                  smartFocus={focus}
                  imageFocus={imageFocus}
                  size="vertical"
                  className="su-w-full su-h-full su-object-cover su-transition-transform su-transform-gpu group-hover:su-scale-[1.03] group-focus-within:su-scale-[1.03]"
                  loading="lazy"
                  width="600"
                  height="400"
                />
              </figure>
            )}
          </div>
        )}
        <DateBlock
          startMonth={startMonth}
          startDay={startDay}
          startHtmlDate={startHtmlDate}
          endMonth={endMonth}
          endDay={endDay}
          endHtmlDate={endHtmlDate}
          isSameDay={isSameDay}
          isMinimal={isMinimal}
          isDark={isDark}
          aria-hidden="true"
          className={
            isMinimal
              ? ''
              : 'su-mt-[-5.6rem] lg:su-mt-[-6.3rem] su-z-10 su-rs-ml-1'
          }
        />
        <SbLink
          link={eventLink}
          classes={dcnb(
            'su-stretched-link su-group su-z-20 su-rs-mt-0 su-mb-08em su-no-underline hocus:su-underline su-underline-offset !su-underline-thick !su-underline-digital-red-xlight',
            headlineSize,
            headlinePadding,
            headlineColor
          )}
        >
          <Heading
            level={headingLevel}
            font="serif"
            tracking="normal"
            className="su-relative su-inline su-type-0"
          >
            {!hideTab && <SrOnlyText>{`${tabText || 'Event'}: `}</SrOnlyText>}
            {title}
          </Heading>
          <HeroIcon
            iconType="external"
            className={headlineIconStyles}
            isAnimate
          />
        </SbLink>
        {!isMinimal && !hideTab && (
          <TabLabel text={tabText || 'Event'} aria-hidden="true" />
        )}
        <div
          className={dcnb(
            'event-card-details su-card-paragraph',
            detailsPadding
          )}
        >
          <FlexBox direction="row" alignItems="start" className="su-mb-04em">
            <CalendarIcon className={iconClasses} aria-hidden="true" />
            <SrOnlyText>Date: </SrOnlyText>
            <span>
              {longStartDate}
              {!isSameDay && ` - ${longEndDate}`}
              {isSameDay && ` | ${startTime} - ${endTime} ${timeZone}`}
            </span>
          </FlexBox>
          {location && (
            <FlexBox direction="row" alignItems="start" className="su-mb-04em">
              {locationIcon}
              <SrOnlyText>
                {isVirtual ? 'This event is virtual: ' : 'Location: '}
              </SrOnlyText>
              <span>{location}</span>
            </FlexBox>
          )}
          {organizer && (
            <FlexBox direction="row" alignItems="start" className="su-mb-04em">
              <UserIcon className={iconClasses} aria-hidden="true" />
              <span>Organizer | {organizer}</span>
            </FlexBox>
          )}
        </div>
      </FlexBox>
    </SbEditable>
  );
};
export default Event;
