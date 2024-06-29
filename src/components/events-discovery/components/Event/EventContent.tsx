import React, { useMemo } from 'react';
import { DateTime } from 'luxon';
import {
  CalendarIcon,
  LocationMarkerIcon,
  TagIcon,
} from '@heroicons/react/solid';
import { GlobeIcon } from '@heroicons/react/outline';
import { SrOnlyText } from '../../../accessibility/SrOnlyText';

export type EventContentProps = {
  start: DateTime;
  end: DateTime;
  location?: string;
  city?: string;
  region?: string;
  subject?: string[];
};

export const EventContent = ({
  start,
  end,
  location = '',
  city = '',
  region = '',
  subject = [],
}: EventContentProps) => {
  const ptStart = useMemo(() => start.setZone('America/Los_Angeles'), [start]);
  const timeZone = useMemo(() => ptStart.toFormat('ZZZZ'), [ptStart]);
  const longStartDate = useMemo(() => ptStart.toFormat('DDDD'), [ptStart]);
  const startTime = useMemo(() => ptStart.toFormat('t'), [ptStart]);

  const ptEnd = useMemo(() => end.setZone('America/Los_Angeles'), [end]);
  const longEndDate = useMemo(() => ptEnd.toFormat('DDDD'), [ptEnd]);
  const endTime = useMemo(() => ptEnd.toFormat('t'), [ptEnd]);

  const isSameDay = useMemo(() => longStartDate === longEndDate, [longStartDate, longEndDate]);

  const iconClasses =
    'su-inline-block su-shrink-0 su-mt-2 md:su-mt-3 su-mr-06em su-w-1em';

  return (
    <div className="event-card-details su-card-paragraph">
      <div className="su-flex su-mb-04em">
        <CalendarIcon className={iconClasses} aria-hidden="true" />
        <SrOnlyText>Date: </SrOnlyText>
        <span>
          {!isSameDay && `${longStartDate} to ${longEndDate}`}
          {isSameDay && ` ${startTime} - ${endTime} ${timeZone}`}
        </span>
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
        <div className="su-flex su-items-center su-mb-04em sm:su--ml-30 su-mt-20">
          <TagIcon className={iconClasses} aria-hidden="true" />
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
