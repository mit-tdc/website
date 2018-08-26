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
 * @param date {String} a string of the format YYYY-MM-DD
 * @param time {String} a string of the format HH:MM:SS
 * @param increment_mils {Integer} increment the time by this much
 * @return {Integer}
 **/
TimeUtil.getIncrementedTimeInMils = function (date, time, increment_mils){
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
