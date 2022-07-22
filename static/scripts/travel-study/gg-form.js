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
    this.mountAdditionalScripts();
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
    window.su_suid = this.user.display_name;
    window.su_staff_name = this.user.su_display_name;
  };

  /**
   * Embed the trip information and form.
   */
  embedInterstitialPage = () => {
    const content = document.createElement('article');
    content.className = 'gg-form-wrapper gg-form-notrip';

    const main = document.createElement('section');
    main.className = 'gg-form-main centered-container';

    const ggScript = document.createElement('div');
    ggScript.className = 'gg-script-wrapper';

    const staffName = document.createElement('p');
    staffName.className = 'gg-staff-name';
    staffName.innerText = `Staff name: ${this.user.su_display_name}`;

    ggScript.appendChild(staffName);
    ggScript.appendChild(this.getGGScript());
    main.appendChild(ggScript);
    content.appendChild(main);

    this.render(content);
  };
}

window.addEventListener('DOMContentLoaded', () => {
  const ggFormReady = new Event('ggFormReady', { bubbles: true });
  document.dispatchEvent(ggFormReady);
});
