import SbEditable from 'storyblok-react';
import React from 'react';
import {
  CalendarIcon,
  LocationMarkerIcon,
  TagIcon,
} from '@heroicons/react/solid';
import { GlobeIcon } from '@heroicons/react/outline';
import { DateTime } from 'luxon';
import { dcnb } from 'cnbuilder';
import { Heading } from '../../simple/Heading';
import { FlexBox } from '../../layout/FlexBox';
import { SrOnlyText } from '../../accessibility/SrOnlyText';
import SbLink from '../../../utilities/sbLink';
import CardImage from '../../media/cardImage';
import DateBlockNew from '../../simple/dateBlockDiscovery';
import HeroIcon from '../../simple/heroIcon';

// THIS IS A STUB; COMPLETE THE OWL PLZ
const SynchronizedEvent = ({
  blok: {
    image: { filename, focus },
    title,
    start,
    end,
    eventUrl,
    location,
    city,
    region,
    subject,
    format,
    experience,
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
  const eventLink = eventUrl;

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
    'su-rs-py-3 su-bg-white su-border-b su-bg-clip-padding su-backface-hidden';

  // This border works well for our light background colors
  let borderColor = 'su-border-black-30/40';
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
      headlineIconColor = 'su-text-digital-red-light group-hocus:su-text-white';
    }
  }

  headlineIconStyles = dcnb(headlineIconStyles, headlineIconColor);

  let headlineSize = 'su-type-1';

  if (isBigHeadline) {
    headlineSize = 'su-type-2';
  }

  const iconClasses =
    'su-inline-block su-shrink-0 su-mt-2 md:su-mt-3 su-mr-06em su-w-1em';

  return (
    <SbEditable content={blok}>
      <FlexBox
        direction="col"
        as="article"
        className={dcnb(
          'event-card su-group su-relative su-overflow-hidden su-text-black su-break-words su-basefont-23 su-w-full',
          wrapperClasses,
          borderColor,
          textColor
        )}
      >
        <div className="su-flex su-flex-col sm:su-flex-row sm:su-space-x-20">
          <FlexBox direction="col" alignItems="center">
            <DateBlockNew
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
              className={isMinimal ? '' : 'su-z-10 su-rs-ml-1'}
            />
            {experience && (
              <div>
                <span className="su-text-black-50 su-text-14 su-pl-20">
                  {experience}
                </span>
              </div>
            )}
          </FlexBox>
          <div>
            {format && (
              <div className={dcnb('su-font-bold', headlinePadding)}>
                {format}
              </div>
            )}
            <SbLink
              link={eventLink}
              classes={dcnb(
                'su-stretched-link su-group su-z-20 su-rs-mt-0 su-mb-08em su-no-underline hocus:su-underline su-underline-offset-[3px] su-decoration-[0.12em] su-decoration-digital-red-xlight focus:su-outline-none',
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
                {!hideTab && (
                  <SrOnlyText>{`${tabText || 'Event'}: `}</SrOnlyText>
                )}
                {title}
              </Heading>
              <HeroIcon
                iconType="external"
                className={headlineIconStyles}
                isAnimate
              />
            </SbLink>

            <div
              className={dcnb(
                'event-card-details su-card-paragraph',
                detailsPadding
              )}
            >
              <FlexBox
                direction="row"
                alignItems="start"
                className="su-mb-04em"
              >
                <CalendarIcon className={iconClasses} aria-hidden="true" />
                <SrOnlyText>Date: </SrOnlyText>
                <span>
                  {!isSameDay && `${longStartDate} to ${longEndDate}`}
                  {isSameDay && ` ${startTime} - ${endTime} ${timeZone}`}
                </span>
              </FlexBox>
              {(location || city) && (
                <FlexBox
                  direction="row"
                  alignItems="start"
                  className="su-mb-04em"
                >
                  <LocationMarkerIcon
                    className={iconClasses}
                    aria-hidden="true"
                  />
                  <div className="su-flex su-flex-col">
                    {location && (
                      <>
                        <SrOnlyText>Location: </SrOnlyText>
                        <span>{location}</span>
                      </>
                    )}
                    {city && (
                      <>
                        <SrOnlyText>City: </SrOnlyText>
                        <span>{city}</span>
                      </>
                    )}
                  </div>
                </FlexBox>
              )}
              {region && (
                <FlexBox
                  direction="row"
                  alignItems="start"
                  className="su-mb-04em"
                >
                  <GlobeIcon className={iconClasses} aria-hidden="true" />
                  <SrOnlyText>Region: </SrOnlyText>
                  <span>{region}</span>
                </FlexBox>
              )}
              {subject && subject.length > 0 && (
                <FlexBox
                  direction="row"
                  alignItems="center"
                  className="su-mb-04em sm:su--ml-30 su-mt-20"
                >
                  <TagIcon className={iconClasses} aria-hidden="true" />
                  <SrOnlyText>Subjects: </SrOnlyText>
                  <div className="su-flex su-flex-row su-flex-wrap">
                    {subject.map((tag) => (
                      <div
                        key={tag}
                        className="su-border-2 su-border-black su-px-16 su-py-4 su-rounded-2xl su-mr-04em"
                      >
                        {tag.trim()}
                      </div>
                    ))}
                  </div>
                </FlexBox>
              )}
            </div>
          </div>
          {filename?.startsWith('http') && (
            <figure className="su-hidden xl:su-block su-shrink-0">
              <CardImage
                filename={filename}
                smartFocus={focus}
                size="vertical"
                className="su-transition-transform su-transform-gpu group-hocus-within:su-scale-[1.03]"
                loading="lazy"
                width="300"
                height="200"
              />
            </figure>
          )}
        </div>
      </FlexBox>
    </SbEditable>
  );
};
export default SynchronizedEvent;
