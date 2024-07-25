import SbEditable from 'storyblok-react';
import React from 'react';
import { Event } from '../../events-discovery/components/Event';
import { mergeEventOverrides } from '../../../utilities/synchronizedEvents';

// THIS COMPONENT IS ONLY FOR PREVIEW
const SynchronizedEvent = ({
  blok,
  isBigHeadline,
  isMinimal,
  headingLevel = 3,
  tabText,
  hideTab,
  isDark,
}) => {
  const {
    title,
    image,
    start,
    end,
    city,
    location,
    region,
    eventUrl,
    subject,
    experience,
    format,
  } = mergeEventOverrides(blok);

  return (
    <SbEditable content={blok}>
      <div className="su-cc">
        <Event
          title={title}
          image={image}
          start={start}
          end={end}
          city={city}
          location={location}
          region={region}
          eventUrl={eventUrl}
          subject={subject}
          experience={experience}
          format={format}
          isDark={isDark}
          isMinimal={isMinimal}
          isBigHeadline={isBigHeadline}
          headingLevel={headingLevel}
        />
      </div>
    </SbEditable>
  );
};
export default SynchronizedEvent;
