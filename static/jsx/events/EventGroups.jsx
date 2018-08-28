"use strict";
// frameworks
/* global React, ReactDOM */
// components
/* global EventListContainer, EventGroupsManipulationContainer */
// others imported objects and such
/* global TimeUtil */
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
      search_query: "",
    };
  }
  
  static get defaultOrder(){
    return EVENT_GROUP_CONSTANTS.ORDER.chronological;
  }
  
  static get defaultGroup(){
    return EVENT_GROUP_CONSTANTS.GROUPS.all;
  }
  
  render(){
    const events = this.props.events || EVENT_GROUP_CONSTANTS.DEFAULT_EVENTS;
    let ordered_groups = null;
    if (this.state.search_query.length > 0) {
      ordered_groups = EventGroupsContainer.getGroupsFromSearch(
        events,
        this.state.search_query
      );
    } else {
      const groups = EventGroupsContainer.groupEvents(events, this.state.group_type);
      ordered_groups = EventGroupsContainer.orderGroups(groups, this.state.order_type);
    }
    return <EventGroupsView
      groups={ordered_groups}
      groupType={this.state.group_type}
      searchEvent={this.searchEvent.bind(this)}
      clearSearch={this.clearSearch.bind(this)}
      setGroupType={this.setGroupType.bind(this)}
    />;
  }
  
  // ==== searching methods ====
  searchEvent(query){
    this.setState({search_query: query});
  }
  
  clearSearch(){
    this.setState({search_query: ""});
  }
  
  static getGroupsFromSearch(events, query){
    const matchFunc = (string, query) =>{
      const full_matches = string.match(new RegExp(query, "gi"));
      const scattered_matches = string.match(new RegExp(query.split("").join(".*?"), "gi"));
      return {
        full: full_matches ? full_matches.length : 0,
        scattered: scattered_matches ? scattered_matches.length : 0,
      };
    };
    const eventWithPoints = events.map(event =>{
      let points = 0;
      const {name, description, location_name, location, date, time, duration, category} = event;
      const name_match = matchFunc(name || "", query);
      points += 25 * (name_match.full > 0 ? 1 : 0) + name_match.scattered;
      const description_match = matchFunc(description || "", query);
      points += 14 * description_match.full + 1.5 * description_match.scattered;
      const location_match = matchFunc((location_name || "") + ", " + (location || ""), query);
      points += 15 * location_match.full + 2 * location_match.scattered;
      const date_match = matchFunc(TimeUtil.convertDateToReadableFormat(date), query);
      points += 10 * date_match.full + 0.5 * date_match.scattered;
      const time_match = matchFunc(TimeUtil.convertTimeToPM(time), query);
      points += 10 * time_match.full + 0.5 * time_match.scattered;
      const category_match = (() =>{
        let result = {};
        for (let i = 0; i < category.length; i += 1) {
          const matches = matchFunc(category[i] || "", query);
          result.full = result.full || 0 + matches.full;
          result.scattered = result.scattered || 0 + matches.scattered;
        }
        return result;
      })();
      points += 25 * (category_match.full > 0 ? 1 : 0) + 5 * category_match.scattered;
      return {name, description, location_name, location, date, time, duration, category, points};
    });
    const eventsWithEnoughPoints = eventWithPoints.filter(event => event.points >= 15);
    const sortedByPointEvents = eventsWithEnoughPoints.sort((event1, event2) =>{
      // we want the highest elements first, so we give those with
      // high elements low priority in the sort functions, which
      // ordered from low pri to high priority.
      return event1.points < event2.points ? 1 : -1;
    });
    return [
      {
        name: "Search Results",
        // points key is not used so no need to remove it
        events: sortedByPointEvents,
      }
    ];
  }
  
  // ==== grouping methods ====
  setGroupType(group){
    switch (group) {
      case EVENT_GROUP_CONSTANTS.GROUPS.categorical:
      case EVENT_GROUP_CONSTANTS.GROUPS.all:
        this.setState({group_type: group});
        break;
      default:
        throw "Invalid Group Given";
    }
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
  
  // ==== ordering methods ====
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
    return Array.from(events).sort((event1, event2) =>{
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
}

function EventGroupsView(props){
  return (
    <div className={"events-group"}>
      <EventGroupsManipulationContainer
        activeGroupType={props.groupType}
        searchEvent={props.searchEvent}
        clearSearch={props.clearSearch}
        setGroupType={props.setGroupType}
      />
      {
        props.groups.map((group) =>{
          const {name, events} = group;
          return <EventListContainer group_name={name} events={events}/>;
        })
      }
    </div>
  );
}