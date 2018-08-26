"use strict";
/* global Aviator, React, ReactDOM */

/*
event Structure
name: String - a short text naming the event
description: String - a long text describing the event
location: String - short text of location
date: String - must be of format YYYY-MM-DD
time: String - must be of format HH:MM:SS
duration: String must be of format HH:MM:SS
category: [Food, Jaunt, House]
*/
class EventContainer extends React.Component {
  /**
   * expected props keys:
   *   name: String
   *   description: String
   *   location: String
   *   date: String
   *   time: String
   *   duration: String
   *   category: String
   * */
  constructor(props){
    super(props);
  }

  render(){
    return <EventView {...this.props}/>;
  }
}

/**
 * expected props keys:
 *   name: String
 *   description: String
 *   location: String
 *   date: String
 *   time: String
 *   duration: String
 *   category: String
 * */
function EventView(props){
  return (
    <span className={"event"}>
      <span className={"event-title"}>{props.name}</span>
      <span className={"event-category"}>{props.category}</span>
      <span className={"event-description"}>{props.description}</span>
      <span className={"event-time"}> On {props.date} at {props.time}</span>
    </span>
  );
}