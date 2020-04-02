import React from 'react';

function Column({ children, className }) {
  return (
    <div className={className ? `col ${className}` : 'col'}>
      {children}
    </div>
  );
}

export default Column;
