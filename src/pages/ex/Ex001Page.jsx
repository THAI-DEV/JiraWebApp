import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/UseAuth';

function Ex001Page() {
  const initData = [{ name: 'a' }, { name: 'b' }, { name: 'c' }];
  const { username, loginHandler } = useAuth();

  useEffect(() => {
    loginHandler();
  }, [loginHandler]);

  // const list = useMemo(() => {
  //   return initData;
  // }, []);

  const [list, setList] = useState(initData);

  function deleteHandler(i) {
    setList([...list.slice(0, i), ...list.slice(i + 1)]);
  }

  return (
    <>
      <h3>Ex01</h3>
      {/* <CounterSignal /> */}
      {list.map((item, index) => (
        <div key={index}>
          {item.name} <button onClick={() => deleteHandler(index)}>Delete</button>
        </div>
      ))}
      <button
        onClick={() => {
          // loginHandler();
          console.log(username);
        }}
      >
        exe
      </button>
    </>
  );
}

export default Ex001Page;
