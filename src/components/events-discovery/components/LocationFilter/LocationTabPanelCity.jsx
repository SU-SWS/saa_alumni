/* eslint-disable no-console */
import React, { useContext, useState, useId, useEffect } from 'react';
import MUIAutocomplete from '@mui/material/Autocomplete';
import MUITextField from '@mui/material/TextField';
import MUIToggleButton from '@mui/material/ToggleButton';
import MUIToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { dcnb } from 'cnbuilder';
import axios from 'axios';
import { useCurrentRefinements } from 'react-instantsearch';
import { LocationContext } from './LocationFacetProvider';
import * as styles from './LocationFilter.styles';
import HeroIcon from '../../../simple/heroIcon';
import useRadialGeoSearch from '../../../../hooks/useRadialGeoSearch';
import { LocationListItem } from './LocationListItem';
import LocationFilterClearContent from './LocationFilterClearContent';

const LocationTabPanelCity = () => {
  // CONTEXT
  const { activeTab, locError, setLocError } = useContext(LocationContext);
  const searchFieldId = useId();
  const isDesktop = window ?? window.innerWidth >= 991;

  const { items: otherLocationItems } = useCurrentRefinements({
    includedAttributes: ['state', 'country'],
  });

  // Custom Connector Hook.
  const {
    refine,
    clearRefinements: clearGeoRefinement,
    name: locationName,
    radius,
    setRadius,
  } = useRadialGeoSearch({ primary: true });

  // Is loading suggestions.
  const [locationIsLoading, setLocationIsLoading] = useState(false);
  // Suggestions for the location search.
  const [locationSuggestions, setLocationSuggestions] = useState([
    '',
    locationName || 'Current location',
  ]);

  // Handle the input typing into the location search.
  const onInputType = async (e, query, reason) => {
    switch (reason) {
      case 'input': {
        setLocationIsLoading(true);
        setLocError(null);
        // Don't start lookup until at least three characters have been entered.
        if (!query || query?.length < 3 || query === 'Current location') {
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
          setLocationSuggestions([
            ...results.data.results.map((r) => r.description),
            'Current location',
          ]);
        } else {
          console.warn('No results found for location', query);
          setLocationSuggestions(['Current location']);
        }
        setLocationIsLoading(false);
        break;
      }
      case 'clear': {
        setLocError(null);
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
              setLocError({
                message: 'Unable to get current location. Please try again.',
              });
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
            return;
          }
          setLocError({
            message: 'Unable to find location coordinates. Please try again.',
          });
          console.error('Unable to find location coordinates', value);
        }
        break;
      }
      case 'clear': {
        setLocError(null);
        clearGeoRefinement();
        break;
      }
      default:
        console.log('Unknown reason', reason);
    }
  };

  // If not active. Return.
  if (activeTab !== 'city') return null;

  // If the state or country tab is active, show the clear message and button.
  if (otherLocationItems.length > 0) {
    return <LocationFilterClearContent activeTab={activeTab} />;
  }

  // Return the city tab panel.
  return (
    <div
      id="city-panel"
      role="tabpanel"
      tabIndex={0}
      aria-labelledby="city-tab"
      className={dcnb(styles.tabPanel)}
    >
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
              <label className="su-sr-only" htmlFor={searchFieldId}>
                Find a city
              </label>
              <MUIAutocomplete
                id={searchFieldId}
                multiple={false}
                autoSelect={false}
                options={locationSuggestions}
                onInputChange={onInputType}
                onChange={onCityChange}
                value={locationName}
                loading={locationIsLoading}
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
                renderOption={(props, option, { selected }) => {
                  if (option === '') {
                    return null;
                  }
                  if (option === 'Current location') {
                    return (
                      <LocationListItem
                        {...props}
                        className={dcnb(
                          styles.option({ selected }),
                          props.className
                        )}
                      >
                        <span className="su-flex">
                          <HeroIcon iconType="location" />
                          &nbsp;
                          {option}
                        </span>
                      </LocationListItem>
                    );
                  }
                  return (
                    <LocationListItem
                      {...props}
                      className={dcnb(
                        styles.option({ selected }),
                        props.className
                      )}
                      data-test="location-facet-option"
                    >
                      {option}
                    </LocationListItem>
                  );
                }}
                clearIcon={
                  <HeroIcon
                    iconType="close"
                    className={styles.clearIcon}
                    data-test="location-facet-reset"
                  />
                }
                popupIcon={null}
                classes={{
                  popper: isDesktop ? '' : styles.popperMobile,
                  listbox: isDesktop ? styles.listbox : styles.listboxMobile,
                  inputRoot: styles.inputRoot({ locError }),
                  paper: styles.paper,
                  clearIndicator: styles.clearLocation,
                }}
              />
            </div>
            <HeroIcon iconType="location" className={styles.pinIcon} />
          </div>
        </form>

        {locError && (
          <div className={styles.error}>
            <HeroIcon iconType="alert" className="su-mr-10" />{' '}
            <span>{locError.message}</span>
          </div>
        )}

        <div className={styles.toggleGroupWrapper}>
          <label
            className={dcnb(styles.locationLabels, styles.legend, 'su-block')}
            htmlFor="location-distance-buttons"
          >
            Within
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
