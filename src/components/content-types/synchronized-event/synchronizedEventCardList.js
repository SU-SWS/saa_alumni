import React from 'react';
import PropTypes from 'prop-types';
import SbEditable from 'storyblok-react';
import { SBLinkType } from '../../../types/storyblok/SBLinkType';
import { HeadingLevelType } from '../../../types/HeadingLevelType';
import { ClassNameType } from '../../../types/CommonType';
import { useEvents } from '../../../hooks/useEvents';
import { SynchronizedEventCard } from './synchronizedEventCard';
import CreateBloks from '../../../utilities/createBloks';

export const SynchronizedEventCardListProps = {
  headline: PropTypes.string,
  description: PropTypes.string,
  link: SBLinkType,
  filename: PropTypes.string,
  focus: PropTypes.string,
  imageFocus: PropTypes.string,
  tabText: PropTypes.string,
  headingLevel: HeadingLevelType,
  orientation: PropTypes.string,
  spacingBottom: PropTypes.string,
  isDark: PropTypes.bool,
  className: ClassNameType,
};

const SynchronizedEventCardList = ({
  blok: { numEventsShown, subjects, regions, formats, lastCard = [] },
  blok,
  orientation,
}) => {
  const hasLastCard = !!lastCard?.length;
  const events = useEvents({
    subjects,
    regions,
    formats,
    maxNumEvents: hasLastCard ? numEventsShown - 1 : numEventsShown,
  });

  if (!events?.length) {
    return null;
  }

  return (
    <SbEditable content={blok}>
      <div className="su-grid su-cc su-grid-cols-1 md:su-grid-cols-2 xl:su-grid-cols-3 su-justify-items-center su-items-stretch su-gap-y-xl md:su-gap-y-50 xl:su-gap-y-70 su-grid-gap">
        {events.map((event) => (
          <SynchronizedEventCard key={event.id} {...event.content} />
        ))}
        {hasLastCard && <CreateBloks blokSection={lastCard} />}
      </div>
    </SbEditable>
  );
};
SynchronizedEventCardList.propTypes = SynchronizedEventCardListProps;

export default SynchronizedEventCardList;
