import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Tabs from './Tabs';
import Results from './Results';

const Directory = () => {
  const [associatesData, setAssociatesData] = useState({});
  const [onlyNewMembers, setOnlyNewMembers] = useState(false);
  const [recentYear, setRecentYear] = useState(null);
  const [search, setSearch] = useState('');
  const [filteredList, setFilteredList] = useState([]);

  const filterResult = () => {
    const result = associatesData.list?.filter((person) => {
      const fullName = `${person.name.first} ${person.name.last}`;
      const isVisible =
        fullName.toLowerCase().includes(search.toLowerCase()) &&
        (!onlyNewMembers || person.yearAdded === recentYear);
      return isVisible;
    });
    setFilteredList(result);
  };

  const handleNewMembersToggle = (event) => {
    setOnlyNewMembers(event.target.checked);
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      axios
        .get('/api/contentful/associates')
        .then((response) => {
          setAssociatesData(response.data);

          const mostRecent = Math.max(
            ...response.data.list.map((person) => person.yearAdded || 0)
          );
          setRecentYear(mostRecent);
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.error(error);
        });
    };

    fetchData();
  }, []);

  useEffect(() => {
    filterResult();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onlyNewMembers, search]);

  return (
    <div className="su-mt-30">
      <div className="su-my-20">{associatesData.total} Associates Total</div>
      <div className="su-my-20">
        <input
          type="text"
          className="su-py-10 su-px-20 su-text-19 su-border su-border-solid su-border-black-40"
          placeholder="Search for a Name"
          value={search}
          onChange={handleSearch}
        />
      </div>
      <div className="su-mb-50">
        <label>
          <input
            type="checkbox"
            checked={onlyNewMembers}
            value={onlyNewMembers}
            onChange={handleNewMembersToggle}
            className="su-peer su-form-checkbox su-text-digital-red-light su-mr-10 su-w-[1.5rem] su-h-[1.5rem] su-cursor-pointer su-rounded su-border-black-40 hocus:su-border-none hocus:su-ring hocus:su-ring-digital-red-light hocus:su-ring-offset-0"
          />{' '}
          View Only New Members
        </label>
      </div>

      {search.length ? <Results filteredList={filteredList} /> : ''}

      {!search.length && (
        <Tabs
          groupedNames={associatesData.grouped || {}}
          onlyNewMembers={onlyNewMembers}
          recentYear={recentYear}
          search={search}
        />
      )}
    </div>
  );
};

export default Directory;
