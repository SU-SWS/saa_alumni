import React from 'react';
import { useCurrentRefinements } from 'react-instantsearch';
import { dcnb } from 'cnbuilder';
import { Chip } from '../Chips/Chip';
import useRadialGeoSearch from '../../../../hooks/useRadialGeoSearch';

const LocationFilterClearContent = ({ activeTab, className }) => {
  const { items } = useCurrentRefinements({
    includedAttributes: ['state', 'country'],
  });
  const { name: locationName, clearRefinements } = useRadialGeoSearch();

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
      className={dcnb(
        'su-flex su-flex-col su-text-center su-rs-mt-2',
        className
      )}
      data-test="location-facet-clear"
    >
      <p className="su-font-sans su-font-semibold su-text-black-70 su-text-18 su-leading-[1.3]">
        {ClearContentFirstText}
      </p>
      <p className="su-font-sans su-font-regular su-text-black-70 su-text-18 su-leading-[1.3]">
        {ClearContentSecondText}
      </p>
      <div className="su-flex su-justify-center">
        <Chip attribute={attribute} label={facetLabel} remove={removeChip} />
      </div>
    </div>
  );
};

export default LocationFilterClearContent;
