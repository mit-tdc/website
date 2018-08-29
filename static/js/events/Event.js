"use strict";
/* global React, TimeUtil */

/* global XLightShadedBoxView */
/**
 * event Object Structure
 *   name {String} a short text naming the event
 *   description {String} a long text describing the event
 *   location_name {String} short text of location
 *   location {String} short text of location
 *   date {String} must be of format YYYY-MM-DD
 *   time {String} must be of format HH:MM:SS
 *   duration {String} must be of format HH:MM:SS
 *   category {Array[String]} one of EVENT_GROUP_CONSTANTS.CATEGORIES
 * */

class EventContainer extends React.Component {
  /**
   * expected props keys (all of type String):
   *   name, description, location, date, time, duration, category
   * */
  constructor(props) {
    super(props);
  }

  render() {
    return React.createElement(EventView, this.props);
  }
}

function EventView(props) {
  /**
   * expected props keys (all of type String):
   *   name, description, location, date, time, duration, category
   **/
  const { name, description, location_name, location, date, time, duration, category } = props;
  const date_readable = TimeUtil.convertDateToReadableFormat(date);
  const time_readable = TimeUtil.convertTimeToPM(time);
  return React.createElement(
    "span",
    { className: "event" },
    React.createElement(
      "span",
      { className: "event-title" },
      name
    ),
    React.createElement(EventIndicatorView, { date: date, time: time, duration: duration }),
    React.createElement(
      "span",
      { className: "event-time" },
      "On ",
      date_readable,
      " at ",
      time_readable
    ),
    React.createElement(
      "span",
      { className: "event-location" },
      location_name,
      ", ",
      location
    ),
    React.createElement(EventCategoryView, { categories: category }),
    React.createElement(
      "span",
      { className: "event-description" },
      description
    )
  );
}

class EventIndicatorView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      interval: undefined
    };
  }

  componentDidMount() {
    this.state.interval = setInterval(this.forceUpdate.bind(this), 1000);
  }

  render() {
    const { date, time, duration } = this.props;
    const soon_obj = TimeUtil.isDateTimeSoon(date, time);
    if (soon_obj.soon) {
      return React.createElement(
        "span",
        { className: "event-indicator event-indicator-soon" },
        React.createElement(
          XLightShadedBoxView,
          null,
          "happening in ",
          soon_obj.time,
          " min"
        )
      );
    }
    if (TimeUtil.isDateTimeHappeningNow(date, time, duration)) {
      // show this as happening now
      return React.createElement(
        "span",
        { className: "event-indicator event-indicator-now" },
        React.createElement(
          XLightShadedBoxView,
          null,
          "happening now!"
        )
      );
    }
    const just_happened_obj = TimeUtil.isDateTimeJustHappened(date, time, duration);
    if (just_happened_obj.just_happened) {
      return React.createElement(
        "span",
        { className: "event-indicator event-indicator-happened" },
        React.createElement(
          XLightShadedBoxView,
          null,
          "this happened ",
          just_happened_obj.time,
          " min ago"
        )
      );
    }
    // stop the interval 30 min after event is done so that the
    // site remains fast and not cluttered with many intervals
    const happened_already = TimeUtil.isDateTimeHappened(date, time, duration);
    if (happened_already) {
      clearInterval(this.state.interval);
    }
    return null;
  }
}

function EventCategoryView(props) {
  const { categories } = props;
  return React.createElement(
    "span",
    { className: "event-categories" },
    categories.map(category => React.createElement(
      XLightShadedBoxView,
      null,
      category
    ))
  );
}