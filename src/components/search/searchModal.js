import React, { useState } from 'react';
import { Heading } from 'decanter-react';
import { useStaticQuery, graphql, navigate } from 'gatsby';
import Modal from '../layout/modal';
import SearchFieldModal from './searchFieldModal';
import SearchSuggestions from './searchSuggestions';

const SearchModal = ({ isOpen, setIsOpen, onClose }) => {
  const searchFieldRef = React.createRef();
  const data = useStaticQuery(graphql`
    {
      storyblokEntry(
        full_slug: {
          eq: "search-configuration/search-modal/search-suggestions"
        }
      ) {
        field_title_string
        content
      }
    }
  `);

  let story;
  let content;
  let introduction;
  let emptySearchMessage;

  if (data && data?.storyblokEntry?.content) {
    story = data.storyblokEntry;
    content = JSON.parse(story.content);
    introduction = content.introduction;
    emptySearchMessage = content.emptySearchMessage;
  }

  const [showEmptyMessage, setShowEmptyMessage] = useState(false);
  const searchSubmit = (queryText) => {
    if (!queryText.length) {
      setShowEmptyMessage(true);
    } else {
      setShowEmptyMessage(false);
      navigate(`/search?q=${queryText}`);
      setIsOpen(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        onClose();
        setShowEmptyMessage(false);
      }}
      initialFocus={searchFieldRef}
      ariaLabel="Search Stanford Alumni websites"
    >
      <div className="su-max-w-1000 su-mx-auto">
        <Heading
          font="serif"
          size={3}
          level={2}
          className="su-text-white su-text-center su-rs-mt-5 su-mb-61 md:su-rs-mb-4"
          aria-label="Search Stanford Alumni websites"
        >
          {introduction}
        </Heading>
        <SearchFieldModal
          ref={searchFieldRef}
          emptySearch={showEmptyMessage}
          onSubmit={(queryText) => searchSubmit(queryText)}
        />
        {showEmptyMessage ? (
          <p className="su-text-m1 su-text-white su-font-serif su-font-bold su-rs-mt-2 su-mb-0">
            {emptySearchMessage}
          </p>
        ) : (
          ''
        )}
        {story && content && (
          <div>
            <SearchSuggestions blok={content} />
          </div>
        )}
      </div>
    </Modal>
  );
};

export default SearchModal;
