import React from 'react';
import Components from '../components/components';

class StoryblokEntry extends React.Component {
  static getDerivedStateFromProps(props, state) {
    if (state.story.uuid === props.pageContext.story.uuid) {
      return null;
    }

    return StoryblokEntry.prepareStory(props);
  }

  static prepareStory(props) {
    const story = { ...props.pageContext.story };
    story.content = JSON.parse(story.content);

    return { story };
  }

  constructor(props) {
    super(props);

    this.state = StoryblokEntry.prepareStory(props);
  }

  render() {
    // eslint-disable-next-line react/destructuring-assignment
    const { content } = this.state.story;

    return (
      <>
        {React.createElement(Components(content.component), {
          // eslint-disable-next-line no-underscore-dangle
          key: content._uid,
          blok: content,
          // eslint-disable-next-line react/destructuring-assignment
          location: this.props.location,
        })}
      </>
    );
  }
}

export default StoryblokEntry;
