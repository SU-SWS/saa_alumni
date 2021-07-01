import React from 'react'
import Modal from '../layout/modal'
import { Heading } from "decanter-react";

const SearchModal = ({isOpen, onClose}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div>
        <Heading
          font="serif"
          size={2}
          level={2}
          className="su-text-white su-text-center"
        >
          Hello, what can we help you find today?
        </Heading>
      </div>

    </Modal>
  )
}

export default SearchModal