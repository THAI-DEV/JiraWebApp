import { Card } from 'primereact/card';

import { formatLocalStr } from './../../util/util';
import { BUILD_DATE, BUILD_BY } from './../../cont/app-config';
import { REST_BASE_URL } from './../../cont/cont';

function InfoPage() {
  return (
    <>
      {/* <h3>Home</h3> */}
      <Card title="Jira Info">
        <h4 className="m-5">Jira Rest Service : {REST_BASE_URL}</h4>
        <hr />
        <h3 className="m-5">Last Build : {formatLocalStr(BUILD_DATE)}</h3>
        <h3 className="m-5">By : {BUILD_BY}</h3>
      </Card>
    </>
  );
}

export default InfoPage;
