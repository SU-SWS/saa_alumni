/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import sanitize from 'sanitize-html';
import { useLocation } from '@reach/router';
import { Heading } from '../../simple/Heading';
import HeroIcon from '../../simple/heroIcon';
import { utmParams } from '../../../utilities/utmParams';
import { checkParams } from '../../../utilities/checkParams';
import { decodeHtmlEntities } from '../../../utilities/decodeHtmlEntities';
/**
 * Default {Hit}
 * @param {*} result
 * @returns
 */
const SearchResultDefault = ({ result }) => {
  const location = useLocation();
  const utms = utmParams(location.search);

  const { objectID, domain, url, fileType, title, image, _highlightResult } =
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
          {_highlightResult?.body.value && (
            <p
              className="su-card-paragraph su-leading-snug su-mb-0"
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{
                // eslint-disable-next-line no-underscore-dangle
                __html: sanitize(
                  decodeHtmlEntities(_highlightResult.body.value),
                  {
                    decodeEntities: false,
                    allowedTags: ['mark', 'i', 'b', 'em', 'strong', 'br'],
                  }
                ),
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

export default SearchResultDefault;
