import { Card } from 'primereact/card';

import { formatLocalStr } from './../../util/util';
import { BUILD_DATE, BUILD_BY } from './../../cont/app-config';

function InfoPage() {
  return (
    <>
      {/* <h3>Home</h3> */}
      <Card title="Jira Info">
        <h3 className="m-5">Last Build : {formatLocalStr(BUILD_DATE)}</h3>
        <h3 className="m-5">By : {BUILD_BY}</h3>
      </Card>
    </>
  );
}

export default InfoPage;
