import React from 'react';

function Page({ children, suffix }) {
  return (
    <div className={`page page-${suffix}`}>
      {children}
    </div>
  );
}

export default Page;
