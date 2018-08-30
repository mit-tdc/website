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
  ZERO_DURATION: "00:00:00",
};
/**
 * different browsers handle the time differently. when calling
 * new Date(date+"T"+time):
 *   chrome thinks the input is in the current timezone
 *   safari thinks the input is in GMT-0 timezone
 * */
TimeUtil.getTimeOffsetMils = function() {
  const is_chrome = /(chrome|crios)/gi.test(navigator.userAgent);
  if (is_chrome) {
    return 0;
  }
  // since safari on apple products assumes the input time is in
  // gmt-0, we need to get back those hours by adding 4 to Cambridge
  // times. the reason is because it eventually returns the result
  // with gmt-4.
  const is_safari = /Safari/gi.test(navigator.userAgent);
  if (is_safari) {
    return 4 * TimeUtil.HOUR_MILS;
  }
  return 0;
};
/**
 * @param date {String} a string of the format YYYY-MM-DD
 * @param time {String} a string of the format HH:MM:SS
 * @param increment_mils {Integer} increment the time by this much
 * @return {Integer}
 * */
TimeUtil.getIncrementedDateInMils = function (date, time, increment_mils){
  return new Date(date + "T" + time).getTime() +
    TimeUtil.getTimeOffsetMils() +
    (increment_mils || 0);
};
/**
 * @param date {String} a string of the format YYYY-MM-DD
 * @param time {String} a string of the format HH:MM:SS
 * @return {Boolean}
 * */
TimeUtil.isDatePassed = function (date, time){
  return TimeUtil.getIncrementedDateInMils(date, time, 0) < Date.now();
};
/**
 * @param time_mils {Integer} time in milliseconds
 * @return {Boolean}
 * */
TimeUtil.isTimeMilsPassed = function (time_mils){
  return time_mils < Date.now();
};

/**
 * @param date {String} a string of the format YYYY-MM-DD
 * @return {Integer}
 * */
TimeUtil.getDateInMils = function (date){
  return new Date(date).getTime() + TimeUtil.getTimeOffsetMils();
};
/**
 * @param duration {String} a string of the format HH:MM:SS
 * @return {Integer}
 * */
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
TimeUtil.convertTimeToPM = function (time){
  const [hr, min, _] = time.split(/:/g);
  const int_hr = parseInt(hr);
  const hr_12_format = int_hr > 12 ? int_hr - 12 : int_hr;
  return `${hr_12_format}:${min} ${int_hr > 11 ? "pm" : "am"}`;
};
/**
 * if this is happening soon, which means happening in less than
 * 1 hour, then this will return true in the key "soon" and how
 * long soon in the key "time".
 * @param date {String} a string of the format YYYY-MM-DD
 * @param time {String} a string of the format HH:MM:SS
 * @return {Object}
 *   object of the form {time: Integer, soon: Boolean}
 *   the time object is expressed in minutes and represents
 *   how soon this event is happening. a negative value means
 *   the event has already started or has already happened.
 * */
TimeUtil.isDateTimeSoon = function (date, time){
  const date_mils = TimeUtil.getIncrementedDateInMils(date, time, 0);
  const now_mils = Date.now();
  const time_soon = date_mils - now_mils;
  return {
    time: Math.ceil(time_soon / TimeUtil.MIN_MILS),
    soon: time_soon <= TimeUtil.HOUR_MILS && time_soon > 0,
  };
};
/**
 * if this is just happened, that is, happened less than 30 min,
 * then this will return true.
 * @param date {String} a string of the format YYYY-MM-DD
 * @param time_ {String} a string of the format HH:MM:SS
 * @param duration {String} a string of the format HH:MM:SS
 * @return {Object}
 *   object of the form {time: Integer, just_happened: Boolean}
 *   the time object is expressed in minutes, which represents
 *   how long ago it has happened. a negative value means it's
 *   still happening or hasn't happened yet.
 * */
TimeUtil.isDateTimeJustHappened = function (date, time_, duration = TimeUtil.ZERO_DURATION){
  const date_mils = TimeUtil.getIncrementedDateInMils(
    date,
    time_,
    TimeUtil.convertDurationToMils(duration)
  );
  const now_mils = Date.now();
  const time_happened_min = Math.ceil((now_mils - date_mils) / TimeUtil.MIN_MILS);
  return {
    time: time_happened_min,
    just_happened: time_happened_min > 0 && time_happened_min <= 30,
  };
};
/**
 * if this happened already, that is, happened and at least 30 min,
 * has passed, the this returns true. otherwise returns false.
 * @param date {String} a string of the format YYYY-MM-DD
 * @param time_ {String} a string of the format HH:MM:SS
 * @param duration {String} a string of the format HH:MM:SS
 * @return {Boolean}
 * */
TimeUtil.isDateTimeHappened = function (date, time_, duration = TimeUtil.ZERO_DURATION){
  const date_mils = TimeUtil.getIncrementedDateInMils(
    date,
    time_,
    TimeUtil.convertDurationToMils(duration)
  );
  return (date_mils + (30 * TimeUtil.MIN_MILS) - Date.now()) < 0;
};
/**
 * if this happening right now, then this returns true
 * @param date {String} a string of the format YYYY-MM-DD
 * @param time_ {String} a string of the format HH:MM:SS
 * @param duration {String} a string of the format HH:MM:SS
 * @return {Boolean}
 * */
TimeUtil.isDateTimeHappeningNow = function (date, time_, duration = TimeUtil.ZERO_DURATION){
  const {time} = TimeUtil.isDateTimeSoon(date, time_);
  const duration_min = Math.ceil(TimeUtil.convertDurationToMils(duration) / TimeUtil.MIN_MILS);
  return time <= 0 && Math.abs(time) < duration_min;
};