"use strict";
/* global Aviator, React, ReactDOM, TimeUtil */

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
  const {name, description, location_name, location, date, time, duration, category} = props;
  const date_readable = TimeUtil.convertDateToReadableFormat(date);
  const time_readable = TimeUtil.convertTimeToPM(time);
  return (
    <span className={"event"}>
      <span className={"event-title"}>{name}</span>
      <span className={"event-time"}>On {date_readable} at {time_readable}</span>
      <span className={"event-location"}>{location_name}, {location}</span>
      <EventCategoryView categories={category}/>
      <span className={"event-description"}>{description}</span>
    </span>
  );
}

function EventCategoryView(props) {
  const {categories} = props;
  return (
    <span className={"event-categories"}>
      {categories.map(category => <span><span>{category}</span></span>)}
    </span>
  );
}