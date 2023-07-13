function formatDate(date) {
  let d = new Date(date);
  let year = d.getUTCFullYear();
  let month = ("0" + (d.getUTCMonth() + 1)).slice(-2);
  let day = ("0" + d.getUTCDate()).slice(-2);
  let hour = ("0" + d.getUTCHours()).slice(-2);
  let minute = ("0" + d.getUTCMinutes()).slice(-2);
  let second = ("0" + d.getUTCSeconds()).slice(-2);

  return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
}

module.exports = {
  formatDate
}
