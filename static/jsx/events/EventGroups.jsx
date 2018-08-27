"use strict";
// frameworks
/* global React, ReactDOM */
// components
/* global EventListContainer */
// others imported objects and such
/* global TimeUtil, dummyEvents */ // todo - remove dummyEvents
const EVENT_GROUP_CONSTANTS = {
  ORDER: {
    // order alphabetically
    alphabetic: "alphabet",
    // order the events in order of which one is coming up first
    chronological: "chronological",
  },
  GROUPS: {
    // group all events together
    all: "all",
    // group by categories
    categorical: "categorical",
  },
  DEFAULT_EVENTS: [],
};

class EventGroupsContainer extends React.Component {
  /**
   * expected props keys:
   *   - events: Array[Object]
   * each Object is represent an event. see Event.js for the exact
   * representation of events as object.
   * */
  constructor(props){
    super(props);
    this.state = {
      order_type: EventGroupsContainer.defaultOrder,
      group_type: EventGroupsContainer.defaultGroup,
    };
  }
  
  static get defaultOrder(){
    return EVENT_GROUP_CONSTANTS.ORDER.chronological;
  }
  
  static get defaultGroup(){
    return EVENT_GROUP_CONSTANTS.GROUPS.all;
  }
  
  static groupEvents(events, group_type){
    switch (group_type) {
      case EVENT_GROUP_CONSTANTS.GROUPS.categorical:
        return EventGroupsContainer.groupEventsByCategory(events);
      case EVENT_GROUP_CONSTANTS.GROUPS.all:
      default:
        return [{name: "all events", events: events}];
    }
  }
  
  static groupEventsByCategory(events){
    const categories = new Set();
    events.forEach(event =>{
      event.category.forEach((category) =>{
        if (!categories.has(category)) {
          categories.add(category);
        }
      });
    });
    const category_groups = [];
    categories.forEach(category =>{
      category_groups.push({
        name: category,
        events: events.filter(event => new Set(event.category).has(category))
      });
    });
    return category_groups;
  }
  
  static orderGroups(groups, order_type){
    return groups.map((group) =>{
      const {name, events} = group;
      return {
        name,
        events: EventGroupsContainer.orderEvents(events, order_type)
      };
    });
  }
  
  /**
   * @param events {Array<Object<String, String>>}
   *   event obj, see Events.js
   * @param order_type {String} one of EVENT_GROUP_CONSTANTS.ORDER
   * @return {Array<Object<String, String>>}
   * */
  static orderEvents(events, order_type){
    switch (order_type) {
      case EVENT_GROUP_CONSTANTS.ORDER.alphabetic:
        return EventGroupsContainer.orderEventsAlphabetically(events);
      case EVENT_GROUP_CONSTANTS.ORDER.chronological:
      default:
        return EventGroupsContainer.orderEventsChronologically(events);
    }
  }
  
  /**
   * @param events {Array<Object<String, String>>}
   *   event obj, see Events.js
   * @return {Array<Object<String, String>>}
   * */
  static orderEventsAlphabetically(events){
    return Array.from(events).sort((event1, event2) => {
      return event1.name.toLowerCase() >= event2.name.toLowerCase() ? 1 : -1;
    });
  }
  
  /**
   * @param events {Array<Object<String, String>>}
   *   event obj, see Events.js
   * @return {Array<Object<String, String>>}
   * */
  static orderEventsChronologically(events){
    let strictCompareValues = (e1, e2, mapFunc) =>{
      const v1 = mapFunc(e1);
      const v2 = mapFunc(e2);
      if (v1 > v2) {
        return 1;
      }
      if (v1 < v2) {
        return -1;
      }
      throw "Values are Equal";
    };
    return Array.from(events).sort((event1, event2) =>{
      // first off, compare the dates
      try {
        return strictCompareValues(
          event1.date,
          event2.date,
          TimeUtil.getDateInMils
        );
      } catch (e) {
      }
      // since they are the same date, compare the time of the event
      try {
        return strictCompareValues(
          event1.time,
          event2.time,
          TimeUtil.convertDurationToMils
        );
      } catch (e) {
      }
      // since they happen at the same time, compare with duration
      try {
        return strictCompareValues(
          event1.duration,
          event2.duration,
          TimeUtil.convertDurationToMils
        );
      } catch (e) {
      }
      // since they have the same duration, use alphabetic order
      return event1.name >= event2.name ? 1 : -1;
    });
  }
  
  render(){
    const events = this.props.events || dummyEvents || EVENT_GROUP_CONSTANTS.DEFAULT_EVENTS;
    const groups = EventGroupsContainer.groupEvents(events, this.state.group_type);
    const ordered_groups = EventGroupsContainer.orderGroups(groups, this.state.order_type);
    return <EventGroupsView groups={ordered_groups}/>;
  }
}

function EventGroupsView(props){
  return (
    <div className={"events-group"}>
      {
        props.groups.map((group) =>{
          const {name, events} = group;
          return <EventListContainer group_name={name} events={events}/>;
        })
      }
    </div>
  );
}