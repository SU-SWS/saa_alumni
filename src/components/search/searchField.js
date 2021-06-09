import React, { useState } from 'react'
import { X } from 'react-hero-icon/solid'
import { Search } from 'react-hero-icon/solid'

const SearchField = ({onSubmit, onInput, autocompleteSuggestions}) => {
  const [query, setQuery] = useState("");
  const [showAutocomplete, setShowAutocomplete] = useState(false)
  const submitHandler = (e) => {
    e.preventDefault()
    onSubmit(query)
  }

  const inputHandler = async (e) => {
    setQuery(e.target.value)
    onInput(e.target.value)
  }

  const clearHandler = () => {
    setQuery('')
  }

  return (
    <div>
      <form onSubmit={submitHandler}>
        <div className="su-flex">
          <span className=""></span>
          <div className='su-border-b-[1px] su-items-end su-border-solid su-border-black-20 su-flex su-px-20 su-pb-3'>
            <label className="su-flex-grow su-max-w-full">
              <span className="su-sr-only">Search</span>
              <input type="text" onChange={inputHandler} className="su-text-23 su-w-full su-flex-1 su-outline-none" value={query} />
            </label>
            <button type="reset" onClick={clearHandler} className="su-bg-transparent hover:su-bg-transparent hover:su-text-black su-border-none su-text-black su-p-0">
              Clear <X className="su-inline-block"></X>
            </button>
            <div className={`su-absolute su-top-[4rem] su-bg-white su-px-20 su-py-20 su-shadow-md
              ${!showAutocomplete ? 'su-hidden' : ''}
            `}>
              {Array.isArray(autocompleteSuggestions) &&
                <ul className="su-list-unstyled">
                  {autocompleteSuggestions.map((suggestion, index) => (
                    <li key={`autocomplete-item-${index}`} className="hover:su-bg-black-20">{suggestion}</li>
                  ))}
                </ul>
              }
            </div>
          </div>
          <button type="submit" className="su-rounded-full su-bg-digital-red-light su-p-10 su-origin-center su-transform su-rotate-90 su-ml-10"><Search className="su-text-white"></Search></button>
        </div>
      </form>
    </div>
  )
}

export default SearchField