import React from "react";
import { Heading } from "decanter-react";
import Modal from "../layout/modal";
import SearchFieldModal from "./searchFieldModal";

const SearchModal = ({ isOpen, onClose }) => {
  const searchFieldRef = React.createRef();

  return (
    <Modal isOpen={isOpen} onClose={onClose} initialFocus={searchFieldRef}>
      <div className="su-max-w-1000 su-mx-auto">
        <Heading
          font="serif"
          size={2}
          level={2}
          className="su-text-white su-text-center"
        >
          Hello, what can we help you find today?
        </Heading>
        <SearchFieldModal ref={searchFieldRef} />
      </div>
    </Modal>
  );
};

export default SearchModal;
