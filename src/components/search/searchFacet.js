import React from 'react'

const SearchFacet = ({facetValues, attribute, selectedOptions, onChange}) => {
  const handleCheckboxChange = (e) => {
    const values = []
    const checkboxes = document.getElementsByName(e.target.name)
    for (const checkbox of checkboxes) {
      if (checkbox.checked) {
        values.push(checkbox.value)
      }
    }
    
    onChange(values)
  }
  return (
    <div>
      {Object.keys(facetValues).map((option) => {
        const count = facetValues[option]
        return (
          <label>
            <input 
              type="checkbox" 
              value={option} 
              name={attribute} 
              defaultChecked={selectedOptions.includes(option)} 
              onChange={(e) => handleCheckboxChange(e)}
            />
            <span>{option}</span>
            <span>{count}</span>
          </label>
        )
      })}
    </div>
  )
}

export default SearchFacet
