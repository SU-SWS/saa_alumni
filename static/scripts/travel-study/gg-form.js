/* eslint-disable new-cap */
class ggForm {
  /**
   *
   * @param {*} options
   */
  constructor(options) {
    this.id = options.id;
    this.form = options.form;
  }

  /**
   * Run you fools!
   */
  init = async () => {
    this.elem = document.getElementById(this.id);
    this.render('Loading user information...');
    await this.getUserInfo();
    this.embedInterstitialPage();
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
    window.su_suid = this.user.display_name;
    window.su_staff = this.user.su_display_name;
  };

  /**
   * Embed the trip information and form.
   */
  renderForm = () => {
    const content = document.createElement('article');
    content.className = 'gg-form-wrapper';
    content.style.display = 'flex';
    content.style.gap = '3rem';

    const main = document.createElement('section');
    main.className = 'gg-form-main';
    main.appendChild(this.getGGScript());

    content.appendChild(main);
    this.render(content);
  };

  /**
   * Embeds an option to select a trip.
   */
  embedInterstitialPage = () => {
    const content = document.createElement('div');
    const staffName = document.createElement('p');
    staffName.innerText = `Staff name: ${this.user.su_display_name}`;
    const next = document.createElement('button');
    next.innerText = 'Next ➡️';
    next.className = 'next-button';
    next.onclick = () => {
      this.setADCVariables();
      this.renderForm();
    };

    content.appendChild(staffName);
    content.appendChild(next);

    this.render(content);
  };
}

window.addEventListener('DOMContentLoaded', () => {
  const ggFormReady = new Event('ggFormReady', { bubbles: true });
  document.dispatchEvent(ggFormReady);
});
