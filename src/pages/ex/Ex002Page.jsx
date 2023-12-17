import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';

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
      {/* <Button label="Submit" icon="pi pi-check"></Button> */}
      <InputText />
      <Button label="Primary" />
    </>
  );
}

export default Ex002Page;
