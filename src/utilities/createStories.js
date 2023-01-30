import React from 'react';
import Components from '../components/components';

// Create references to stories (entries) in Storyblok
// Useful for rendering global elements, e.g., global footer, menus, that are used on multiple pages

const CreateStories = ({ stories, ...props }) => {
  let currStory;
  if (stories) {
    try {
      return stories.map((story) => {
        currStory = story;
        return React.createElement(Components(story.content.component), {
          // eslint-disable-next-line no-underscore-dangle
          key: story.content._uid,
          blok: story.content,
          storyLink: story.full_slug,
          ...props,
        });
      });
    } catch (error) {
      console.error('Could not create story', currStory);
    }
  }

  // Return null if no content provided.
  return null;
};

export default CreateStories;
