import React from 'react';
import { projectAll } from './../../service/service.js';

function Ex002Page() {
  async function clickHandler() {
    await projectAll()
      .then(function (result) {
        console.log(result);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <>
      <h3>Ex02</h3>
      <button onClick={clickHandler}>Exe</button>
    </>
  );
}

export default Ex002Page;
