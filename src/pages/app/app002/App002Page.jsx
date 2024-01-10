import { useEffect } from 'react';

import { useAtom } from 'jotai';

import { authUserInfoAtom } from '../../../store/store';

export default function App002Page() {
  const [authUserInfo] = useAtom(authUserInfoAtom);

  useEffect(() => {
    if (authUserInfo && !authUserInfo.isPassLogin) {
      window.location.href = '#/login';
    }

    return () => {};
  }, [authUserInfo]);

  return (
    <>
      <h2 style={{ color: 'blue' }}>Link ไป Jira_SENSE_RSSFeed</h2>
      <br />
      <h3>
        <a href="https://jira-sense-info-tech.atlassian.net/jira/dashboards/10003" target="_blank">
          Open Activity Streams
        </a>
      </h3>
      <br />
      <br />
      <div>หมายเหตุ : ต้องมีสิทธิ์ Access Board Jira_SENSE_RSSFeed ได้ด้วย</div>
    </>
  );
}
