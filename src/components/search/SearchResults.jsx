/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import sanitize from 'sanitize-html';
import { useLocation } from '@reach/router';
import { useHits, useInstantSearch } from 'react-instantsearch';
import { DateTime } from 'luxon';
import { Skeleton } from '@mui/material';
import { Heading } from '../simple/Heading';
import HeroIcon from '../simple/heroIcon';
import { utmParams } from '../../utilities/utmParams';

/**
 * UTM Parameters
 * @param {*} url
 * @param {*} utms
 * @returns
 */
const checkParams = (url, utms) => {
  let linkUrl = url;
  if (linkUrl.match(/\?/) && utms.length) {
    linkUrl += `&${utms}`;
  } else if (utms.length) {
    linkUrl += `?${utms}`;
  }
  return linkUrl;
};

/**
 * Main component
 * @returns Main Search Results
 */
const SearchResults = () => {
  const { results, items } = useHits();
  const { status } = useInstantSearch();

  // Show loading.
  if (status === 'loading') {
    return (
      <div>
        <Skeleton variant="rectangular" className="su-my-3" height={35} />;
        <Skeleton variant="rectangular" className="su-my-3" height={35} />;
        <Skeleton variant="rectangular" className="su-my-3" height={35} />;
        <Skeleton variant="rectangular" className="su-my-3" height={35} />;
        <Skeleton variant="rectangular" className="su-my-3" height={35} />;
        <Skeleton variant="rectangular" className="su-my-3" height={35} />;
        <Skeleton variant="rectangular" className="su-my-3" height={35} />;
        <Skeleton variant="rectangular" className="su-my-3" height={35} />;
      </div>
    );
  }

  // No Results.
  if (!results || !results.nbHits) {
    return null;
  }

  return (
    <div id="search-results">
      <div
        className="su-text-21 lg:su-mb-40"
        aria-live="polite"
        aria-atomic="true"
        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
        tabIndex={0}
        id="number-search-results"
      >
        <span className="su-font-semibold">{results.nbHits}</span> results:
      </div>
      {items.map((result) => {
        switch (result.type) {
          case 'alumni-event': {
            return (
              <SearchResultAlumniEvent result={result} key={result.objectID} />
            );
          }
          default: {
            return (
              <SearchResultDefault result={result} key={result.objectID} />
            );
          }
        }
      })}
    </div>
  );
};
export default SearchResults;

/**
 * Alumni Event {Hit}
 * @param {*} result
 * @returns
 */
