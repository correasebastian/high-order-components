/*
TITLE:
Optimize Component Rendering using Recompose

DESCRIPTION:
Learn how and when to use the ‘pure’, ‘onlyUpdateForKeys’,
‘onlyUpdateForPropTypes’, and ‘shouldUpdate’ higher order components.
Each one provides a certain granularity of control over prevent
unnecessary renders. Learn how they build upon each other to provide
different options.
*/
import React from 'react';
import { compose, withState, withHandlers, pure, onlyUpdateForKeys,
        setPropTypes, onlyUpdateForPropTypes, shouldUpdate } from  'recompose'

import './App.css'

const Cell = ({ data, onChange, width }) =>
  <div className="Cell" style={{ width: `${width}%`, borderColor: randomColor() }} >
    <textarea type="text" value={ data } onChange={ onChange } />
  </div>
;
const Spreadsheet = ({ rows, cols, cellsData, onCellChange }) =>
  <div className = "Spreadsheet" > {
    range(rows)
    .map((row, i) =>
      range(cols)
      .map((col, j) => `${i}-${j}`)
      .map(id =>
        <Cell key={id} id={id} data={cellsData[id] || ''} 
          onChange={ e => onCellChange(id, e.target.value) } width = { 100 / cols } 
        />
      )
    )
  }
  </div>;

const enhance = compose(
  withState('cellsData', 'setCells', {}),
  withHandlers({
    setCellState: ({ cellsData, setCells }) => (id, val) =>
      setCells({
        ...cellsData,
        [id]: val
      })
  })
);

const App = enhance(({ cellsData, setCellState }) =>
  <div className="App">
    <Spreadsheet
      {...{ rows: 3, cols: 3, cellsData, onCellChange: setCellState }}
    />
  </div>
);


function range(num) {
  return Array.from(Array(num).keys())
}

function randomColor() {
  return '#'+Math.floor(Math.random()*16777215).toString(16);
}

export default App