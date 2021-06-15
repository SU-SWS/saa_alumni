import React from 'react'

const SearchNoResults = ({query}) => {
  // TODO: Replace hard-coded markup with values from Storyblok.
  return (
    <div>
      <h2>We're sorry, we couldn't find results for "{query}"</h2>
      <div>Try checking your spelling and/or using more generic search terms. You may also find what you’re looking for using the site navigation at the top of the page.</div>
      
      <div>
        <h3>Consider browsing by category:</h3>
        <div>
          <strong>Popular Topics</strong>
          <ul>
            <li><a href='/'>Vite varius enim</a></li>
            <li><a href='/'>Vite varius enim</a></li>
            <li><a href='/'>Vite varius enim</a></li>
            <li><a href='/'>Vite varius enim</a></li>
            <li><a href='/'>Vite varius enim</a></li>
          </ul>
        </div>
        <div>
          <strong>Lorem ipsum dolar sit</strong>
          <ul>
            <li><a href='/'>Vite varius enim</a></li>
            <li><a href='/'>Vite varius enim</a></li>
            <li><a href='/'>Vite varius enim</a></li>
            <li><a href='/'>Vite varius enim</a></li>
            <li><a href='/'>Vite varius enim</a></li>
          </ul>
        </div>
      </div>
      <div>
        <div>Need additional assistance?</div>
        <div><strong>Call:</strong><a href="tel:5555555555">(555) 555-5555</a></div>
        <div><strong>Email:<a href="mailto:loremipsum@stanford.edu">loremipsum@stanford.edu</a></strong></div>
      </div>
    </div>
  )
}

export default SearchNoResults