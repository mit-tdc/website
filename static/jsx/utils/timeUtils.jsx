"use strict";
const TimeUtil = {};
TimeUtil.Time = class {
  /**
   * we use GMT-7 times, so we'll reduce the time by 7 hours
   * @param date: a string of the format 'YYYY-MM-DD'
   * @param time: a string of the format 'HH:MM:SS'
   *
   **/
  constructor(date, time){
    // this is a time object with time in GMT-0. We give it time in
    // pacific time. to convert back to GMT-0, we add SEVEN_HOURS
    self.time = new Date(new Date(date + "T" + time).getTime() + TimeUtil.Time.SEVEN_HOURS);
  }

  static convertTimeStringToMilliseconds(time_string){
    const [hours, minutes, seconds] = time_string.split(/:/g);
    return TimeUtil.Time.hoursInMilliseconds(parseInt(hours)) +
      TimeUtil.Time.minutesInMilliseconds(parseInt(minutes)) +
      TimeUtil.Time.secondsInMilliseconds(parseInt(seconds));
  }

  static get SEVEN_HOURS(){
    return TimeUtil.Time.hoursInMilliseconds(7);
  }

  static hoursInMilliseconds(hours){
    return hours * TimeUtil.Time.minutesInMilliseconds(60);
  }

  static minutesInMilliseconds(minutes){
    return minutes * TimeUtil.Time.secondsInMilliseconds(60);
  }

  static secondsInMilliseconds(seconds){
    return seconds * 1000;
  }

  getTimeInMillisecondsWithOffsetMilliseconds(offset){
    return self.time.getTime() + offset;
  }

  getTimeInMillisecondsWithHoursOffset(hours){
    return self.getTimeInMillisecondsWithOffsetMilliseconds(0) +
      TimeUtil.Time.hoursInMilliseconds(hours);
  }
};