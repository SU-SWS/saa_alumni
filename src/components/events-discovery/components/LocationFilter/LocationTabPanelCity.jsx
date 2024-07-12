/* eslint-disable no-console */
import React, { useContext, useState } from 'react';
import MUIAutocomplete from '@mui/material/Autocomplete';
import MUITextField from '@mui/material/TextField';
import MUIToggleButton from '@mui/material/ToggleButton';
import MUIToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { dcnb } from 'cnbuilder';
import { useClearRefinements } from 'react-instantsearch';
import axios from 'axios';
import { LocationContext } from './LocationFacetProvider';
import * as styles from './LocationFilter.styles';
import HeroIcon from '../../../simple/heroIcon';
import useRadialGeoSearch from './useRadialGeoSearch';

const LocationTabPanelCity = () => {
  // CONTEXT
  const { activeTab } = useContext(LocationContext);

  // TODO: Fix this window check to be a real on breakpoint.
  const isDesktop = window ?? window.innerWidth >= 1024;

  // Algolia Hooks.
  const { refine: clearLocationRefinements } = useClearRefinements({
    includedAttributes: ['state', 'country'],
  });

  // Custom Connector
  const {
    refine,
    clearRefinements: clearGeoRefinement,
    name: locationName,
    radius,
    setRadius,
    lat,
    lng,
  } = useRadialGeoSearch();

  // Is loading suggestions.
  const [locationIsLoading, setLocationIsLoading] = useState(false);
  // Suggestions for the location search.
  const [locationSuggestions, setLocationSuggestions] = useState([
    locationName || 'Current location',
  ]);

  // Handle the input typing into the location search.
  const onInputType = async (e, query, reason) => {
    switch (reason) {
      case 'input': {
        setLocationIsLoading(true);
        // Don't start lookup until at least three characters have been entered.
        if (!query || query?.length < 3 || query === 'Current location') {
          setLocationSuggestions(['Current location']);
          setLocationIsLoading(false);
          return;
        }
        // Fetch the location suggestions.
        const params = new URLSearchParams({
          q: query,
        });
        const results = await axios.get(
          `/api/location/autocomplete?${params.toString()}`
        );
        if (results?.data?.results && results.data.results.length > 0) {
          setLocationSuggestions(
            results.data.results.map((r) => r.description)
          );
        } else {
          setLocationSuggestions(['Current location']);
        }
        setLocationIsLoading(false);
        break;
      }
      case 'clear': {
        setLocationSuggestions(['Current location']);
        clearGeoRefinement();
        break;
      }
      default:
        // eslint-disable-next-line no-console
        console.debug('Unhandled reason', reason);
    }
  };

  // Handle the city change.
  const onCityChange = async (e, value, reason) => {
    switch (reason) {
      case 'selectOption': {
        // Clear out other location refinements.
        clearLocationRefinements();

        // If the value is current location, use the current location.
        if (value === 'Current location') {
          // Use the current location.

          navigator.geolocation.getCurrentPosition(
            (position) => {
              refine({
                name: 'Current location',
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              });
            },
            (error) => {
              console.error('Error getting current location', error);
            }
          );
        } else {
          // If not current location, lookup the location by name.
          const params = new URLSearchParams({
            q: value,
          });
          const results = await axios.get(
            `/api/location/lookup?${params.toString()}`
          );
          if (results?.data?.location) {
            refine({
              name: value,
              lat: results.data.location.geometry.location.lat,
              lng: results.data.location.geometry.location.lng,
            });
            break;
          }
          console.error('Unable to find location coordinates', value);
        }
        break;
      }
      case 'clear': {
        setLocationSuggestions(['Current location']);
        clearGeoRefinement();
        break;
      }
      default:
        console.log('Unknown reason', reason);
    }
  };

  // If not active. Return.
  if (activeTab !== 'city') return null;

  console.log('DEBUG', locationName, radius, lat, lng);

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
                autoSelect={false}
                options={locationSuggestions}
                onInputChange={onInputType}
                onChange={onCityChange}
                value={locationName}
                loading={locationIsLoading}
                filterOptions={(x) => x}
                renderInput={(props) => (
                  <MUITextField
                    {...props}
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
            <HeroIcon iconType="location" className={styles.pinIcon} />
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
            value={parseInt(radius, 10)}
            aria-label="Select distance from your chosen location"
            onChange={(e, value) => setRadius(value)}
            disabled={!locationName}
          >
            <MUIToggleButton
              value={40000}
              className={styles.toggleButton}
              disableRipple
              aria-label="25 mile radius"
              data-test="location-facet-25"
              selected={radius === 40000}
            >
              25mi
            </MUIToggleButton>
            <MUIToggleButton
              value={80000}
              className={styles.toggleButton}
              disableRipple
              aria-label="50 mile radius"
              data-test="location-facet-50"
              selected={radius === 80000}
            >
              50mi
            </MUIToggleButton>
            <MUIToggleButton
              value={160000}
              className={styles.toggleButton}
              disableRipple
              aria-label="100 mile radius"
              data-test="location-facet-100"
              selected={radius === 160000}
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
