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
import { RadioButton } from 'primereact/radiobutton';

import { NonBreakingSpace } from '../../../components/NonBreakingSpace.jsx';

import { convertDateTimeToJqlDate, formatLocalStr, createDurationFormatter } from './../../../util/util.js';

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
  issueAll,
  genJql,
  issueTotal,
} from './App001Data.js';

export default function App001Page() {
  //* TAG  ---- Var (begin) ----
  const defaultAutoRefreshVal = 60; // 1 minute
  let formData = {};
  let currentDateForDuration;
  //* TAG  ---- Var (end) ----

  //* TAG ---- State (begin) ----
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
  const [isShowOptBtn, setShowOptBtn] = useState(false);
  const [durationType, setDurationType] = useState('1');
  const [jiraData, setJiraData] = useState(null);
  const [loading, setLoading] = useState(false);

  const [countdown, setCountdown] = useState(defaultAutoRefreshVal);

  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    rowNo: { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
    projectName: { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
    key: { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
    summary: { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
    assignee: { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
    reporter: { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
    status: { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
    created: { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
    updated: { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
    duration: { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
  });

  const [globalFilterValue, setGlobalFilterValue] = useState('');
  //* TAG ---- State (end) ----

  //* TAG ---- Function (begin) ----
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

    return formData;
  }

  function genRowNo(data) {
    return data.map((item, index) => ({
      ...item,
      rowNo: index + 1,
    }));
  }

  function genDuration(data) {
    let durationFormatter = createDurationFormatter('en-US');

    currentDateForDuration = new Date();
    return data.map((item) => {
      let date1;
      let date2;

      if (durationType === '1') {
        date1 = new Date(item.updated);
        date2 = new Date(item.created);
      }

      if (durationType === '2') {
        date1 = currentDateForDuration;
        date2 = new Date(item.updated);
      }

      if (durationType === '3') {
        date1 = currentDateForDuration;
        date2 = new Date(item.created);
      }

      let diff = date1 - date2;

      return {
        ...item,
        duration: durationFormatter(diff),
      };
    });
  }

  const formatDate = (value) => {
    return formatLocalStr(value.substring(0, 19));
  };

  async function execSearch() {
    setLastRefresh(formatLocalStr(null));
    setLoading(true);

    let formData = computeData();
    formData.pageNo = pageNo;
    formData.rowPerPage = rowPerPage;

    let result;

    showPopupMsg('warn', 'Info', 'Loading Issue All', 5000);

    await issueAll(formData)
      .then(function (returnData) {
        result = returnData;
      })
      .catch(function (error) {
        console.log(error);
      });

    result = genRowNo(result);

    result = genDuration(result);

    setJiraData(result);

    showPopupMsg('success', 'Info', 'Load Issue All Success', 5000);

    setLoading(false);
    setLastRefresh(formatLocalStr(currentDateForDuration));

    setTotalRow(result.length);
  }

  const showPopupMsg = (typeMsg, title, msg, delayMilisec) => {
    toast.current.show({ severity: typeMsg, summary: title, detail: msg, life: delayMilisec });
  };

  //* TAG ---- Function (end) ----

  //* TAG ---- For Data Table (begin) ----
  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };

    _filters['global'].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  //* TAG ---- Head Table ---- */
  const renderHeaderTable = () => {
    return (
      <div className="grid">
        <div className="col-3">
          <div className="m-2" style={{ color: 'blue' }}>
            Last Data : {lastRefresh} , Total Row : {totalRow}
          </div>
        </div>

        <div className="col-9 text-right">
          <label>Filter Data</label>
          <NonBreakingSpace num={3} />
          <span className="p-input-icon-left">
            <i className="pi pi-search" />
            <InputText
              value={globalFilterValue}
              onChange={onGlobalFilterChange}
              placeholder="Keyword Filter"
              style={{ width: '400px' }}
            />
          </span>
        </div>
      </div>
    );
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
  //* TAG ---- For Data Table (end) ----

  //* TAG ---- Effect (begin) ----
  useEffect(() => {
    initUser();
    initPeoject();

    setRowPerPage(100);
    setPageNo(0);

    return () => {};
  }, []);

  useEffect(() => {
    // console.log('Use Effect');
    let id = null;
    if (isAutoRefresh) {
      id = setInterval(() => {
        setCountdown((prev) => prev - 1);
        if (countdown <= 1) {
          setCountdown(defaultAutoRefreshVal);
          execSearch();
          // autoBtn.current.click();
          // console.log('Call Interval : ' + id);
        }
      }, 1000);
    }
    return () => {
      if (id != null) {
        clearTimeout(id);
        // console.log('Clear Interval : ' + id);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAutoRefresh, countdown]);
  //* TAG ---- Effect (end) ----

  //* TAG ---- Ref (begin) ----
  const toast = useRef(null);
  //* TAG ---- Ref (end) ----

  //* TAG ---- Handler (begin) ----
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

    setAutoRefresh(false);
    setCountdown(defaultAutoRefreshVal);
    setShowOptBtn(false);
    setDurationType('1');
  }
  function searchHandler() {
    execSearch();
  }

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

  async function countTotalHandler() {
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

  function sameReporterHandle() {
    setAssignee(reporter);
  }

  function sameAssigneeHandle() {
    setReporter(assignee);
  }
  //* TAG ---- Handler (end) ----

  //* TAG ---- Display Html (begin) ----
  return (
    <>
      <h2 style={{ color: 'blue' }}>แสดงข้อมูล Issue ใน Jira ตามเงื่อนไขที่ระบุุ</h2>
      <div className="grid">
        <div className="col-2">
          <label className="font-bold block ">&nbsp;</label>
          <Checkbox
            onChange={(e) => {
              setAutoRefresh(e.checked);
              setCountdown(defaultAutoRefreshVal);
            }}
            checked={isAutoRefresh}
          />
          <NonBreakingSpace num={5} />
          <label className="font-bold">Auto Refresh(every 1 min) [{countdown}]</label>
        </div>
        {/* TAG ---- Search Btn */}
        <div className="col-2 ">
          <NonBreakingSpace num={30}></NonBreakingSpace>
          <Button severity="success" label="Search" onClick={searchHandler} />
        </div>
      </div>

      <Accordion multiple activeIndex={[0, 1]}>
        {/* TAG ---- Condition */}
        <AccordionTab header="Search Condition">
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
              <label className="font-bold block mb-2">&nbsp;</label>
              <Button severity="primary" label="Same Reporter" onClick={sameReporterHandle} />
            </div>

            <div className="col-2">
              <label className="font-bold block mb-2">Operator</label>
              <SelectButton
                value={operator}
                onChange={(e) => setOperator(e.value)}
                options={operatorList}
                allowEmpty={false}
              />
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
            <div className="col-2">
              <label className="font-bold block mb-2">&nbsp;</label>
              <Button severity="primary" label="Same Assignee" onClick={sameAssigneeHandle} />
            </div>
          </div>

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
              <label className="font-bold block mb-2">Begin Update Date</label>
              <Calendar dateFormat={'yy-mm-dd'} showIcon value={beginDate} onChange={(e) => setBeginDate(e.value)} />
            </div>
            <div className="col-2">
              <label className="font-bold block mb-2">End Update Date</label>
              <Calendar dateFormat={'yy-mm-dd'} showIcon value={endDate} onChange={(e) => setEndDate(e.value)} />
            </div>

            {/* TAG ---- Clear Btn */}
            <div className="col-4 ">
              <label className="font-bold block mb-2">&nbsp;</label>
              <Button severity="danger" label="Clear" onClick={clearlHandler} />

              <NonBreakingSpace num={5} />
              <Checkbox
                onChange={(e) => {
                  setShowOptBtn(e.checked);
                }}
                checked={isShowOptBtn}
              />
              <NonBreakingSpace num={5} />
              <label className="font-bold">Show Optional (DEV)</label>
            </div>
          </div>

          <div className="grid">
            <div className="col-12 text-right">
              {/* TAG ---- Optional Command Btn */}
              <span hidden={!isShowOptBtn}>
                <NonBreakingSpace num={10} />
                <Button label="Debug" onClick={debugHandler} />
                <NonBreakingSpace num={10} />
                <Button severity="info" label="Gen JQL" onClick={genJqlHandler} />
                <NonBreakingSpace num={10} />
                <Button severity="info" label="Count Total" onClick={countTotalHandler} />
              </span>
            </div>
          </div>

          <div className="grid">
            <div className="col">
              <label className="font-bold">Duration Formula</label>

              <div className="flex flex-wrap gap-3">
                <div className="flex align-items-center">
                  <RadioButton
                    inputId="durationType1"
                    name="durationType"
                    value="1"
                    onChange={(e) => setDurationType(e.value)}
                    checked={durationType === '1'}
                  />
                  <label htmlFor="durationType1" className="ml-2">
                    Duration = Updated Date - Created Date
                  </label>
                </div>
                <div className="flex align-items-center">
                  <RadioButton
                    inputId="durationType2"
                    name="durationType"
                    value="2"
                    onChange={(e) => setDurationType(e.value)}
                    checked={durationType === '2'}
                  />
                  <label htmlFor="durationType2" className="ml-2">
                    Duration = Current Date - Updated Date
                  </label>
                </div>
                <div className="flex align-items-center">
                  <RadioButton
                    inputId="durationType3"
                    name="durationType"
                    value="3"
                    onChange={(e) => setDurationType(e.value)}
                    checked={durationType === '3'}
                  />
                  <label htmlFor="durationType3" className="ml-2">
                    Duration = Current Date - Created Date
                  </label>
                </div>
              </div>
            </div>
          </div>
        </AccordionTab>

        {/* TAG ---- Table */}
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
              'duration',
            ]}
            rowsPerPageOptions={[10, 20, 30, 50, 100]}
            header={renderHeaderTable()}
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
            <Column field="created" header="Created" dataType="date" body={dateBodyTemplate1} sortable filter />
            <Column field="updated" header="Updated" dataType="date" body={dateBodyTemplate2} sortable filter />
            <Column field="duration" header="Duration" sortable filter />
          </DataTable>
        </AccordionTab>
      </Accordion>
      <div className="card flex justify-content-center">
        <Toast ref={toast} />
      </div>
    </>
  );
  //* TAG ---- Display Html (end) ----
}
