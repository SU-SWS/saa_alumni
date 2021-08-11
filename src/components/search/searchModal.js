import React, { useState } from "react";
import { Heading } from "decanter-react";
import { useStaticQuery, graphql, navigate } from "gatsby";
import Modal from "../layout/modal";
import SearchFieldModal from "./searchFieldModal";
import SearchSuggestions from "./searchSuggestions";

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

  if (data) {
    story = data.storyblokEntry;
    content = JSON.parse(story.content);
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
    >
      <div className="su-max-w-1000 su-mx-auto">
        <Heading
          font="serif"
          size={2}
          level={2}
          className="su-text-white su-text-center"
        >
          {!showEmptyMessage ? (
            <div>{content.introduction}</div>
          ) : (
            <div>{content.emptySearchMessage}</div>
          )}
        </Heading>
        <SearchFieldModal
          ref={searchFieldRef}
          emptySearch={showEmptyMessage}
          onSubmit={(queryText) => searchSubmit(queryText)}
        />
        {story && content && (
          <div className="su-mt-108">
            <SearchSuggestions blok={content} />
          </div>
        )}
      </div>
    </Modal>
  );
};

export default SearchModal;
