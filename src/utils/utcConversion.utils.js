// function to convert utc iso time to local time while displaying time from backend
export function isoToLocalInput(ISOString) {
  const date = new Date(ISOString);
  const offset = date.getTimezoneOffset() * 60 * 1000; // in milliseconds
  const localTime = new Date(date.getTime() - offset); // here we get offset in minus already in ist , so -(-) becomes +
  return localTime.toISOString().slice(0, 16);
}

//function to convert local input to iso string - from date picker to iso utc
export function localInputToISO(localInput) {
  return new Date(localInput).toISOString();
}
