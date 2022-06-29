/* eslint-disable new-cap */
class ggTripForm {
  /**
   *
   * @param {*} options
   */
  constructor(options) {
    this.id = options.id;
    this.form = options.form;
    this.tripApi =
      options?.tripApi || 'http://localhost:8000/api/travel-study/trips';
  }

  /**
   * Run you fools!
   */
  init = async () => {
    this.mountAdditionalScripts();
    this.elem = document.getElementById(this.id);
    this.render('Loading user information...');
    await this.getUserInfo();
    this.render('Loading trip information...');
    await this.embedTripSelect();
  };

  /**
   *
   * @param {*} content
   */
  render = (content) => {
    this.elem.replaceChildren(content);
  };

  mountAdditionalScripts = () => {
    document.head.innerHTML +=
      '<link rel="stylesheet" href="https://tsgg--stanford-alumni.netlify.app/scripts/travel-study/gg-form.css" type="text/css"/>';
    document.head.innerHTML +=
      '<script key="stripe" src="https://js.stripe.com/v3" type="text/javascript" />';
  };

  /**
   * Get user info from the Local API.
   */
  getUserInfo = async () => {
    const uid = window?.drupalSettings?.user?.uid;
    try {
      let udata = await fetch(`/jsonapi/user/user?filter[uid]=${uid}`);
      udata = await udata.json();
      this.user = udata.data[0].attributes;
    } catch (err) {
      console.log(err);
      this.user = {
        uid: 0,
        su_display_name: 'Guest',
        display_name: 'Guest-suid',
        mail: 'person@example.com',
      };
    }
  };

  /**
   * Load Give Gab Form Into Place
   */
  getGGScript = () => {
    const script = document.createElement('script');
    script.src = this.form;
    return script;
  };

  /**
   * Put the ADC Window variables into place.
   */
  setADCVariables = () => {
    const { uuid } = this;
    window.su_trip_id = this.trips[uuid].tripId;
    window.su_trip_name = this.trips[uuid].title;
    window.su_suid = this.user.display_name;
    window.su_staff_name = this.user.su_display_name;
  };

  /**
   * Get the information box.
   */
  getTripInfoBox = (trips, uuid) => {
    const dateFormat = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    const startDate = new Date(trips[uuid].startDate);
    const endDate = new Date(trips[uuid].endDate);
    const dateRange = `${startDate.toLocaleDateString(
      'en-US',
      dateFormat
    )} - ${endDate.toLocaleDateString('en-US', dateFormat)}`;

    const timeDifference = endDate.getTime() - startDate.getTime();
    const tripDuration = timeDifference / (1000 * 3600 * 24);

    const content = `
      <h2>Trip Information</h2>
      <p><strong>Trip Name:</strong> ${trips[uuid].title}</p>
      <p><strong>Trip ID:</strong> ${trips[uuid].tripId}</p>
      <p>
        <a href="https://alumni.stanford.edu/${trips[uuid].full_slug}" target="_blank" rel="noopener" class="su-link su-link--external">
          See trip details
        </a>
      </p>
      <div class="summary-item">
        <h3>Dates</h3>
        <p>${dateRange}</p>
      </div>
      <div class="summary-item">
        <h3>Duration</h3>
        <p>${tripDuration} days</p>
      </div>
      <div class="summary-item">
        <h3>Price</h3>
        <p>${trips[uuid].price}</p>
      </div>
      <div class="summary-item">
        <h3>Trip size</h3>
        <p>${trips[uuid].tripSize}</p>
      </div>
      <div class="summary-item">
        <h3>Minimum age requirement</h3>
        <p>${trips[uuid].minAge}</p>
      </div>
    `;
    return content;
  };

  /**
   *
   * @returns {Promise<void>}
   */
  getTrips = async () => {
    const response = await fetch(this.tripApi);
    const trips = await response.json();
    this.trips = trips;
    const tripList = Object.keys(trips).map((uuid) => {
      // TBD: Confirm the final Trip label (e.g. Australian, June 2022 (123456))
      const year = new Date(trips[uuid].startDate).getFullYear();
      const trip = {
        label: `${trips[uuid].tripConfigName} ${year} (${trips[uuid].tripId})`,
        value: uuid,
      };
      return trip;
    });
    return tripList;
  };

  /**
   * Embed the trip information and form.
   */
  renderForm = () => {
    const content = document.createElement('article');
    content.className = 'gg-form-wrapper flex-container';

    const sidebar = document.createElement('aside');
    sidebar.className = 'gg-form-sidebar flex-lg-4-of-12';
    sidebar.innerHTML += this.getTripInfoBox(this.trips, this.uuid);

    const main = document.createElement('section');
    main.className = 'gg-form-main flex-lg-8-of-12';
    const ggScript = document.createElement('div');
    ggScript.className = 'gg-script-wrapper';
    ggScript.appendChild(this.getGGScript());
    main.appendChild(ggScript);

    content.appendChild(sidebar);
    content.appendChild(main);
    this.render(content);
  };

  /**
   * Embeds an option to select a trip.
   */
  embedTripSelect = async () => {
    const trips = await this.getTrips();
    const content = document.createElement('div');
    content.className = 'gg-form-autocomplete';
    content.innerHTML = `
      <div class="gg-form-staff">
        <p>Staff name: ${this.user.su_display_name}</p>
      </div>
      <h2>Trip details</h2>
      <div class="gg-autocomplete-wrapper">
        <label for="autoComplete">Trip name, year, and trip ID number</label>
        <input id="autoComplete" class="gg-autocomplete" type="search" dir="ltr" spellcheck=false autocorrect="off" autocomplete="off" autocapitalize="off" maxlength="2048" tabindex="1">
      </div>
    `;
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'su-button su-link su-link--action';
    button.innerHTML = 'Next';
    button.onclick = () => {
      this.setADCVariables();
      this.renderForm();
    };

    content.appendChild(button);
    this.render(content);

    // eslint-disable-next-line no-undef
    const autoCompleteJS = await new autoComplete({
      selector: '#autoComplete',
      placeHolder: 'Search for Trip...',
      data: {
        src: trips,
        cache: true,
      },
      searchEngine: (query, record) => {
        // eslint-disable-next-line no-param-reassign
        query = query.toLowerCase();
        const recordName = record.label;
        if (recordName && recordName.toLowerCase().includes(query)) {
          return recordName;
        }
        return false;
      },
      resultsList: {
        element: (list, data) => {
          if (!data.results.length) {
            const message = document.createElement('div');
            message.setAttribute('class', 'no_result');
            message.innerHTML = `<span>Found No Results for "${data.query}"</span>`;
            list.prepend(message);
          }
        },
        noResults: true,
      },
      resultItem: {
        highlight: true,
      },
      events: {
        input: {
          selection: (event) => {
            const selection = event.detail.selection.value.label;
            autoCompleteJS.input.value = selection;
            this.uuid = event.detail.selection.value.value;
          },
        },
      },
    });
  };
}

window.addEventListener('DOMContentLoaded', () => {
  const ggFormReady = new Event('ggFormReady', { bubbles: true });
  document.dispatchEvent(ggFormReady);
});
