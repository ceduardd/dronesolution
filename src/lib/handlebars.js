const helpers = {};

helpers.formatDate = (date) => {
  const month = date.getMonth() + 1; // getMonth() returns arrys with numbers of the months 0-11
  const day = date.getDate();
  let monthFormated = month;
  let dayFormated = day;
  if (month < 10) {
    monthFormated = `0${month}`; // format mont or day with number less than 10
  }
  if (day < 10) {
    dayFormated = `0${day}`;
  }

  return `${date.getFullYear()}-${monthFormated}-${dayFormated}`; //dd-MM-yyyy
};

module.exports = helpers;
