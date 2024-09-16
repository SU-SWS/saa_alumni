import React, { useId, useMemo, useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { DateTime } from 'luxon';
import { MenuItem, Select } from '@mui/material';
import {
  CalendarIcon,
  LocationMarkerIcon,
  GlobeIcon,
} from '@heroicons/react/outline';
import { SrOnlyText } from '../../../accessibility/SrOnlyText';
import HeroIcon from '../../../simple/heroIcon';

/**
 * @typedef {object} Props
 * @property {DateTime} start
 * @property {DateTime} end
 * @property {string} [eventTimezone]
 * @property {string} [location]
 * @property {string} [city]
 * @property {string} [region]
 * @property {string[]} [subject]
 */

/**
 * @type {React.FC<Props>}
 * @returns {React.ReactElement}
 */
export const EventContent = ({
  start,
  end,
  // Should we default to something else?
  eventTimezone = 'America/Los_Angeles',
  location = '',
  city = '',
  region = '',
  subject = [],
}) => {
  const uniqueId = useId();
  const [selectedTimezone, setSelectedTimezone] = useState(eventTimezone);

  const localTime = DateTime.local();
  const {
    zoneName: localTimezoneName,
    offsetNameShort: localTimezoneDisplay,
    offset: localOffset,
  } = localTime;

  const eventTime = localTime.setZone(eventTimezone);
  const {
    zoneName: eventTimezoneName,
    offsetNameShort: eventTimezoneDisplay,
    offset: eventOffset,
  } = eventTime;

  const isEventLocal = useMemo(
    () => eventTimezoneDisplay === localTimezoneDisplay,
    [eventTimezoneDisplay, localTimezoneDisplay]
  );

  const isOffsetSame = useMemo(
    () => localOffset === eventOffset,
    [localOffset, eventOffset]
  );

  const ptStart = useMemo(
    () => start?.setZone(selectedTimezone),
    [start, selectedTimezone]
  );
  const longStartDate = useMemo(() => ptStart?.toFormat('DDDD'), [ptStart]);
  const startTime = useMemo(() => ptStart?.toFormat('t'), [ptStart]);

  const ptEnd = useMemo(
    () => end?.setZone(selectedTimezone),
    [end, selectedTimezone]
  );
  const longEndDate = useMemo(() => ptEnd?.toFormat('DDDD'), [ptEnd]);
  const endTime = useMemo(() => ptEnd?.toFormat('t'), [ptEnd]);

  const isSameDay = useMemo(
    () => longStartDate === longEndDate,
    [longStartDate, longEndDate]
  );

  const selectRootClasses =
    '!su-relative !su-font-sans !su-ml-4 !su-border-b-2 !su-border-transparent hocus:!su-border-digital-red-light before:!su-hidden after:!su-hidden';
  const selectClasses =
    '!su-relative !su-z-[1] !su-text-19 !su-leading-normal !su-py-0 !su-pl-0 !su-pr-20 hocus:!su-bg-transparent !su-outline-none !su-border-none';
  const selectMenuRootClasses = '!su-text-16';
  const selectMenuSelectedClasses = '!su-bg-digital-red-light/10';
  const iconClasses =
    'su-inline-block su-shrink-0 su-mt-2 md:su-mt-3 su-mr-06em su-w-1em';

  return (
    <div className="event-card-details su-text-19 su-leading-snug su-lea">
      <div className="su-flex su-mb-04em">
        <CalendarIcon className={iconClasses} aria-hidden="true" />
        <SrOnlyText>Date: </SrOnlyText>
        {!!start && !!end && (
          <span>
            {!isSameDay && `${longStartDate} to ${longEndDate}`}
            {isSameDay && `${startTime} - ${endTime} `}
            {isSameDay && isEventLocal && (
              <span className="su-ml-4">{eventTimezoneDisplay}</span>
            )}
            {isSameDay && !isEventLocal && isOffsetSame && (
              <span className="su-ml-4">
                {eventTimezoneDisplay}/{localTimezoneDisplay}
              </span>
            )}
            {isSameDay && !isEventLocal && !isOffsetSame && (
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
                  renderValue={(v) => DateTime.now().setZone(v).offsetNameShort}
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
      </div>
      {(location || city) && (
        <div className="su-flex su-mb-04em">
          <LocationMarkerIcon className={iconClasses} aria-hidden="true" />
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
        </div>
      )}
      {region && (
        <div className="su-flex su-mb-04em">
          <GlobeIcon className={iconClasses} aria-hidden="true" />
          <SrOnlyText>Region: </SrOnlyText>
          <span>{region}</span>
        </div>
      )}
      {!!subject?.length && (
        <div className="su-flex su-items-center su-mb-04em su-mt-20">
          <SrOnlyText>Subjects: </SrOnlyText>
          <div className="su-flex su-flex-row su-flex-wrap su-gap-4">
            {subject.map((tag) => (
              <div
                key={tag}
                className="su-border su-border-black su-px-18 su-py-2 su-rounded-2xl"
              >
                {tag.trim()}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
