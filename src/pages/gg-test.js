import React from 'react';

const GgTest = () => (
  <form>
    <div>
      <label htmlFor="su_first_name">First Name</label>
      <input
        className="su_first_name"
        type="text"
        name="su_first_name"
        placeholder="First Name"
      />
    </div>
    <div>
      <label htmlFor="su_last_name">Last Name</label>
      <input
        className="su_last_name"
        type="text"
        name="su_last_name"
        placeholder="Last Name"
      />
    </div>
    <div>
      <label htmlFor="su_email">Email</label>
      <input
        className="su_email"
        type="text"
        name="su_email"
        placeholder="Email"
      />
    </div>
  </form>
);

export default GgTest;
