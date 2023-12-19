export function today() {
  const today = new Date();
  // const dd = String(today.getDate()).padStart(2, '0');
  // const mm = String(today.getMonth() + 1).padStart(2, '0');
  // const yyyy = today.getFullYear();

  // const result = yyyy + '-' + mm + '-' + dd;

  return today;
}

export function tomorrow() {
  const today = new Date();

  //add 1 day
  const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);
  return tomorrow;
}

export function convertDateTimeToJqlDate(inputDate) {
  // const today = new Date();
  const dd = String(inputDate.getDate()).padStart(2, '0');
  const mm = String(inputDate.getMonth() + 1).padStart(2, '0');
  const yyyy = inputDate.getFullYear();

  const result = yyyy + '-' + mm + '-' + dd;

  return result;
}

export function formatLocalStr(value) {
  let dateVal = new Date();
  if (value !== null) {
    dateVal = new Date(value);
  }

  return dateVal.toLocaleString('th-TH', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });
}
