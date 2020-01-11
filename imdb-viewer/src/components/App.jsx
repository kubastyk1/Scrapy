import React from 'react';
import DataView from './DataView/DataView';
import * as Styled from './App.styled.js';


const App = () => {
  return (
    <Styled.Container>
      <Styled.Header>
        <h1>Filmonator</h1>
      </Styled.Header>
      <DataView/>
    </Styled.Container>
  );
}

export default App;