const SearchResultAlumniEvent = ({ result }) => {
  const routerLocation = useLocation();
  const utms = utmParams(routerLocation.search);

  const {
    objectID,
    domain,
    url,
    title,
    _snippetResult,
    start,
    end,
    timeZone,
    location,
    city,
    country,
  } = result;

  // Format the location string.
  // The format should be "location, city, country"
  const formattedLocation = () => {
    const locationArray = [location, city, country];
    return locationArray.filter((loc) => loc).join(', ');
  };

  // Time of events.
  const startTime = DateTime.fromISO(start).setZone(timeZone);
  const endTime = DateTime.fromISO(end).setZone(timeZone);
  // Format a date and time span string between start and end times in the formats of
  // If the start and end date and times are the same use this format
  // "Friday, October 8, 2021 8:00 AM PDT"
  // If the start and end date are the same but the times are different use this format
  // "Friday, October 8, 2021 8:00 AM - 10:00 AM PDT"
  // If the start and end date are different use this format
  // "October 8, 2021 8:00 AM - October 9, 2021 10:00 AM PDT"
  const formattedDateTimeSpan = () => {
    if (startTime.hasSame(endTime, 'day')) {
      if (startTime.hasSame(endTime, 'minute')) {
        return `${startTime.toFormat('EEEE, LLLL d, yyyy h:mm a ZZZZ')}`;
      }
      return `${startTime.toFormat(
        'EEEE, LLLL d, yyyy h:mm a ZZZZ'
      )} - ${endTime.toFormat('h:mm a ZZZZ')}`;
    }
    return `${startTime.toFormat(
      'LLLL d, yyyy h:mm a ZZZZ'
    )} - ${endTime.toFormat('LLLL d, yyyy h:mm a ZZZZ')}`;
  };

  return (
    <div
      key={objectID}
      className="su-px-0 su-rs-py-2 md:su-rs-px-2 su-border-b su-border-black-40"
    >
      <div className="su-flex su-flex-wrap md:su-flex-nowrap">
        <div className="md:su-flex-1 su-w-full">
          <div className="su-text-16 su-mb-10">{domain}</div>
          <Heading level={3} size={1} font="serif">
            <a
              className="su-text-digital-red-light su-group su-transition-colors hocus:su-underline"
              href={checkParams(url, utms)}
            >
              <span
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{
                  // eslint-disable-next-line no-underscore-dangle
                  __html: sanitize(title, {
                    decodeEntities: false,
                  }),
                }}
              />
              <HeroIcon
                iconType={
                  domain.match(/^alumni.stanford.edu/)
                    ? 'arrow-right'
                    : 'external'
                }
                className="su-inline-block group-hocus:su-text-cardinal-red"
                isAnimate
                srText={
                  domain.match(/^alumni.stanford.edu/) ? '' : ' (external link)'
                }
              />
            </a>
          </Heading>
          {start && end && (
            <p className="su-card-paragraph su-leading-snug su-mb-0">
              <span className="su-font-semibold">When: </span>
              {formattedDateTimeSpan()}{' '}
            </p>
          )}

          <p className="su-card-paragraph su-leading-snug">
            <span className="su-font-semibold">Where: </span>
            {formattedLocation()}
          </p>

          {/* eslint-disable-next-line no-underscore-dangle */}
          {_snippetResult?.body.value && (
            <p
              className="su-card-paragraph su-leading-snug su-mb-0"
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{
                // eslint-disable-next-line no-underscore-dangle
                __html: sanitize(_snippetResult.body.value, {
                  allowedTags: ['br', 'mark', 'i', 'b'],
                }),
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

/**
 * Default {Hit}
 * @param {*} result
 * @returns
 */
const SearchResultDefault = ({ result }) => {
  const location = useLocation();
  const utms = utmParams(location.search);

  const { objectID, domain, url, fileType, title, image, _snippetResult } =
    result;

  return (
    <div
      key={objectID}
      className="su-px-0 su-rs-py-2 md:su-rs-px-2 su-border-b su-border-black-40"
    >
      <div className="su-flex su-flex-wrap md:su-flex-nowrap">
        <div className="md:su-flex-1 su-w-full">
          <div className="su-text-16 su-mb-10">{domain}</div>
          <Heading level={3} size={1} font="serif">
            <a
              className="su-text-digital-red-light su-group su-transition-colors hocus:su-underline"
              href={checkParams(url, utms)}
            >
              {fileType === 'video' && (
                <HeroIcon
                  iconType="video"
                  className="su-inline-block su-mr-02em"
                  srText="Video: "
                />
              )}
              {fileType === 'audio' && (
                <HeroIcon
                  iconType="podcast"
                  className="su-inline-block su-ml-01em"
                  srText="Podcast: "
                />
              )}
              <span
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{
                  // eslint-disable-next-line no-underscore-dangle
                  __html: sanitize(title, {
                    decodeEntities: false,
                  }),
                }}
              />
              <HeroIcon
                iconType={
                  domain.match(/^alumni.stanford.edu/)
                    ? 'arrow-right'
                    : 'external'
                }
                className="su-inline-block group-hocus:su-text-cardinal-red"
                isAnimate
                srText={
                  domain.match(/^alumni.stanford.edu/) ? '' : ' (external link)'
                }
              />
            </a>
          </Heading>
          {/* eslint-disable-next-line no-underscore-dangle */}
          {_snippetResult?.body.value && (
            <p
              className="su-card-paragraph su-leading-snug su-mb-0"
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{
                // eslint-disable-next-line no-underscore-dangle
                __html: sanitize(_snippetResult.body.value, {
                  allowedTags: ['br', 'mark', 'i', 'b'],
                }),
              }}
            />
          )}
        </div>
        {image && (
          <div className="su-rs-mt-0 su-w-150 su-h-100 md:su-w-[22.5rem] md:su-h-150 md:su-ml-30">
            <img
              className="su-block su-object-cover su-object-center su-h-full su-w-full"
              src={image}
              alt={title}
              loading="lazy"
            />
          </div>
        )}
      </div>
    </div>
  );
};
