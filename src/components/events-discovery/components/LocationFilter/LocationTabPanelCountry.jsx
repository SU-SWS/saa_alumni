import React, { useId, useContext } from 'react';
import { dcnb } from 'cnbuilder';
import MUIAutocomplete from '@mui/material/Autocomplete';
import MUITextField from '@mui/material/TextField';
import { useClearRefinements, useRefinementList } from 'react-instantsearch';
import { LocationContext } from './LocationFacetProvider';
import * as styles from './LocationFilter.styles';
import HeroIcon from '../../../simple/heroIcon';

const LocationTabPanelCountry = () => {
  const { activeTab } = useContext(LocationContext);
  const searchFieldId = useId();
  const title = 'Find a country';
  const field = 'country';
  const isDesktop = window.innerWidth >= 1024; // TODO: Fix this window check to be a real on breakpoint.
  const { refine: clearRefinement } = useClearRefinements({
    includedAttributes: [field, 'city', 'state'],
  });
  const { items, refine } = useRefinementList({
    attribute: field,
    limit: 1000,
    sortBy: ['name:asc'],
  });

  if (activeTab !== 'country') return null;

  return (
    <div id="country-panel" role="tabpanel">
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
                multiple={false}
                openOnFocus={false}
                autoSelect={false}
                options={items}
                noOptionsText="No Results"
                onChange={(e, { value }) => {
                  clearRefinement();
                  refine(value);
                }}
                renderInput={(props) => (
                  <MUITextField
                    {...props}
                    variant="standard"
                    placeholder={title}
                    inputProps={{
                      ...props.inputProps,
                      className: styles.input,
                    }}
                    data-test={`${field}-facet-search`}
                  />
                )}
                renderOption={(props, option, { selected }) => {
                  if (option.value === '') {
                    return null;
                  }
                  return (
                    <li
                      {...props}
                      className={dcnb(
                        styles.option({ selected }),
                        props.className
                      )}
                      data-test={`${field}-facet-option`}
                    >
                      {option.value}
                    </li>
                  );
                }}
                clearIcon={
                  <HeroIcon
                    iconType="close"
                    className={styles.clearIcon}
                    data-test={`${field}-facet-reset`}
                  />
                }
                popupIcon={null}
                disablePortal
                classes={{
                  popper: isDesktop ? '' : styles.popperMobile,
                  inputRoot: styles.inputRoot,
                  paper: styles.paper,
                  listbox: isDesktop
                    ? styles.listboxCountry
                    : styles.listboxCountryMobile,
                  clearIndicator: styles.clearLocation,
                }}
              />
            </div>
            <HeroIcon
              iconType="location"
              noBaseStyle
              className={styles.pinIcon}
            />
          </div>
        </form>
      </fieldset>
    </div>
  );
};

export default LocationTabPanelCountry;
