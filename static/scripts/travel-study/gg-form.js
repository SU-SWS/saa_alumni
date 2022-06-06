const autoComplete = require('./autoComplete');

class ggForm {
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
    this.elem = document.getElementById(this.id);
    this.render('Loading user information...');
    await this.getUserInfo();
    this.render('Loading trip information...');
    this.embedTripSelect();
    this.autocompleteConfig();
  };

  /**
   *
   * @param {*} content
   */
  render = (content) => {
    this.elem.replaceChildren(content);
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
    const uuid = document.getElementById(`${this.id}-select`).value;
    this.uuid = uuid;
    window.su_trip_id = this.trips[uuid].tripId;
    window.su_trip_name = this.trips[uuid].title;
    window.su_dname = this.user.su_display_name;
    window.su_email = this.user.mail;
  };

  /**
   * Get the information box.
   */
  getTripInfoBox = (trips, uuid) => {
    const content = `
      <h3>Trip Information</h3>
      <p><strong>Trip Name:</strong> ${trips[uuid].title}</p>
      <p><strong>Trip ID:</strong> ${trips[uuid].tripId}</p>
      <p>
        <strong>Trip URL:</strong>
        <a href="https://alumni.stanford.edu/${trips[uuid].full_slug}" target="_blank" rel="noopener">
          https://alumni.stanford.edu/${trips[uuid].full_slug}
        </a>
      </p>
      <p><strong>Trip Subtitle:</strong> ${trips[uuid].subtitle}</p>
      <p><strong>Trip Start Date:</strong> ${trips[uuid].startDate}</p>
      <p><strong>Trip End Date:</strong> ${trips[uuid].endDate}</p>
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
    const tripList = Object.keys(trips).map(
      (key) => `${trips[key].title} ${trips[key].tripId}`
    );
    return tripList;
  };

  /**
   * Embed the trip information and form.
   */
  renderForm = () => {
    const content = document.createElement('article');
    content.className = 'gg-form-wrapper';
    content.style.display = 'flex';
    content.style.gap = '3rem';

    const sidebar = document.createElement('aside');
    sidebar.className = 'gg-form-sidebar';
    sidebar.innerHTML += this.getTripInfoBox(this.trips, this.uuid);

    const main = document.createElement('section');
    main.className = 'gg-form-main';
    main.appendChild(this.getGGScript());

    content.appendChild(sidebar);
    content.appendChild(main);
    this.render(content);
  };

  /**
   * Embeds an option to select a trip.
   */
  embedTripSelect = () => {
    const content = document.createElement('div');
    const message = document.createElement('h3');
    message.innerText = 'Select a trip to begin:';
    const div = document.createElement('div');
    div.className = 'autoComplete_wrapper';
    const input = document.createElement('input');
    input.id = `autoComplete`;
    input.type = `search`;
    input.dir = 'ltr';
    input.spellcheck = false;
    div.appendChild(input);
    const go = document.createElement('button');
    go.innerText = 'Go ➡️';
    go.className = 'go-button';
    go.onclick = () => {
      this.setADCVariables();
      this.renderForm();
    };

    content.appendChild(message);
    content.appendChild(div);
    content.appendChild(go);

    this.render(content);
  };

  autocompleteConfig = async () => {
    const trips = await this.getTrips();
    // eslint-disable-next-line new-cap
    const autoCompleteJS = new autoComplete({
      selector: '#autoComplete',
      placaeHolder: 'Search for Food...',
      data: {
        src: [
          'Sauce - Thousand Island',
          'Wild Boar - Tenderloin',
          'Goat - Whole Cut',
          ...trips,
        ],
        cache: true,
      },
      resultsList: {
        element: (list, data) => {
          if (!data.results.length) {
            // Create "No Results" message element
            const message = document.createElement('div');
            // Add class to the created element
            message.setAttribute('class', 'no_result');
            // Add message text content
            message.innerHTML = `<span>Found No Results for "${data.query}"</span>`;
            // Append message element to the results list
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
            const selection = event.detail.selection.value;
            autoCompleteJS.input.value = selection;
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
