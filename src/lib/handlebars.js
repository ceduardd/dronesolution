const { format } = require('timeago.js');

const helpers = {};

helpers.formatDate = (date) => {
  const day = addZero(date.getDate());
  const month = addZero(date.getMonth() + 1);
  const year = date.getFullYear();

  return `${year}-${month}-${day}`;
};

helpers.formatHour = (date) => {
  const hours = addZero(date.getHours());
  const minutes = addZero(date.getMinutes());

  return `${hours}:${minutes}`;
};

helpers.formatPercent = (decimalNumber) => {
  return decimalNumber * 100;
};

helpers.formatAgo = (timestamp) => {
  return format(timestamp);
};

function addZero(number) {
  if (number < 10) {
    number = '0' + number;
  }
  return number;
}

module.exports = helpers;
