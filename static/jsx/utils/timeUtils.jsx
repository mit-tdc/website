"use strict";
/**
 * by convention, we use the following in this file:
 *   mils -> millisecond(s)
 *   hr   -> hour(s)
 *   min  -> minute(s)
 *   sec  -> second(s)
 * */
const TimeUtil = {
  HOUR_MILS: 3600 * 1000,
  MIN_MILS: 60 * 1000,
  SEC_MILS: 1000,
};
/**
 * @param date {String} a string of the format YYYY-MM-DD
 * @param time {String} a string of the format HH:MM:SS
 * @return {Boolean}
 **/
TimeUtil.isDatePassed = function (date, time){
  return new Date(date + "T" + time) < Date.now();
};
/**
 * @param time_mils {Integer} time in milliseconds
 * @return {Boolean}
 **/
TimeUtil.isTimeMilsPassed = function (time_mils){
  return time_mils < Date.now();
};
/**
 * @param date {String} a string of the format YYYY-MM-DD
 * @param time {String} a string of the format HH:MM:SS
 * @param increment_mils {Integer} increment the time by this much
 * @return {Integer}
 **/
TimeUtil.getIncrementedDateInMils = function (date, time, increment_mils){
  return new Date(date + "T" + time).getTime() + increment_mils;
};
/**
 * @param duration {String} a string of the format HH:MM:SS
 * @return {Integer}
 */
TimeUtil.convertDurationToMils = function (duration){
  const [hr, min, sec] = duration.split(/:/g);
  return parseInt(hr) * TimeUtil.HOUR_MILS +
    parseInt(min) * TimeUtil.MIN_MILS +
    parseInt(sec) * TimeUtil.SEC_MILS;
};
/**
 * @return {Integer}
 * */
TimeUtil.getCurrentYear = () => new Date(Date.now()).getFullYear();
/**
 * converts a date of the type "YYYY-MM-DD" into a date of the
 * type "month day, year".
 * @param date {String} a string of the format YYYY-MM-DD
 * @return {String}
 * */
TimeUtil.convertDateToReadableFormat = function (date){
  const [year, month, day] = date.split(/-/g);
  return `${TimeUtil.convertMonthNumberToMonth(month)} ${parseInt(day)}, ${year}`;
};
/**
 * converts a number month into a string month with 01 as January
 * @param month {String} a string of the format MM for the month
 * @return {String}
 * */
TimeUtil.convertMonthNumberToMonth = function (month){
  return {
    "01": "January", "1": "January",
    "02": "February", "2": "February",
    "03": "March", "3": "March",
    "04": "April", "4": "April",
    "05": "May", "5": "May",
    "06": "June", "6": "June",
    "07": "July", "7": "July",
    "08": "August", "8": "August",
    "09": "September", "9": "September",
    "10": "October",
    "11": "November",
    "12": "December",
  }[month];
};
/**
 * converts a time of the form HH:MM:SS into HH:MM {AM|PM}
 * we drop the seconds.
 * @param time {String} string of the format HH:MM:SS
 * @return {String}
 * */
TimeUtil.convertTimeToPM = function(time) {
  const [hr, min, _] = time.split(/:/g);
  const int_hr = parseInt(hr);
  const hr_12_format = int_hr > 12 ? int_hr - 12 : int_hr;
  return `${hr_12_format}:${min} ${int_hr > 11 ? "pm" : "am"}`;
};
