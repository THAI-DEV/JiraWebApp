import { useEffect } from 'react';

import { useAtom, useSetAtom } from 'jotai';

import { authUserInfoAtom } from '../../../store/AuthStore';
import { setTrackAtom } from '../../../store/TrackStore';

export default function App002Page() {
  const [authUserInfo] = useAtom(authUserInfoAtom);
  const setTrack = useSetAtom(setTrackAtom);

  useEffect(() => {
    if (authUserInfo && !authUserInfo.isPassLogin) {
      window.location.href = '#/login';
    }

    return () => {
      setTrack('/app002');
    };
  }, [authUserInfo, setTrack]);

  return (
    <>
      <h2 style={{ color: 'blue' }}>Link ไป Jira_RSSFeed</h2>
      <br />
      <h3>
        <a href="https://ruangdech.atlassian.net/jira/dashboards/10001" target="_blank">
          Open Activity Streams
        </a>
      </h3>
      <br />
      <br />
      <div>หมายเหตุ : ต้องมีสิทธิ์ Access Board Jira_SENSE_RSSFeed ได้ด้วย</div>
    </>
  );
}
