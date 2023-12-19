export async function projectAllRest() {
  let url = import.meta.env.VITE_REST_BASE_URL + '/projectAll';

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const result = await response.json(); // console.log(JSON.stringify(result));
  return result;
}

export async function userAllRest() {
  let url = import.meta.env.VITE_REST_BASE_URL + '/userAll';

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const result = await response.json();
  return result;
}
