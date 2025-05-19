// import React from 'react';

export const CircularSpinner = ({ size = 40, color = '#3b82f6' }) => {
  const spinnerStyle = {
    width: size,
    height: size,
    border: `${size / 10}px solid ${color}`,
    borderTop: `${size / 10}px solid transparent`,
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  };

  return (
    <>
      <div style={spinnerStyle}></div>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </>
  );
};
