import React from 'react';
import SbEditable from 'storyblok-react';

const Redirect = ({ blok: { from, to, statusCode, enabled }, blok }) => {
  const mapping = {
    'From Path': from || 'N/A',
    'To Path': to || 'N/A',
    'Status Code': statusCode || '301',
    Enabled: enabled ? 'TRUE' : 'FALSE',
  };
  const map = function (type) {
    return Object[type](mapping).map((str) =>
      type === 'keys' ? <th>{str}</th> : <td>{str}</td>
    );
  };

  return (
    <SbEditable content={blok}>
      <article>
        <section className="ood-redirect-info">
          <table>
            <thead>
              <tr>{map('keys')}</tr>
            </thead>
            <tbody>
              <tr>{map('values')}</tr>
            </tbody>
          </table>
        </section>
      </article>
    </SbEditable>
  );
};

export default Redirect;
