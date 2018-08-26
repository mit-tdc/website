"use strict";
/* global Aviator, React, ReactDOM */
/* global EventListContainer */
/* global dummyEvents */ // todo - remove later

const EVENT_GROUP_CONSTANTS = {
  ORDER: {
    // order alphabetically
    alphabetic: "alphabet",
    // order the events in order of which one is coming up first
    chronological: "chronological"
  },
  GROUPS: {
    // group all events together
    all: "all",
    // group by categories
    categorical: "categorical"
  },
  DEFAULT_EVENTS: [],
  CATEGORIES: { food: "food", jaunt: "jaunt", house: "house", other: "other" }
};

class EventGroupsContainer extends React.Component {
  /**
   * expected props keys:
   *   - events: Array[Object]
   * each Object is represent an event. see Event.js for the exact
   * representation of events as object.
   * */
  constructor(props) {
    super(props);
    this.state = {
      order_type: EventGroupsContainer.defaultOrder,
      group_type: EventGroupsContainer.defaultGroup
    };
  }

  static get defaultOrder() {
    return EVENT_GROUP_CONSTANTS.ORDER.chronological;
  }

  static get defaultGroup() {
    return EVENT_GROUP_CONSTANTS.GROUPS.all;
  }

  static groupEvents(events, group_type) {
    switch (group_type) {
      case EVENT_GROUP_CONSTANTS.GROUPS.categorical:
        return EventGroupsContainer.groupEventsByCategory(events);
      case EVENT_GROUP_CONSTANTS.GROUPS.all:
      default:
        return [{ name: "all events", events: events }];
    }
  }

  static groupEventsByCategory(events) {
    const categories = new Set();
    events.forEach(event => {
      if (!categories.has(event.category)) {
        categories.add(event.category);
      }
    });
    const category_groups = [];
    categories.forEach(category => {
      category_groups.push(events.filter(event => event.category === category));
    });
    return category_groups;
  }

  static orderGroups(groups, order_type) {
    return groups.map(group => {
      const { name, events } = group;
      return {
        name,
        events: EventGroupsContainer.orderEvents(events, order_type)
      };
    });
  }

  static orderEvents(events, order_type) {
    // todo - implement this method
    return events;
  }

  render() {
    const events = this.props.events || dummyEvents || EVENT_GROUP_CONSTANTS.DEFAULT_EVENTS;
    const groups = EventGroupsContainer.groupEvents(events, this.state.group_type);
    const ordered_groups = EventGroupsContainer.orderGroups(groups, this.state.order_type);
    return React.createElement(EventGroupsView, { groups: ordered_groups });
  }
}

function EventGroupsView(props) {
  return React.createElement(
    "span",
    { className: "events-group" },
    props.groups.map(group => {
      const { name, events } = group;
      return React.createElement(EventListContainer, { group_name: name, events: events });
    })
  );
}