import React from 'react';

import { signal } from '@preact/signals-react';

//? Global value
const counter = signal({
  count: 0,
  totalCount: 0,
  operator: [],
});

function CounterSignal({ titleText }) {
  //? Local value
  // const counter = signal({
  //   count: 0,
  //   totalCount: 0,
  //   operator: [],
  // });

  function incrementHandler() {
    counter.value = {
      count: counter.value.count + 1,
      totalCount: counter.value.totalCount + 1,
      operator: [...counter.value.operator, '+'],
    };
  }

  function decrementHandler() {
    counter.value = {
      count: counter.value.count - 1,
      totalCount: counter.value.totalCount - 1,
      operator: [...counter.value.operator, '-'],
    };
  }

  function zeroHandler() {
    counter.value = {
      count: 0,
      totalCount: 0,
      operator: [...counter.value.operator, '0'],
    };
  }

  return (
    <div>
      <h2>{titleText}</h2>
      <div>
        <button style={{ backgroundColor: ' #77d2f0' }} onClick={incrementHandler}>
          +
        </button>
        <button style={{ backgroundColor: ' #77d2f0' }} onClick={decrementHandler}>
          -
        </button>
        <button style={{ backgroundColor: ' #77d2f0' }} onClick={zeroHandler}>
          0
        </button>
      </div>
      <br />
      <h2>counter : {counter.value.count}</h2>
      <h2>total : {counter.value.totalCount}</h2>
      <h2>operator : {counter.value.operator}</h2>
    </div>
  );
}

export default CounterSignal;
