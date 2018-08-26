"use strict";
/* global Aviator, React, ReactDOM, TimeUtil */

/* global EventContainer, TimeUtil */

class EventListContainer extends React.Component {
  /**
   * expected props keys:
   *   group_name: String
   *   events: Array[Object]
   * each Object is represent an event. see Event.js for the exact
   * representation of events as object.
   * */
  constructor(props) {
    super(props);
    this.state = { displayPastEvents: false };
  }

  static defaultProps() {
    return { name: null, events: [] };
  }

  static filterOutPastEvents(events) {
    return events.filter(event => {
      const { date, time, duration } = event;
      const duration_mils = TimeUtil.convertDurationToMils(duration);
      return !TimeUtil.isTimeMilsPassed(TimeUtil.getIncrementedDateInMils(date, time, duration_mils));
    });
  }

  render() {
    let events = this.props.events || [];
    if (!this.state.displayPastEvents) {
      events = EventListContainer.filterOutPastEvents(events);
    }
    return React.createElement(EventListView, { group_name: this.props.group_name, events: events });
  }
}

const defaultEventListViewProps = {
  events: []
};

function EventListView(props) {
  const events = props.events || defaultEventListViewProps.events;
  let event_components = [];
  if (events.length === 0) {
    event_components = React.createElement(EventListNoEventView, null);
  } else {
    events.forEach((event, index) => {
      event_components.push(React.createElement(EventContainer, event));
      if (index < events.length - 1) {
        event_components.push(React.createElement(EventSeparator, null));
      }
    });
  }
  return React.createElement(
    "div",
    { className: "event-list" },
    React.createElement(
      "span",
      null,
      React.createElement(EventGroupName, { group_name: props.group_name }),
      React.createElement(
        "span",
        { className: "event-list-content" },
        event_components
      )
    )
  );
}

function EventSeparator() {
  return React.createElement(
    "span",
    { className: "event-separator" },
    React.createElement("span", null)
  );
}

function EventGroupName(props) {
  return React.createElement(
    "span",
    { className: "event-group-name" },
    props.group_name
  );
}

function EventListNoEventView() {
  return React.createElement(
    "span",
    null,
    "There are no upcoming events!"
  );
}