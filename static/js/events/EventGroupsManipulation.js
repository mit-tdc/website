"use strict";
/* global React, ReactDOM */

/* global EVENT_GROUP_CONSTANTS */

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

class EventGroupsManipulationContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      optionsToggled: false
    };
  }

  static get defaultProps() {
    return {
      activeGroupType: "all",
      searchEvent: () => null,
      clearSearch: () => null,
      setGroupType: () => null
    };
  }

  render() {
    return React.createElement(EventGroupsManipulationView, _extends({}, this.props, {
      toggleOptions: this.toggleOptions.bind(this),
      optionsToggled: this.state.optionsToggled
    }));
  }

  toggleOptions() {
    this.setState((prevState, _) => {
      return { optionsToggled: !prevState.optionsToggled };
    });
  }
}

function EventGroupsManipulationView(props) {
  const event_group_options = !props.optionsToggled ? null : React.createElement(
    "div",
    { className: "event-groups-settings" },
    React.createElement(
      "div",
      null,
      React.createElement(
        "span",
        { className: "event-manipulation-group" },
        "Groups: ",
        props.activeGroupType
      )
    ),
    React.createElement(
      "div",
      null,
      React.createElement(
        "span",
        { className: "event-manipulation-search" },
        "Search"
      )
    )
  );
  return React.createElement(
    "div",
    { className: "event-groups-manipulation" },
    React.createElement(EventGroupsManipulationToggleView, {
      onClick: props.toggleOptions,
      toggled: props.optionsToggled
    }),
    event_group_options
  );
}

function EventGroupsManipulationToggleView(props) {
  return React.createElement(
    "div",
    { className: "event-manipulation-toggle", onClick: props.onClick },
    props.toggled ? "/\\" : "\\/"
  );
}