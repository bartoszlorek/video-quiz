export function createTimestampHandler(callback) {
  let prevTimestamp;

  return event => {
    const time = event.target.currentTime;
    const timestamp = new Date(time * 1000).toISOString().substr(11, 8);

    if (prevTimestamp !== timestamp) {
      prevTimestamp = timestamp;
      callback(timestamp);
    }
  };
}
