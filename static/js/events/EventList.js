"use strict";
/* global Aviator, React, ReactDOM, TimeUtil */

/* global EventContainer, TimeUtil */

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

class EventListContainer extends React.Component {
  /**
   * expected props keys:
   *   group_name: String
   *   events: Array[Object]
   * each Object is represent an event. see Event.js for the exact
   * representation of events as object.
   * */
  static defaultProps() {
    return { name: null, events: [] };
  }

  static splitCurrentToFutureAndPastEvents(events) {
    const future_or_current_events = events.filter(event => {
      const { date, time, duration } = event;
      return !TimeUtil.isDateTimeHappened(date, time, duration);
    });
    const past_events = events.filter(event => {
      const { date, time, duration } = event;
      return TimeUtil.isDateTimeHappened(date, time, duration);
    });
    return [future_or_current_events, past_events];
  }

  reRender() {
    this.forceUpdate();
  }

  render() {
    let events = this.props.events || [];
    const [future_or_current_events, past_events] = EventListContainer.splitCurrentToFutureAndPastEvents(events);
    // we don't want to display past events if there aren't any
    const passed_events_component = past_events.length > 0 ? React.createElement(EventListView, {
      group_name: "past events",
      events: past_events,
      is_passed: true,
      reRenderParentList: () => null
    }) : null;
    return React.createElement(
      "div",
      null,
      React.createElement(EventListView, {
        group_name: this.props.group_name,
        events: future_or_current_events,
        is_passed: false,
        reRenderParentList: this.reRender.bind(this)
      }),
      passed_events_component
    );
  }
}

const defaultEventListViewProps = {
  events: []
};

function EventListView(props) {
  const events = props.events || defaultEventListViewProps.events;
  let event_components = [];
  if (events.length === 0) {
    event_components = React.createElement(EventListNoEventView, { isSearchResult: props.group_name === "search results" });
  } else {
    events.forEach((event, index) => {
      event_components.push(React.createElement(EventContainer, _extends({}, event, { reRenderParentList: props.reRenderParentList })));
      if (index < events.length - 1) {
        event_components.push(React.createElement(EventSeparator, null));
      }
    });
  }
  return React.createElement(
    "div",
    { className: "event-list" + (props.is_passed ? " event-list-past" : "") },
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

function EventListNoEventView(props) {
  const content = props.isSearchResult ? React.createElement(
    "span",
    null,
    "No events found as a result of this search.",
    React.createElement("br", null),
    React.createElement("br", null),
    "Try something different?"
  ) : "There are no upcoming events for this category.";
  return React.createElement(
    "span",
    { className: "event-list-no-event-view" },
    content
  );
}