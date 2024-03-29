import React from 'react';
import Components from '../components/components';

class StoryblokEntry extends React.Component {
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
    return StoryblokEntry.prepareStory(props);
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
    this.state = StoryblokEntry.prepareStory(props);
  }

  /**
   *
   * @returns
   */
  render() {
    const {
      story: { content },
    } = this.state;

    const { location, pageContext } = this.props;

    // Swap the page component for interstitial pages.
    if (pageContext.interstitial) {
      content.component = 'interstitialPage';
    }

    // Swap the page component for membership related contact interstitial page
    if (pageContext.membershipRelatedContact) {
      content.component = 'relatedContactSelection';
    }

    // Swap the page component for membership membership full payment form page.
    if (pageContext.membershipFullPayment) {
      content.component = 'membershipFullPaymentForm';
    }

    // Swap the page component for membership installments form page
    if (pageContext.membershipInstallments) {
      content.component = 'membershipInstallmentsForm';
    }

    return (
      <>
        {React.createElement(Components(content.component), {
          // eslint-disable-next-line no-underscore-dangle
          key: content._uid,
          blok: content,
          location,
          pageContext,
        })}
      </>
    );
  }
}

export default StoryblokEntry;
