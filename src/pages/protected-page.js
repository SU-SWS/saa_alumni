import React from 'react';
import AuthenticatedPage from '../components/auth/AuthenticatedPage';

const ProtectedPage = (props) => (
  <AuthenticatedPage>
    <h1>Authenticated Page Demo</h1>
    <div>This page should only be visible to authenticated users.</div>
  </AuthenticatedPage>
);

export default ProtectedPage;
