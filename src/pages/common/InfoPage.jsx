/* eslint-disable no-undef */
import { Card } from 'primereact/card';

import { formatLocalStr } from './../../util/util.js';

function InfoPage() {
  const buildDate = __BUILD_DATE__;
  const buildBy = __BUILD_BY__;
  return (
    <>
      {/* <h3>Home</h3> */}
      <Card title="Jira Info">
        <h3 className="m-5">Last Build : {formatLocalStr(buildDate)}</h3>
        <h3 className="m-5">By : {buildBy}</h3>
      </Card>
    </>
  );
}

export default InfoPage;
