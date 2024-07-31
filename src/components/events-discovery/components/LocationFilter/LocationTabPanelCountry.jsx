import React, { useId, useContext } from 'react';
import { dcnb } from 'cnbuilder';
import MUIAutocomplete from '@mui/material/Autocomplete';
import MUITextField from '@mui/material/TextField';
import {
  useClearRefinements,
  useCurrentRefinements,
  useRefinementList,
} from 'react-instantsearch';
import { useMediaQuery } from '@mui/material';
import { LocationContext } from './LocationFacetProvider';
import * as styles from './LocationFilter.styles';
import HeroIcon from '../../../simple/heroIcon';
import LocationFilterClearContent from './LocationFilterClearContent';
import useRadialGeoSearch from '../../../../hooks/useRadialGeoSearch';
import { LocationListItem } from './LocationListItem';
import { config } from '../../../../utilities/config';

const LocationTabPanelCountry = () => {
  const { activeTab } = useContext(LocationContext);
  const searchFieldId = useId();
  const title = 'Find a country';
  const field = 'country';
  const { breakpoints } = config;
  const isDesktop = useMediaQuery(`(min-width: ${breakpoints.lg}px)`);

  const { name: locationName } = useRadialGeoSearch();
  const { items: stateItems } = useCurrentRefinements({
    includedAttributes: ['state'],
  });

  const { refine: clearRefinement } = useClearRefinements({
    includedAttributes: [field, 'state'],
  });
  const { items, refine } = useRefinementList({
    attribute: field,
    limit: 1000,
    sortBy: ['name:asc'],
  });

  const reformattedItems = items.map((item) => ({
    label: item.label,
    value: item.value,
  }));

  const { items: refinedItems } = useCurrentRefinements({
    includedAttributes: [field],
  });

  const selectedItem = refinedItems?.[0]?.refinements?.[0] ?? null;

  if (activeTab !== 'country') return null;

  // If the city or country tab is active, show the clear message and button.
  if (stateItems.length > 0 || locationName) {
    return (
      <LocationFilterClearContent
        activeTab={activeTab}
        className={dcnb(styles.tabPanel)}
      />
    );
  }

  return (
    <div
      id="country-panel"
      role="tabpanel"
      tabIndex={0}
      aria-labelledby="country-tab"
      className={dcnb(styles.tabPanel)}
    >
      <fieldset className={styles.fieldset} data-test={`${field}-facet`}>
        <legend className={dcnb(styles.locationLabels, styles.legend)}>
          Country
        </legend>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className={styles.locationWrapper}>
            <div className={styles.root}>
              <label className="su-sr-only" htmlFor={searchFieldId}>
                {title}
              </label>
              <MUIAutocomplete
                id={searchFieldId}
                multiple={false}
                autoSelect={false}
                options={reformattedItems}
                noOptionsText="No Results"
                value={selectedItem}
                isOptionEqualToValue={(option, value) =>
                  option.value === value.value
                }
                onChange={(_, value, reason) => {
                  if (reason === 'clear') {
                    clearRefinement();
                    return;
                  }

                  if (reason === 'selectOption') {
                    clearRefinement();
                    refine(value.value);
                  }
                }}
                renderInput={(props) => (
                  <MUITextField
                    {...props}
                    variant="standard"
                    label={title}
                    InputLabelProps={{
                      classes: {
                        root: 'su-font-sans !su-text-18 md:!su-text-21 lg:!su-hidden !su-pl-40',
                        focused: 'xs:!su-pl-0 xs:!su-ml-0',
                        filled: 'xs:!su-pl-0 xs:!su-ml-0',
                      },
                    }}
                    inputProps={{
                      ...props.inputProps,
                      className: styles.input(isDesktop),
                    }}
                    data-test={`${field}-facet-search`}
                  />
                )}
                renderOption={(props, option, { selected }) => (
                  <LocationListItem
                    {...props}
                    className={dcnb(
                      styles.option({ selected }),
                      props.className
                    )}
                    data-test={`${field}-facet-option`}
                  >
                    {option.label}
                  </LocationListItem>
                )}
                clearIcon={
                  <HeroIcon
                    iconType="close"
                    className={styles.clearIcon}
                    data-test={`${field}-facet-reset`}
                  />
                }
                popupIcon={null}
                disablePortal={!isDesktop}
                classes={{
                  popper: isDesktop ? styles.popper : styles.popperMobile,
                  inputRoot: styles.inputRoot,
                  paper: styles.paper,
                  listbox: isDesktop ? styles.listbox : styles.listboxMobile,
                  clearIndicator: styles.clearLocation,
                }}
              />
            </div>
            <HeroIcon iconType="location" className={styles.pinIcon} />
          </div>
        </form>
      </fieldset>
    </div>
  );
};

export default LocationTabPanelCountry;
