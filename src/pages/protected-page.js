import React, { useState } from 'react';
import fetch from 'node-fetch';

const ProtectedPage = (props) => {
  const [loggedIn, setLoggedIn] = useState(false);
  fetch('/api/auth/session')
    .then((res) => res.json())
    .then((session) => {
      if (session.email) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    });

  if (loggedIn) {
    return (
      <div>
        <h1>Protected Page</h1>
        <div>This page should only be accessible to authenticated users.</div>
      </div>
    );
  }
  return (
    <div>
      <h1>Access Denied</h1>
    </div>
  );
};

export default ProtectedPage;
