import React from 'react';

const TextButton = ({ text, onClick }) => {
  return (
    <span
      onClick={onClick}
      style={{
        cursor: 'pointer',
        color: 'black',
        textDecoration: 'underline',
        padding: '10px 20px',
        display: 'inline-block'
      }}
    >
      {text}
    </span>
  );
};

export default TextButton;
