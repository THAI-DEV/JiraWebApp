import { useState, useEffect, useRef } from 'react';

import { FilterMatchMode, FilterOperator } from 'primereact/api';

import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { SelectButton } from 'primereact/selectbutton';
import { Accordion, AccordionTab } from 'primereact/accordion';
import { Toast } from 'primereact/toast';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Tag } from 'primereact/tag';
import { Checkbox } from 'primereact/checkbox';

import { convertDateTimeToJqlDate, formatLocalStr } from './../../../util/util.js';

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
  genJql,
  issueTotal,
  issueAll,
} from './App001Data.js';

export default function App001Page() {
  const [lastRefresh, setLastRefresh] = useState(formatLocalStr(null));
  const [totalRow, setTotalRow] = useState(0);

  const [assignee, setAssignee] = useState(defaultDropDownVal);
  const [reporter, setReporter] = useState(defaultDropDownVal);

  const [operator, setOperator] = useState(operatorList[0]);

  const [project, setProject] = useState(defaultDropDownVal);

  const [beginDate, setBeginDate] = useState(defaultBeginVal);
  const [endDate, setEndDate] = useState(defaultEndVal);

  const [pageNo, setPageNo] = useState(0);
  const [rowPerPage, setRowPerPage] = useState(100);

  const [isAutoRefresh, setAutoRefresh] = useState(false);

  const [jiraData, setJiraData] = useState(null);
  const [loading, setLoading] = useState(false);

  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    rowNo: { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
    projectName: { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
    key: { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
    summary: { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
    assignee: { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
    reporter: { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
    status: { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
  });

  const [globalFilterValue, setGlobalFilterValue] = useState('');

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };

    _filters['global'].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const renderHeaderTable = () => {
    return (
      <>
        <h4 className="m-0" style={{ color: 'blue' }}>
          Last Data : {lastRefresh} , Total Row : {totalRow}
        </h4>
        <div className="flex flex-wrap gap-2 justify-content-end align-items-center">
          <h4 className="m-0">ค้นหา</h4>
          <span className="p-input-icon-left">
            <i className="pi pi-search" />
            <InputText
              value={globalFilterValue}
              onChange={onGlobalFilterChange}
              placeholder="Keyword Search"
              style={{ width: '400px' }}
            />
          </span>
        </div>
      </>
    );
  };

  const headerTable = renderHeaderTable();

  const formatDate = (value) => {
    return formatLocalStr(value.substring(0, 19));
  };

  const linkBodyTemplate = (rowData) => {
    const linkStr = `https://jira-sense-info-tech.atlassian.net/browse/` + rowData.key;
    return (
      <a target="_blank" href={linkStr}>
        {rowData.key}
      </a>
    );
  };

  const dateBodyTemplate1 = (rowData) => {
    return formatDate(rowData.created);
  };

  const dateBodyTemplate2 = (rowData) => {
    return formatDate(rowData.updated);
  };

  const getSeverity = (status) => {
    switch (status) {
      case 'Done':
        return 'success';
      case 'To Do':
        return 'warning';
      case 'In Progress':
        return 'info';
      default:
        return null;
    }
  };

  const statusBodyTemplate = (rowData) => {
    return <Tag value={rowData.status} severity={getSeverity(rowData.status)} />;
  };

  let formData = {};

  useEffect(() => {
    initUser();
    initPeoject();

    setRowPerPage(100);
    setPageNo(0);

    return () => {};
  }, []);

  useEffect(() => {
    console.log('Use Effect');

    let id = null;
    if (isAutoRefresh) {
      id = setInterval(() => {
        console.log('Call Interval : ' + id);

        autoBtn.current.click();
      }, 1000 * 60); // 1 minute

      console.log('Set Interval : ' + id);
    }

    return () => {
      if (id != null) {
        clearInterval(id);
        console.log('Clear Interval : ' + id);
      }
    };
  }, [isAutoRefresh]);

  const autoBtn = useRef(null);
  const toast = useRef(null);

  const showPopupMsg = (typeMsg, title, msg, delayMilisec) => {
    toast.current.show({ severity: typeMsg, summary: title, detail: msg, life: delayMilisec });
  };

  async function debugHandler() {
    const data = {
      assignee: assignee.code,
      reporter: reporter.code,
      operator: operator,
      project: project.code,
      beginDate: convertDateTimeToJqlDate(beginDate),
      endDate: convertDateTimeToJqlDate(endDate),
      pageNo: pageNo,
      rowPerPage: rowPerPage,
    };

    showPopupMsg('info', 'Debug', JSON.stringify(data, null, 2), 10000);
  }

  async function genJqlHandler() {
    let formData = computeData();

    let result;

    await genJql(formData)
      .then(function (returnData) {
        result = returnData.jql;
      })
      .catch(function (error) {
        console.log(error);
      });

    showPopupMsg('info', 'JQL', result, 10000);
  }

  async function issueTotalHandler() {
    let formData = computeData();

    let result;

    await issueTotal(formData)
      .then(function (returnData) {
        result = returnData.total;
      })
      .catch(function (error) {
        console.log(error);
      });

    showPopupMsg('info', 'Issue Total', String(result), 10000);
  }

  function clearlHandler() {
    setAssignee(defaultDropDownVal);
    setOperator(operatorList[0]);
    setReporter(defaultDropDownVal);

    setProject(defaultDropDownVal);

    setBeginDate(defaultBeginVal);
    setEndDate(defaultEndVal);
    setPageNo(0);
    setRowPerPage(100);

    setLastRefresh(formatLocalStr(null));
    setTotalRow(0);

    setJiraData(null);
  }

  async function issueAllHandler() {
    setLastRefresh(formatLocalStr(null));
    setLoading(true);

    let formData = computeData();
    formData.pageNo = pageNo;
    formData.rowPerPage = rowPerPage;

    let result;

    showPopupMsg('warn', 'Info', 'Loading Issue All', 10000);

    await issueAll(formData)
      .then(function (returnData) {
        result = returnData;
      })
      .catch(function (error) {
        console.log(error);
      });

    result = genRowNo(result);

    setJiraData(result);

    showPopupMsg('success', 'Info', 'Load Issue All Success', 10000);

    setLoading(false);
    setLastRefresh(formatLocalStr(null));

    setTotalRow(result.length);
  }

  function genRowNo(data) {
    return data.map((item, index) => ({
      ...item,
      rowNo: index + 1,
    }));
  }

  function computeData() {
    formData = {
      beginDate: convertDateTimeToJqlDate(beginDate),
      endDate: convertDateTimeToJqlDate(endDate),
    };

    if (assignee.code != null) {
      formData.assignee = assignee.code;
    }

    if (reporter.code != null) {
      formData.reporter = reporter.code;
    }

    if (assignee.code != null && reporter.code != null) {
      formData.operater = operator;
    }

    if (project.code != null) {
      formData.project = project.code;
    }

    // if (assignee.code == null && reporter.code == null && project.code == null) {
    //   showPopupMsg(
    //     'warn',
    //     'Warning',
    //     'ควรระบุ Assignee, Reporter หรือ Project อย่างน้อย 1 อย่าง เพราะอาจจะได้ข้อมูลที่มากเกินไป',
    //     10000,
    //   );
    // }

    return formData;
  }

  return (
    <>
      <h3>แสดงข้อมูล Issue ของ Jira ตามเงื่อนไขที่ระบุุ</h3>
      <div className="flex flex-wrap gap-2 justify-content-end align-items-center">
        <Checkbox onChange={(e) => setAutoRefresh(e.checked)} checked={isAutoRefresh} />
        &nbsp;&nbsp;&nbsp;
        <label className="font-bold block mb-2">Auto Refresh(every 1 min)</label>
      </div>

      <Accordion multiple activeIndex={[0, 1, 2, 3]}>
        <AccordionTab header="User">
          <div className="grid">
            <div className="col-3">
              <label className="font-bold block mb-2">Assignee</label>
              <Dropdown
                className="w-full"
                value={assignee}
                onChange={(e) => setAssignee(e.value)}
                options={assigneeList}
                optionLabel="name"
                placeholder="Select a Assignee"
              />
            </div>

            <div className="col-2">
              <label className="font-bold block mb-2">Operator</label>
              <SelectButton value={operator} onChange={(e) => setOperator(e.value)} options={operatorList} />
            </div>

            <div className="col-3">
              <label className="font-bold block mb-2">Reporter</label>
              <Dropdown
                className="w-full"
                value={reporter}
                onChange={(e) => setReporter(e.value)}
                options={reporterList}
                optionLabel="name"
                placeholder="Select a Reporter"
              />
            </div>
          </div>
        </AccordionTab>
        <AccordionTab header="Project and Updated Date">
          <div className="grid">
            <div className="col-4">
              <label className="font-bold block mb-2">Project</label>
              <Dropdown
                className="w-full"
                value={project}
                onChange={(e) => setProject(e.value)}
                options={projectList}
                optionLabel="name"
                placeholder="Select a Project"
              />
            </div>
            <div className="col-2">
              <label className="font-bold block mb-2">Begin Date</label>
              <Calendar dateFormat={'yy-mm-dd'} showIcon value={beginDate} onChange={(e) => setBeginDate(e.value)} />
            </div>

            <div className="col-2">
              <label className="font-bold block mb-2">End Date</label>
              <Calendar dateFormat={'yy-mm-dd'} showIcon value={endDate} onChange={(e) => setEndDate(e.value)} />
            </div>
          </div>
        </AccordionTab>

        {/* <AccordionTab header="Page (Optional)">
          <div className="grid">
            <div className="col-3">
              <label className="font-bold block mb-2">Page No</label>
              <InputNumber
                className="w-full"
                inputId="minmax-buttons"
                value={pageNo}
                onValueChange={(e) => setPageNo(e.value)}
                mode="decimal"
                showButtons
                min={0}
                max={100}
              />
            </div>

            <div className="col-2">
              <label className="font-bold block mb-2">Row Per Page</label>
              <InputNumber
                className="w-full"
                inputId="minmax-buttons"
                value={rowPerPage}
                onValueChange={(e) => setRowPerPage(e.value)}
                mode="decimal"
                showButtons
                min={0}
                max={100}
              />
            </div>
            <div className="col-2">
              <label htmlFor="">ccc</label>

              <div className="col-2">0 = all page</div>
            </div>
          </div>
        </AccordionTab> */}
        <AccordionTab header="Command">
          <div className="grid">
            <div className="col-2">
              <Button label="Debug" onClick={debugHandler} />
            </div>
            <div className="col-2">
              <Button severity="info" label="Gen JQL" onClick={genJqlHandler} />
            </div>
            <div className="col-2">
              <Button severity="info" label="Total" onClick={issueTotalHandler} />
            </div>
            <div className="col-2">
              <Button ref={autoBtn} severity="success" label="Execute" onClick={issueAllHandler} />
            </div>

            <div className="col-2">
              <Button severity="danger" label="Clear" onClick={clearlHandler} />
            </div>
          </div>
        </AccordionTab>
        <AccordionTab header="Output Table">
          <DataTable
            value={jiraData}
            showGridlines
            rows={10}
            loading={loading}
            dataKey="key"
            filters={filters}
            filterDisplay="menu"
            globalFilterFields={[
              'projectName',
              'key',
              'summary',
              'assignee',
              'reporter',
              'updated',
              'created',
              'status',
              'rowNo',
            ]}
            rowsPerPageOptions={[10, 20, 25, 50, 100]}
            header={headerTable}
            emptyMessage="No data found."
            paginator
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} rows"
          >
            <Column field="rowNo" header="Row No" sortable filter />
            <Column field="projectName" header="Project Name" sortable filter />
            <Column field="key" header="Key" body={linkBodyTemplate} sortable filter />
            <Column field="summary" header="Summary" sortable filter />
            <Column field="assignee" header="Assignee" sortable filter />
            <Column field="reporter" header="Reporter" sortable filter />
            <Column
              field="status"
              header="Status"
              body={statusBodyTemplate}
              style={{ minWidth: '8rem' }}
              sortable
              filter
            />
            <Column field="created" header="Created" dataType="date" body={dateBodyTemplate1} sortable />
            <Column field="updated" header="Updated" dataType="date" body={dateBodyTemplate2} sortable />
          </DataTable>
        </AccordionTab>
      </Accordion>
      <div className="card flex justify-content-center">
        <Toast ref={toast} />
      </div>
    </>
  );
}
