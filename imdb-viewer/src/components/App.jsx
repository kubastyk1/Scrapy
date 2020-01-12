import React from 'react';
import DataView from './DataView/DataView';
import * as Styled from './App.styled.js';
import data from 'data/cast.json';

const actors = [
  {
      name: "Harry Potter",
      movies: ["The Philosopher's Stone",
          "The Chamber of Secrets",
          "The Prisoner of Azkaban",
          "The Goblet of Fire",
          "The Order of the Phoenix",
          "The Half-Blood Prince",
          "The Deathly Hallows"],
      series: ["Plebania"]
  },
  {
      name: "Arnold Shwarzenigger",
      movies: ["Terminator", "Terminator 2", "Shrek", "Black Power 2"],
      series: []
  },
  {
      name: "Antonio Banderas",
      movies: ["Lord of the Rings: Two Towers", "Pocahontas"],
      series: ["The Witcher", "Far from nosze", "Breaking Bad", "Ed, Edd & Eddy"]
  },
  {
      name: "Vladimir Putin",
      movies: ["Adidas"],
      series: ["Chernobyl", "Shameless", "American Horror Story"]
  },
  {
      name: "Sasha Grey",
      movies: ["I melt  with You", "Fuck slaves 3", "My evil sluts 2"],
      series: ["The Seduction", "Sporty Girls 2", "Fly girls", "Nylons 5", "Bitchcraft 4"]
  },
  
]

const App = () => {
  const actorsFromFile = data.slice(0,100);
  console.log(actorsFromFile);
  return (
    <Styled.Container>
      <Styled.Header>
        <h1>Filmonator</h1>
      </Styled.Header>
      <DataView actors={actorsFromFile}/>
    </Styled.Container>
  );
}

export default App;
