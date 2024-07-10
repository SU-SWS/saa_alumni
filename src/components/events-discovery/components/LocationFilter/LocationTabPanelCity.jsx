import React, { useContext, useState } from 'react';
import MUIAutocomplete from '@mui/material/Autocomplete';
import MUITextField from '@mui/material/TextField';
import MUIToggleButton from '@mui/material/ToggleButton';
import MUIToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { dcnb } from 'cnbuilder';
import { useConnector, useGeoSearch } from 'react-instantsearch';
import { LocationContext } from './LocationFacetProvider';
import * as styles from './LocationFilter.styles';
import HeroIcon from '../../../simple/heroIcon';
import RadialGeoSearchConnector from './RadialGeoSearchConnector';

const LocationTabPanelCity = () => {
  // CONTEXT
  const { activeTab } = useContext(LocationContext);

  // TODO: Fix this window check to be a real on breakpoint.
  const isDesktop = window ?? window.innerWidth >= 1024;

  // STATE
  const [distanceState, setDistanceState] = useState('40000');
  const { refine } = useConnector(RadialGeoSearchConnector, {
    radius: parseInt(distanceState, 10),
    precision: 1000,
  });

  // If not active. Return.
  if (activeTab !== 'city') return null;

  // Return the city tab panel.
  return (
    <div id="city-panel" role="tabpanel">
      <fieldset className={styles.fieldset} data-test="location-facet">
        <legend className={dcnb(styles.locationLabels, styles.legend)}>
          City
        </legend>
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div className={styles.locationWrapper}>
            <div className={styles.root}>
              <MUIAutocomplete
                multiple={false}
                options={['Vancouver', 'Toronto', 'Montreal']}
                onChange={(e, value) => {
                  refine({
                    lat: 47.62,
                    lng: -122.33,
                  });
                }}
                renderInput={(props) => (
                  <MUITextField
                    {...props}
                    openOnFocus={false}
                    autoSelect={false}
                    variant="standard"
                    placeholder="Find a city"
                    inputProps={{
                      ...props.inputProps,
                      className: styles.input,
                    }}
                    data-test="location-facet-search"
                  />
                )}
                clearIcon={
                  <HeroIcon
                    iconType="close"
                    className={styles.clearIcon}
                    data-test="location-facet-reset"
                  />
                }
                popupIcon={null}
                disablePortal
                classes={{
                  popper: isDesktop ? '' : styles.popperMobile,
                  inputRoot: styles.inputRoot,
                  paper: styles.paper,
                  listbox: styles.listbox,
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

        <div className={styles.toggleGroupWrapper}>
          <label
            className={styles.locationLabels}
            htmlFor="location-distance-buttons"
          >
            Within:
          </label>
          <MUIToggleButtonGroup
            exclusive
            id="location-distance-buttons"
            className={styles.toggleButtonGroup}
            value={distanceState}
            aria-label="Select distance from your chosen location"
            onChange={(e, value) => setDistanceState(value)}
          >
            <MUIToggleButton
              value="40000"
              className={styles.toggleButton}
              disableRipple
              aria-label="25 mile radius"
              data-test="location-facet-25"
              selected={distanceState === '40000'}
            >
              25mi
            </MUIToggleButton>
            <MUIToggleButton
              value="80000"
              className={styles.toggleButton}
              disableRipple
              aria-label="50 mile radius"
              data-test="location-facet-50"
              selected={distanceState === '80000'}
            >
              50mi
            </MUIToggleButton>
            <MUIToggleButton
              value="160000"
              className={styles.toggleButton}
              disableRipple
              aria-label="100 mile radius"
              data-test="location-facet-100"
              selected={distanceState === '160000'}
            >
              100mi
            </MUIToggleButton>
          </MUIToggleButtonGroup>
        </div>
      </fieldset>
    </div>
  );
};

export default LocationTabPanelCity;
