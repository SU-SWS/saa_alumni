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
    window.su_staff = this.user.su_display_name;
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
    const tripList = Object.keys(trips).map((uuid) => {
      const trip = {
        label: `${trips[uuid].title} ${trips[uuid].tripId}`,
        value: uuid,
      };
      return trip;
    });
    console.log(tripList);
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
    message.innerText = 'Trip details';

    const labelDiv = document.createElement('div');
    const label = document.createElement('label');
    label.innerText = 'Trip name, year, and trip ID number';
    labelDiv.appendChild(label);

    const inputDiv = document.createElement('div');
    inputDiv.className = 'autoComplete_wrapper';
    const input = document.createElement('input');
    input.id = `autoComplete`;
    input.type = `search`;
    input.dir = 'ltr';
    input.spellcheck = false;
    inputDiv.appendChild(input);

    const next = document.createElement('button');
    next.innerText = 'Next ➡️';
    next.className = 'next-button';
    next.onclick = () => {
      this.setADCVariables();
      this.renderForm();
    };

    content.appendChild(message);
    content.appendChild(labelDiv);
    content.appendChild(inputDiv);
    content.appendChild(next);

    this.render(content);
  };

  autocompleteConfig = async () => {
    const trips = await this.getTrips();
    // eslint-disable-next-line no-undef
    const autoCompleteJS = new autoComplete({
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
