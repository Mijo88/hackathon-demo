import React from 'react';

function Section({ children, suffix }) {
  return (
    <section className={`section section-${suffix}`}>
      {children}
    </section>
  );
}

export default Section;
