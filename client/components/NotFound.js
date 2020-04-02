import React from 'react';
import {
  Page,
  Section,
  Container,
  Column,
} from './common';

function NotFound() {
  return (
    <Page suffix="404">
      <Section suffix="main">
        <Container>
          <Column className="col-12">
            <h1 className="text-center">404 - Page Not Found</h1>
          </Column>
        </Container>
      </Section>
    </Page>
  );
}

export default NotFound;
