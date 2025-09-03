import React from 'react';

function ErrorMessage({ message }) {
  return (
    <div className="error-message text-red-500 text-center p-4 bg-red-100 rounded">
      {message}
    </div>
  );
}

export default ErrorMessage;
