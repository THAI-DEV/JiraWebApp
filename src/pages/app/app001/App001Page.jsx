import { useState, useEffect, useRef } from 'react';

import { useAtom, useSetAtom } from 'jotai';

import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { SelectButton } from 'primereact/selectbutton';
import { Accordion, AccordionTab } from 'primereact/accordion';
import { Toast } from 'primereact/toast';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { RadioButton } from 'primereact/radiobutton';
import { MultiSelect } from 'primereact/multiselect';
import { InputSwitch } from 'primereact/inputswitch';

import { NonBreakingSpace } from '../../../components/NonBreakingSpace';

import {
  convertDateTimeToJqlDate,
  formatLocalStr,
  createDurationFormatter,
  searchObjInArray,
} from './../../../util/util';
import { authUserInfoAtom } from '../../../store/AuthStore';
import { setTrackAtom } from '../../../store/TrackStore';
import { userInfoData } from '../../../data/nick_name-data';
import { extendUserInfoData } from '../../../data/extend_user-data';

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
  defaultAutoRefreshVal,
  statusCategoryDataList,
  issueAll,
  genJql,
  issueTotal,
} from './App001Data.js';

import useApp001Table from './App001Table';

export default function App001Page() {
  //* TAG  ---- Var (begin) ----
  const [authUserInfo] = useAtom(authUserInfoAtom);
  const setTrack = useSetAtom(setTrackAtom);

  let formData = {};
  // let currentDateForDuration;

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
  const [statusCategorySelectList, setStatusCategorySelectList] = useState(null);

  const [pageNo, setPageNo] = useState(0);
  const [rowPerPage, setRowPerPage] = useState(100);
  const [isAutoRefresh, setAutoRefresh] = useState(false);
  const [isShowOptBtn, setShowOptBtn] = useState(false);
  const [durationType, setDurationType] = useState('1');
  const [isShowNickName, setShowNickName] = useState(false);
  const [jiraData, setJiraData] = useState(null);
  const [loading, setLoading] = useState(false);

  const [countdown, setCountdown] = useState(defaultAutoRefreshVal);

  const [currentDateForDuration, setCurrentDateForDuration] = useState();

  const {
    defaultConfigTable,
    filters,
    setFilters,
    renderHeaderTable,
    linkBodyTemplate1,
    linkBodyTemplate2,
    dateBodyTemplate1,
    dateBodyTemplate2,
    statusBodyTemplate,
    setGlobalFilterValue,
  } = useApp001Table(lastRefresh, totalRow);
  //* TAG ---- State (end) ----

  //* TAG ---- Function (begin) ----
  function computeData() {
    let newEndDate = new Date();
    newEndDate.setDate(endDate.getDate() + 1); //add 1 day

    // console.log('endDate : ', endDate);
    // console.log('newEndDate : ', newEndDate);

    formData = {
      beginDate: convertDateTimeToJqlDate(beginDate),
      endDate: convertDateTimeToJqlDate(newEndDate),
      statusCategoryList: [],
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

    if (statusCategorySelectList) {
      statusCategorySelectList.map((item) => {
        if (item != null) {
          formData.statusCategoryList.push(item.code);
        }
      });
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

    setCurrentDateForDuration(new Date());
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

  function computeDuration(data, durationVal) {
    let durationFormatter = createDurationFormatter('en-US');

    return data.map((item) => {
      let date1;
      let date2;

      if (durationVal === '1') {
        date1 = new Date(item.updated);
        date2 = new Date(item.created);
      }

      if (durationVal === '2') {
        date1 = currentDateForDuration;
        date2 = new Date(item.updated);
      }

      if (durationVal === '3') {
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

  async function execSearch() {
    setLastRefresh(formatLocalStr(null));
    setLoading(true);
    setShowNickName(false);
    setFilters(defaultConfigTable);
    setGlobalFilterValue('');

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

  function showDataTableNickNameHandler(inputData) {
    if (!inputData) {
      return;
    }

    let newDataList = [];
    if (isShowNickName) {
      inputData.map((item) => {
        const findAssigneeData = userInfoData.find((obj) => obj.nickName === item.assignee);
        const findReporterData = userInfoData.find((obj) => obj.nickName === item.reporter);

        const newData = { ...item };

        if (findAssigneeData) {
          newData.assignee = findAssigneeData.displayName;
        }

        if (findReporterData) {
          newData.reporter = findReporterData.displayName;
        }

        newDataList.push(newData);
        setJiraData(newDataList);
      });
    } else {
      inputData.map((item) => {
        const findAssigneeData = userInfoData.find((obj) => obj.displayName === item.assignee);
        const findReporterData = userInfoData.find((obj) => obj.displayName === item.reporter);

        const newData = { ...item };

        if (findAssigneeData) {
          newData.assignee = findAssigneeData.nickName;
        }

        if (findReporterData) {
          newData.reporter = findReporterData.nickName;
        }

        newDataList.push(newData);
        setJiraData(newDataList);
      });
    }
  }

  const showPopupMsg = (typeMsg, title, msg, delayMilisec) => {
    toast.current.show({ severity: typeMsg, summary: title, detail: msg, life: delayMilisec });
  };

  //* TAG ---- Function (end) ----

  //* TAG ---- Effect (begin) ----
  useEffect(() => {
    if (authUserInfo && !authUserInfo.isPassLogin) {
      window.location.href = '#/login';
    }

    return () => {
      setTrack('/app001');
    };
  }, [authUserInfo, setTrack]);

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
  function clearHandler() {
    setAssignee(defaultDropDownVal);
    setOperator(operatorList[0]);
    setReporter(defaultDropDownVal);

    setProject(defaultDropDownVal);

    setBeginDate(defaultBeginVal);
    setEndDate(defaultEndVal);
    setStatusCategorySelectList(null);
    setPageNo(0);
    setRowPerPage(100);

    setLastRefresh(formatLocalStr(null));
    setTotalRow(0);
    setFilters(defaultConfigTable);
    setGlobalFilterValue('');

    setJiraData(null);

    setAutoRefresh(false);
    setCountdown(defaultAutoRefreshVal);
    setShowOptBtn(false);
    setDurationType('1');
    setShowNickName(false);
  }
  function searchHandler() {
    execSearch();
  }

  function changeDurationHandler(val) {
    setDurationType(val);
    if (jiraData && jiraData.length > 0) {
      const result = computeDuration(jiraData, val);
      setJiraData(result);
    }
  }

  async function extendHandler() {
    extendUserInfoData.forEach(function (item) {
      let searchedData = searchObjInArray(item.code, 'code', assigneeList);

      // Not found
      if (searchedData === null) {
        assigneeList.push(item);
        reporterList.push(item);
      }
    });
  }

  async function debugHandler() {
    const data = {
      assignee: assignee.code,
      reporter: reporter.code,
      operator: operator,
      project: project.code,
      beginDate: convertDateTimeToJqlDate(beginDate),
      endDate: convertDateTimeToJqlDate(endDate),
      statusCategoryList: [],
      pageNo: pageNo,
      rowPerPage: rowPerPage,
    };

    if (statusCategorySelectList) {
      statusCategorySelectList.map((item) => {
        if (item != null) {
          data.statusCategoryList.push(item.code);
        }
      });
    }

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
      <h2 style={{ color: 'blue' }}>แสดงข้อมูล Issue ใน Jira ตามเงื่อนไขที่ระบุ</h2>
      <div className="grid">
        <div className="col-3">
          <label className="font-bold block ">&nbsp;</label>
          <InputSwitch
            onChange={(e) => {
              setAutoRefresh(e.value);
              setCountdown(defaultAutoRefreshVal);
            }}
            checked={isAutoRefresh}
          />
          <NonBreakingSpace num={5} />
          <label className="font-bold">
            Auto Refresh(every {defaultAutoRefreshVal / 60} min) [{countdown} second]
          </label>
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

          <br />

          <div className="grid">
            <div className="col-3">
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
            <NonBreakingSpace num={10} />
            <div className="col-2">
              <label className="font-bold block mb-2">Begin Update Date</label>
              <Calendar dateFormat={'yy-mm-dd'} showIcon value={beginDate} onChange={(e) => setBeginDate(e.value)} />
            </div>
            <NonBreakingSpace num={10} />
            <div className="col-2">
              <label className="font-bold block mb-2">End Update Date</label>
              <Calendar dateFormat={'yy-mm-dd'} showIcon value={endDate} onChange={(e) => setEndDate(e.value)} />
            </div>

            <NonBreakingSpace num={14} />
            <div className="col-2">
              <label className="font-bold block mb-2">Status Category</label>
              <div className="flex flex-wrap gap-3">
                <MultiSelect
                  value={statusCategorySelectList}
                  onChange={(e) => setStatusCategorySelectList(e.value)}
                  options={statusCategoryDataList}
                  optionLabel="name"
                  placeholder="Select Status Category"
                  maxSelectedLabels={3}
                  className="w-full md:w-20rem"
                />
              </div>
            </div>
          </div>

          {/* TAG ---- Clear Btn */}
          <div className="col text-center ">
            <label className="font-bold block mb-2">&nbsp;</label>
            <Button severity="danger" label="Clear" onClick={clearHandler} />

            <NonBreakingSpace num={5} />
            <InputSwitch
              onChange={(e) => {
                setShowOptBtn(e.value);
              }}
              checked={isShowOptBtn}
            />
            <NonBreakingSpace num={5} />
            <label className="font-bold">Show Optional (DEV)</label>
          </div>

          <div className="grid">
            <div className="col-12 text-center">
              {/* TAG ---- Optional Command Btn */}
              <span hidden={!isShowOptBtn}>
                <NonBreakingSpace num={10} />
                <Button label="Extend User" onClick={extendHandler} />
                <NonBreakingSpace num={10} />
                <Button label="Debug" onClick={debugHandler} />
                <NonBreakingSpace num={10} />
                <Button severity="info" label="Gen JQL" onClick={genJqlHandler} />
                <NonBreakingSpace num={10} />
                <Button severity="info" label="Count Total" onClick={countTotalHandler} />
              </span>
            </div>
          </div>
        </AccordionTab>

        {/* TAG ---- Table */}
        <AccordionTab header="Output Table">
          <div className="grid">
            <div className="col-2">
              <div className="align-items-left">
                <InputSwitch
                  onChange={(e) => {
                    setShowNickName(e.value);
                    showDataTableNickNameHandler(jiraData);
                  }}
                  checked={isShowNickName}
                />
                <NonBreakingSpace num={5} />
                <label className="font-bold">Show As NickName</label>
              </div>
            </div>

            {/* TAG ---- Duration */}

            <div className="col">
              <label className="font-bold">Duration Formula</label>

              <div className="flex flex-wrap gap-5">
                <div className="flex align-items-center">
                  <RadioButton
                    inputId="durationType1"
                    name="durationType"
                    value="1"
                    onChange={(e) => changeDurationHandler(e.value)}
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
                    onChange={(e) => changeDurationHandler(e.value)}
                    checked={durationType === '2'}
                  />
                  <label htmlFor="durationType2" className="ml-2">
                    Duration = Last Date - Updated Date
                  </label>
                </div>
                <div className="flex align-items-center">
                  <RadioButton
                    inputId="durationType3"
                    name="durationType"
                    value="3"
                    onChange={(e) => changeDurationHandler(e.value)}
                    checked={durationType === '3'}
                  />
                  <label htmlFor="durationType3" className="ml-2">
                    Duration = Last Date - Created Date
                  </label>
                </div>
              </div>
            </div>
          </div>

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
              'parentKey',
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
            header={renderHeaderTable}
            emptyMessage="No data found."
            paginator
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} rows"
          >
            <Column field="rowNo" header="Row No" sortable filter />
            <Column field="projectName" header="Project Name" sortable filter />
            <Column field="key" header="Key" body={linkBodyTemplate1} sortable filter />
            <Column field="parentKey" header="Parent" body={linkBodyTemplate2} sortable filter />
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
