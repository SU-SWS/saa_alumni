import React, { useState, useEffect } from 'react';
import { dcnb } from 'cnbuilder';
import axios from 'axios';

const PrivateImage = ({
  filename,
  alt,
  className,
  width = 256,
  loading = 'auto',
  ...props
}) => {
  const [signedUrl, setSignedUrl] = useState();
  const [hasError, setHasError] = useState(false);
  useEffect(() => {
    axios
      .get('/api/assets', { params: { filename } })
      .then((data) => {
        setSignedUrl(data.data.signedUrl);
      })
      .catch((error) => {
        setHasError(true);
        console.error(error);
      });
  }, [filename, setSignedUrl]);

  // Todo: Show broken image.
  if (hasError) {
    return <span className="su-text-2 su-bold">?</span>;
  }

  if (!signedUrl) {
    return null;
  }

  return (
    <img
      src={`https://assets.stanford.edu/p/${width}x${width}/${encodeURIComponent(
        signedUrl
      )}`}
      className={dcnb('su-object-cover', className)}
      alt={alt ?? ''}
      loading={loading}
      width={width}
      {...props}
    />
  );
};

export default PrivateImage;
