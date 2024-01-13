import { useState } from 'react';

import { Tag } from 'primereact/tag';
import { formatLocalStr } from '../../../util/util';

import { InputText } from 'primereact/inputtext';

import { NonBreakingSpace } from '../../../components/NonBreakingSpace';

import { FilterMatchMode, FilterOperator } from 'primereact/api';

export default function useApp001Table(lastRefresh, totalRow) {
  const defaultConfigTable = {
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    rowNo: { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
    projectName: { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
    key: { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
    parentKey: { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
    summary: { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
    assignee: { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
    reporter: { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
    status: { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
    created: { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
    updated: { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
    duration: { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
  };

  const [filters, setFilters] = useState(defaultConfigTable);

  const [globalFilterValue, setGlobalFilterValue] = useState('');

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

  const formatDate = (value) => {
    return formatLocalStr(value.substring(0, 19));
  };

  const linkBodyTemplate1 = (rowData) => {
    const linkStr = `https://jira-sense-info-tech.atlassian.net/browse/` + rowData.key;
    return (
      <a target="_blank" href={linkStr}>
        {rowData.key}
      </a>
    );
  };

  const linkBodyTemplate2 = (rowData) => {
    const linkStr = `https://jira-sense-info-tech.atlassian.net/browse/` + rowData.parentKey;

    if (rowData.parentKey === 'none') {
      return <div>{''}</div>;
    }

    return (
      <a target="_blank" href={linkStr}>
        {rowData.parentKey}
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

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };

    _filters['global'].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  return {
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
  };
}
