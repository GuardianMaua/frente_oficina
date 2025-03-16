import React from 'react';
import { button } from './Button.css';

export function Button({ onClick, children, className }) {
  return (
    <button
      onClick={onClick}
      className='button'
    >
      {children}
    </button>
  );
}
