import { useState, useEffect } from 'react';

import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { SelectButton } from 'primereact/selectbutton';
import { InputNumber } from 'primereact/inputnumber';

import {
  initUser,
  initPeoject,
  assigneeList,
  reporterList,
  operatorList,
  projectList,
  defaultDropDownVal,
  defaultBeginVal,
  defaultEndVal,
} from './App001Data.js';

export default function App001Page() {
  const [assignee, setAssignee] = useState(defaultDropDownVal);
  const [reporter, setReporter] = useState(defaultDropDownVal);

  const [operator, setOperator] = useState(operatorList[0]);

  const [project, setProject] = useState(defaultDropDownVal);

  const [beginDate, setBeginDate] = useState(defaultBeginVal);
  const [endDate, setEndDate] = useState(defaultEndVal);

  const [pageNo, setPageNo] = useState(0);
  const [rowPerPage, setRowPerPage] = useState(100);

  let formData = {};

  useEffect(() => {
    initUser();
    initPeoject();
    return () => {};
  }, []);

  async function debugHandler() {
    console.log('assignee', assignee);
    console.log('reporter', reporter);
    console.log('operator', operator);
    console.log('project', project);
    console.log('beginDate', beginDate);
    console.log('endDate', endDate);
    console.log('pageNo', pageNo);
    console.log('rowPerPage', rowPerPage);

    console.log('formData', formData);
  }

  return (
    <>
      <h3>App001</h3>

      <div className="grid">
        <div className="col-4">
          <label>Assignee </label>
          <Dropdown
            value={assignee}
            onChange={(e) => setAssignee(e.value)}
            options={assigneeList}
            optionLabel="name"
            placeholder="Select a Assignee"
            className="w-full md:w-14rem"
          />
        </div>

        <div className="col-2">
          {/* <label>Operator</label> */}
          <SelectButton value={operator} onChange={(e) => setOperator(e.value)} options={operatorList} />
        </div>

        <div className="col-4">
          <label>Reporter</label>
          <Dropdown
            value={reporter}
            onChange={(e) => setReporter(e.value)}
            options={reporterList}
            optionLabel="name"
            placeholder="Select a Reporter"
            className="w-full md:w-14rem"
          />
        </div>
      </div>

      <div className="grid">
        <div className="col-4">
          <label>Project</label>
          <Dropdown
            value={project}
            onChange={(e) => setProject(e.value)}
            options={projectList}
            optionLabel="name"
            placeholder="Select a Reporter"
            className="w-full md:w-14rem"
          />
        </div>
      </div>

      <div className="grid">
        <div className="col-4">
          <label>Begin Date</label>
          <Calendar dateFormat={'yy-mm-dd'} showIcon value={beginDate} onChange={(e) => setBeginDate(e.value)} />
        </div>
        <div className="col-4">
          <label>End Date</label>
          <Calendar dateFormat={'yy-mm-dd'} showIcon value={endDate} onChange={(e) => setEndDate(e.value)} />
        </div>
      </div>

      <div className="grid">
        <div className="col-4">
          <label>Page No</label>
          <InputNumber
            inputId="minmax-buttons"
            value={pageNo}
            onValueChange={(e) => setPageNo(e.value)}
            mode="decimal"
            showButtons
            min={0}
            max={100}
          />
        </div>

        <div className="col-4">
          <label>Row per page</label>
          <InputNumber
            inputId="minmax-buttons"
            value={rowPerPage}
            onValueChange={(e) => setRowPerPage(e.value)}
            mode="decimal"
            showButtons
            min={0}
            max={100}
          />
        </div>
      </div>

      <div>
        <br />
        <Button label="Exe" onClick={debugHandler} />
      </div>
    </>
  );
}
