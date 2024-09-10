/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import sanitize from 'sanitize-html';
import { useLocation } from '@reach/router';
import { useHits } from 'react-instantsearch';
import { DateTime } from 'luxon';
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

  // No Results.
  if (!items) {
    return <div />;
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
            return <SearchResultAlumniEvent result={result} />;
          }
          default: {
            return <SearchResultDefault result={result} />;
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
    format,
    region,
    address,
    country,
    subject,
    experience,
  } = result;

  const timeZoneShort = DateTime.local().setZone(timeZone).toFormat('ZZZZ');
  const formattedStart = DateTime.fromISO(start)
    .setZone(timeZone)
    .toFormat('cccc, LLLL d, yyyy');
  const formattedEnd = DateTime.fromISO(end)
    .setZone(timeZone)
    .toFormat('cccc, LLLL d, yyyy');

  // Format a date and time span string between start and end times in the format of
  // "Friday, October 8, 2021 8:00 AM - 9:00 AM PDT"
  // If the start and end dates are the same, only show the start date.
  // If the start and end times are the same, only show the date.
  // If the start and end dates are different, show both dates.
  // If the start and end times are different, show both times.
  // If the start and end dates and times are different, show both dates and times.
  const formattedDateTimeSpan = () => {
    if (start === end) {
      return formattedStart;
    }
    if (formattedStart === formattedEnd) {
      return `${formattedStart} ${DateTime.fromISO(start)
        .setZone(timeZone)
        .toFormat('h:mm a')} - ${DateTime.fromISO(end)
        .setZone(timeZone)
        .toFormat('h:mm a')} ${timeZoneShort}`;
    }
    return `${formattedStart} ${DateTime.fromISO(start)
      .setZone(timeZone)
      .toFormat('h:mm a')} - ${formattedEnd} ${DateTime.fromISO(end)
      .setZone(timeZone)
      .toFormat('h:mm a')} ${timeZoneShort} `;
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
            <p>
              <span className="su-leading-1">
                When: {formattedDateTimeSpan()}{' '}
              </span>
            </p>
          )}
          {location && (
            <p>
              <span className="su-leading-1">Where:</span>
              {location}
            </p>
          )}
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
