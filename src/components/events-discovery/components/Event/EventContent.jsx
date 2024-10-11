import React, { useId, useMemo, useState } from 'react';
import { DateTime } from 'luxon';
import { MenuItem, Select } from '@mui/material';
import {
  CalendarIcon,
  LocationMarkerIcon,
  GlobeIcon,
} from '@heroicons/react/outline';
import { SrOnlyText } from '../../../accessibility/SrOnlyText';
import HeroIcon from '../../../simple/heroIcon';
import { Heading } from '../../../simple/Heading';

/**
 * @typedef {object} Props
 * @property {DateTime} start
 * @property {DateTime} end
 * @property {string} [eventTimezone]
 * @property {string} [location]
 * @property {string} [city]
 * @property {string} [region]
 * @property {string[]} [subject]
 * @property {number} [subjectHeadingLevel]
 * @property {boolean} [localTimezoneOnly]
 */

/**
 * @type {React.FC<Props>}
 * @returns {React.ReactElement}
 */
export const EventContent = ({
  start,
  end,
  eventTimezone: rawEventTimezone,
  location = '',
  city = '',
  region = '',
  subject = [],
  subjectHeadingLevel = 4,
  localTimezoneOnly = false,
}) => {
  const uniqueId = useId();

  // IANA time zone identifier format
  const eventTimezone = rawEventTimezone || 'America/Los_Angeles';
  const [selectedTimezone, setSelectedTimezone] = useState(eventTimezone);

  // Time zone info for the event
  const {
    zoneName: eventTimezoneName,
    offsetNameShort: eventTimezoneDisplay,
    offset: eventOffset,
  } = DateTime.now().setZone(eventTimezone);

  // Time zone info reported by the user's local system
  const {
    zoneName: localTimezoneName,
    offsetNameShort: localTimezoneDisplay,
    offset: localOffset,
  } = DateTime.local();

  const isEventLocal = useMemo(
    () => localTimezoneOnly || eventTimezoneDisplay === localTimezoneDisplay,
    [localTimezoneOnly, eventTimezoneDisplay, localTimezoneDisplay]
  );

  // Different time zones can have the same offset
  const isOffsetSame = useMemo(
    () => localOffset === eventOffset,
    [localOffset, eventOffset]
  );

  const eventStart = useMemo(
    () => start?.setZone(eventTimezone),
    [start, eventTimezone]
  );
  const selectedStart = useMemo(
    () => start?.setZone(selectedTimezone),
    [start, selectedTimezone]
  );

  const eventEnd = useMemo(
    () => end?.setZone(eventTimezone),
    [end, eventTimezone]
  );
  const selectedEnd = useMemo(
    () => end?.setZone(selectedTimezone),
    [end, selectedTimezone]
  );

  const longStartDate = useMemo(
    () => selectedStart?.toFormat('DDDD'),
    [selectedStart]
  );
  const longEndDate = useMemo(
    () => selectedEnd?.toFormat('DDDD'),
    [selectedEnd]
  );

  const isSingleDay = useMemo(
    () => eventStart.hasSame(eventEnd, 'day'),
    [eventStart, eventEnd]
  );

  const startDaysOffset = useMemo(() => {
    const eventStartDate = DateTime.fromISO(eventStart.toISODate());
    const selectedStartDate = DateTime.fromISO(selectedStart.toISODate());

    return selectedStartDate.diff(eventStartDate, 'days').get('days');
  }, [selectedStart, eventStart]);

  const startDaysOffestDisplay = useMemo(() => {
    if (!startDaysOffset) {
      return '';
    }

    const suffix = Math.abs(startDaysOffset) === 1 ? ' day' : ' days';
    const prefix = startDaysOffset > 0 ? '+' : '';

    return `${prefix}${startDaysOffset}${suffix}`;
  }, [startDaysOffset]);

  const endDaysOffset = useMemo(() => {
    const eventEndDate = DateTime.fromISO(eventEnd.toISODate());
    const selectedEndDate = DateTime.fromISO(selectedEnd.toISODate());

    return selectedEndDate.diff(eventEndDate, 'days').get('days');
  }, [eventEnd, selectedEnd]);

  const endDaysOffsetDisplay = useMemo(() => {
    if (!endDaysOffset) {
      return '';
    }

    const suffix = Math.abs(endDaysOffset) === 1 ? ' day' : ' days';
    const prefix = endDaysOffset > 0 ? '+' : '';

    return `${prefix}${endDaysOffset}${suffix}`;
  }, [endDaysOffset]);

  const startTime = useMemo(
    () =>
      startDaysOffestDisplay
        ? `${selectedStart?.toFormat('t')} (${startDaysOffestDisplay})`
        : selectedStart?.toFormat('t'),
    [startDaysOffestDisplay, selectedStart]
  );
  const endTime = useMemo(
    () =>
      endDaysOffsetDisplay
        ? `${selectedEnd?.toFormat('t')} (${endDaysOffsetDisplay})`
        : selectedEnd?.toFormat('t'),
    [endDaysOffsetDisplay, selectedEnd]
  );

  const selectRootClasses =
    '!su-relative !su-font-sans !su-ml-4 !su-border-b-2 !su-border-transparent hocus:!su-border-digital-red-light focus-within:!su-border-digital-red-light focus-within:su-ring focus-within:su-ring-digital-blue-light focus-within:su-ring-offset-1 before:!su-hidden after:!su-hidden';
  const selectClasses =
    '!su-relative !su-z-[1] !su-text-19 !su-leading-normal !su-py-0 !su-pl-0 !su-pr-20 hocus:!su-bg-transparent !su-outline-none !su-border-none';
  const selectMenuRootClasses = '!su-text-16';
  const selectMenuSelectedClasses = '!su-bg-digital-red-light/10';
  const iconClasses =
    'su-inline-block su-shrink-0 su-mt-2 md:su-mt-3 su-mr-06em su-w-1em';

  return (
    <div className="event-card-details su-text-19 su-leading-snug">
      <ul className="su-list-none su-m-0 su-p-0">
        <li className="su-flex su-mb-04em su-leading-snug">
          <CalendarIcon className={iconClasses} aria-hidden="true" />
          <SrOnlyText>Date: </SrOnlyText>
          {!!start && !!end && (
            <span>
              {!isSingleDay && `${longStartDate} to ${longEndDate}`}
              {isSingleDay && `${startTime} - ${endTime} `}
              {isSingleDay && isEventLocal && (
                <span className="su-ml-4">{eventTimezoneDisplay}</span>
              )}
              {isSingleDay && !isEventLocal && isOffsetSame && (
                <span className="su-ml-4">
                  {eventTimezoneDisplay}/{localTimezoneDisplay}
                </span>
              )}
              {isSingleDay && !isEventLocal && !isOffsetSame && (
                <>
                  <label
                    id={`timezone-${uniqueId}`}
                    htmlFor={`timezone-select-${uniqueId}`}
                    className="su-sr-only"
                  >
                    Time zone
                  </label>
                  <Select
                    id={`timezone-select-${uniqueId}`}
                    labelId={`timezone-${uniqueId}`}
                    variant="standard"
                    renderValue={(v) =>
                      DateTime.now().setZone(v).offsetNameShort
                    }
                    value={selectedTimezone}
                    onChange={(e) => setSelectedTimezone(e.target.value)}
                    classes={{
                      root: selectRootClasses,
                      select: selectClasses,
                    }}
                    IconComponent={() => (
                      <HeroIcon
                        iconType="chevron-down"
                        className="su-absolute su-right-0 su-z-0 su-shrink-0 !su-w-18 !su-h-18 su-text-digital-red-light"
                      />
                    )}
                  >
                    <MenuItem
                      classes={{
                        root: selectMenuRootClasses,
                        selected: selectMenuSelectedClasses,
                      }}
                      value={eventTimezoneName}
                    >
                      {eventTimezoneDisplay} (event time zone)
                    </MenuItem>
                    <MenuItem
                      classes={{
                        root: selectMenuRootClasses,
                        selected: selectMenuSelectedClasses,
                      }}
                      value={localTimezoneName}
                    >
                      {localTimezoneDisplay} (your time zone)
                    </MenuItem>
                  </Select>
                </>
              )}
            </span>
          )}
        </li>
        {(location || city) && (
          <li className="su-flex su-mb-04em su-leading-snug">
            <LocationMarkerIcon className={iconClasses} aria-hidden="true" />
            <span className="su-flex su-flex-col">
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
            </span>
          </li>
        )}
        {region && (
          <li className="su-flex su-mb-04em su-leading-snug">
            <GlobeIcon className={iconClasses} aria-hidden="true" />
            <SrOnlyText>Region: </SrOnlyText>
            <span>{region}</span>
          </li>
        )}
      </ul>
      {!!subject?.length && (
        <div className="su-flex su-items-center su-mb-04em su-mt-20">
          {!subjectHeadingLevel ||
          subjectHeadingLevel < 2 ||
          subjectHeadingLevel > 6 ? (
            <SrOnlyText>Subjects:</SrOnlyText>
          ) : (
            <Heading level={subjectHeadingLevel} className="su-sr-only">
              Subjects
            </Heading>
          )}
          <ul className="su-list-none su-m-0 su-p-0 su-flex su-flex-row su-flex-wrap su-gap-4">
            {subject.map((tag) => (
              <li
                key={tag}
                className="su-border su-border-black su-m-0 su-px-18 su-py-2 su-rounded-2xl su-leading-snug"
              >
                {tag.trim()}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
