"use strict";
/* global Aviator, React, ReactDOM */

/**
 * event Object Structure
 *   name {String} a short text naming the event
 *   description {String} a long text describing the event
 *   location {String} short text of location
 *   date {String} must be of format YYYY-MM-DD
 *   time {String} must be of format HH:MM:SS
 *   duration {String} must be of format HH:MM:SS
 *   category {String} one of EVENT_GROUP_CONSTANTS.CATEGORIES
 * */
class EventContainer extends React.Component {
  /**
   * expected props keys (all of type String):
   *   name, description, location, date, time, duration, category
   * */
  constructor(props){
    super(props);
  }

  render(){
    return <EventView {...this.props}/>;
  }
}


function EventView(props){
  /**
   * expected props keys (all of type String):
   *   name, description, location, date, time, duration, category
   **/
  const {name, description, location, date, time, duration, category} = props;
  return (
    <span className={"event"}>
      <span className={"event-title"}>{name}</span>
      <span className={"event-time"}> On {date} at {time}</span>
      <span className={"event-location"}>{location}</span>
      <span className={"event-category"}>{category}</span>
      <span className={"event-description"}>{description}</span>
    </span>
  );
}