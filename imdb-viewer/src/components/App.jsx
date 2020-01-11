import React from 'react';
import styled from 'styled-components';
import DataView from './DataView/DataView';

const Container = styled.div`
  margin: 1em;
`

const App = () => {
  return (
    <Container>
      <header>
        <h1>Filmonator</h1>
      </header>
      <DataView/>
    </Container>
  );
}

export default App;
