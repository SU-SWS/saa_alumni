import React from 'react';
import InterstitialPage from '../components/page-types/formPage/interstitialPage';

class InterstitialFormPage extends React.Component {
  /**
   *
   * @param {*} props
   * @param {*} state
   * @returns
   */
  static getDerivedStateFromProps(props, state) {
    if (state.story.uuid === props.pageContext.story.uuid) {
      return null;
    }
    return InterstitialFormPage.prepareStory(props);
  }

  /**
   *
   * @param {*} props
   * @returns
   */
  static prepareStory(props) {
    const story = { ...props.pageContext.story };
    story.content = JSON.parse(story.content);
    return { story };
  }

  /**
   *
   * @param {*} props
   */
  constructor(props) {
    super(props);
    this.state = InterstitialFormPage.prepareStory(props);
  }

  /**
   *
   * @returns
   */
  render() {
    // eslint-disable-next-line react/destructuring-assignment
    const { content } = this.state.story;

    return (
      <>
        {React.createElement(InterstitialPage, {
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

export default InterstitialFormPage;
