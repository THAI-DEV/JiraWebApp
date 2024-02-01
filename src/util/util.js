export function searchObjInArray(valueKey, keyName, dataArray) {
  for (let i = 0; i < dataArray.length; i++) {
    if (dataArray[i][keyName] === valueKey) {
      return dataArray[i];
    }
  }

  return null;
}

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

  // 27/12/2566 00:12:31

  let strTemp = dateVal.toLocaleString('th-TH', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });

  let str1 = strTemp.substring(0, 6);
  let str2 = strTemp.substring(10, 19);

  let yearStr = strTemp.substring(6, 10);

  let year = parseInt(yearStr) - 543;

  yearStr = str1 + String(year) + str2;

  // return dateVal.toLocaleString('th-TH', {
  //   day: '2-digit',
  //   month: '2-digit',
  //   year: 'numeric',
  //   hour: '2-digit',
  //   minute: '2-digit',
  //   second: '2-digit',
  //   hour12: false,
  // });

  return yearStr;
}

function pluralize(count, singular, plural) {
  return count === 1 ? singular : plural ?? `${singular}s`;
}

export function formatDuration(millis) {
  let date = new Date(millis);
  let parts = [];

  if (date.getUTCFullYear() > 1970) {
    let years = date.getUTCFullYear() - 1970;
    parts.push(years, pluralize(years, 'year'));
  }
  if (date.getUTCMonth() > 0) {
    // months start at zero
    let months = date.getUTCMonth();
    parts.push(months, pluralize(months, 'month'));
  }
  if (date.getUTCDate() > 1) {
    let days = date.getUTCDate() - 1;
    parts.push(days, pluralize(days, 'day'));
  }

  parts.push(date.toISOString().substring(11, 19));

  return parts.join(' ');
}

const divMod = (n, m) => [Math.floor(n / m), n % m];

/*  Example:
    let durationFormatter = createDurationFormatter('en-US');
    durationFormatter(new Date(item.updated) - new Date(item.created)) 
*/
export const createDurationFormatter = (locale, unitDisplay = 'long') => {
  const timeUnitFormatter = (locale, unit, unitDisplay) =>
      Intl.NumberFormat(locale, { style: 'unit', unit, unitDisplay }).format,
    fmtDays = timeUnitFormatter(locale, 'day', unitDisplay),
    fmtHours = timeUnitFormatter(locale, 'hour', unitDisplay),
    fmtMinutes = timeUnitFormatter(locale, 'minute', unitDisplay),
    fmtSeconds = timeUnitFormatter(locale, 'second', unitDisplay),
    fmtMilliseconds = timeUnitFormatter(locale, 'millisecond', unitDisplay),
    fmtList = new Intl.ListFormat(locale, { style: 'long', type: 'conjunction' });
  return (milliseconds) => {
    let days, hours, minutes, seconds;
    [days, milliseconds] = divMod(milliseconds, 864e5);
    [hours, milliseconds] = divMod(milliseconds, 36e5);
    [minutes, milliseconds] = divMod(milliseconds, 6e4);
    [seconds, milliseconds] = divMod(milliseconds, 1e3);
    return fmtList.format(
      [
        days ? fmtDays(days) : null,
        hours ? fmtHours(hours) : null,
        minutes ? fmtMinutes(minutes) : null,
        seconds ? fmtSeconds(seconds) : null,
        milliseconds ? fmtMilliseconds(milliseconds) : null,
      ].filter((v) => v !== null),
    );
  };
};
