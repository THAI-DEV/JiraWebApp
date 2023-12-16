async function projectAll() {
  let url = import.meta.env.VITE_REST_BASE_URL + '/projectAll';

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const result = await response.json();

  //   console.log(JSON.stringify(result));

  return result;
}

export { projectAll };
