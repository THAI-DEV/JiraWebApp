import { REST_BASE_URL } from './../../cont/cont';

export async function projectAllRest() {
  let url = REST_BASE_URL + '/projectAll';

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
  let url = REST_BASE_URL + '/userAll';

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const result = await response.json();
  return result;
}

export async function genJqlRest(formData) {
  let url = REST_BASE_URL + '/genJql';

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });

  const result = await response.json();
  return result;
}

export async function issueTotalRest(formData) {
  let url = REST_BASE_URL + '/issueTotal';

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });

  const result = await response.json();
  return result;
}

export async function issueAllRest(formData) {
  let url = REST_BASE_URL + '/issueAll';

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });

  const result = await response.json();
  return result;
}
