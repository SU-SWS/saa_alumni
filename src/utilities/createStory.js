import React from 'react';
import Components from '../components/components';

// Create reference to a story (entry) in Storyblok when using the single select option
// Useful for rendering global elements, e.g., global header

const CreateStory = ({ story, ...props }) => {
  if (story) {
    return React.createElement(Components(story.content.component), {
      // eslint-disable-next-line no-underscore-dangle
      key: story.content._uid,
      blok: story.content,
      storyLink: story.full_slug,
      ...props,
    });
  }

  // Return null if no content provided.
  return null;
};

export default CreateStory;
