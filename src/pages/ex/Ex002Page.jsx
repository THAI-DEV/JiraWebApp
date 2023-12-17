import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';

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

      <div className="grid">
        <div className="col-4">
          <label>Assignee </label>
          <InputText />
        </div>

        <div className="col-4">
          <label>Operator</label>
          <InputText />
        </div>

        <div className="col-4">
          <label>Reporter</label>
          <InputText />
        </div>
      </div>

      <div className="grid">
        <div className="col-4">
          <label>Project</label>
          <InputText />
        </div>
      </div>

      <div className="grid">
        <div className="col-4">
          <label>From</label>
          <Calendar dateFormat={'dd/mm/yy'} showIcon />
        </div>
        <div className="col-4">
          <label>To</label>
          <Calendar dateFormat={'dd/mm/yy'} showIcon />
        </div>
      </div>

      <div>
        <Button label="Primary" onClick={clickHandler} />
      </div>
    </>
  );
}

export default Ex002Page;
