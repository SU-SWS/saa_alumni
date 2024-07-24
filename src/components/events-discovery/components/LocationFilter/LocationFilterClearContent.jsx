import React from 'react';
import { useCurrentRefinements } from 'react-instantsearch';
import { Chip } from '../Chips/Chip';
import useRadialGeoSearch from './useRadialGeoSearch';

const LocationFilterClearContent = ({ activeTab }) => {
  const { items } = useCurrentRefinements({
    includedAttributes: ['state', 'country'],
  });
  const { name: locationName, clearRefinements } = useRadialGeoSearch();

  console.log('LocationFilterClearContent', locationName);

  let attribute = '';
  let removeChip = () => null;
  let facetLabel = '';

  // Extract info from the active refinement.
  if (items.length > 0) {
    const item = items.pop();
    ({ attribute } = item);
    const refinement = item.refinements.pop();
    facetLabel = refinement.label;
    removeChip = () => item.refine(refinement);
  }

  if (locationName) {
    facetLabel = locationName;
    attribute = 'city';
    removeChip = () => clearRefinements();
  }

  // Could find the attribute.
  if (!attribute) {
    return null;
  }

  // Set up the text.
  let ClearContentFirstText = '';
  let ClearContentSecondText = '';

  if (activeTab === 'city') {
    ClearContentSecondText = 'Then you can search by city.';
  }

  if (activeTab === 'state') {
    ClearContentSecondText =
      'Then you can search by US State / Canadian Province.';
  }

  if (activeTab === 'country') {
    ClearContentSecondText = 'Then you can search by country.';
  }

  if (attribute === 'city') {
    ClearContentFirstText = 'First, clear your city search.';
  }

  if (attribute === 'state') {
    ClearContentFirstText =
      'First, clear your US State / Canadian Province search.';
  }

  if (attribute === 'country') {
    ClearContentFirstText = 'First, clear your country search.';
  }

  return (
    <div
      className="flex flex-col text-center rs-mt-2"
      data-test="location-facet-clear"
    >
      <p>{ClearContentFirstText}</p>
      <p>{ClearContentSecondText}</p>
      <div>
        <Chip attribute={attribute} label={facetLabel} remove={removeChip} />
      </div>
    </div>
  );
};

export default LocationFilterClearContent;
