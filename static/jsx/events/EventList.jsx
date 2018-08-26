"use strict";
/* global Aviator, React, ReactDOM, TimeUtil */
/* global EventContainer, TimeUtil */
const defaultEventListProps = {
  name: null,
  events: [],
};

class EventListContainer extends React.Component {
  /**
   * expected props keys:
   *   group_name: String
   *   events: Array[Object]
   * each Object is represent an event. see Event.js for the exact
   * representation of events as object.
   * */
  constructor(props){
    super(props);
    this.state = {displayPastEvents: false};
  }

  static filterOutPastEvents(events){
    return events.filter(event =>{
      const {date, time, duration} = event;
      TimeUtil.isDatePassed(TimeUtil.getIncrementedTimeInMils(date, time, duration));
      // todo - if the time + duration is passed, return false
      return true;
    });
  }

  render(){
    let events = this.props.events || [];
    if (!this.state.displayPastEvents) {
      events = EventListContainer.filterOutPastEvents(events);
    }
    return <EventListView group_name={this.props.group_name} events={events}/>;
  }
}

const defaultEventListViewProps = {
  events: [],
};

function EventListView(props){
  const events = props.events || defaultEventListViewProps.events;
  const events_component = events.length === 0
    ? <EventListNoEventView/>
    : events.map((event) => <EventContainer {...event} />);
  return (
    <span className={"event-list"}>
      <EventGroupName name={props.group_name}/>
      <span className={"event-list-content"}>{events_component}</span>
    </span>
  );
}

function EventGroupName(props){
  return <span className={"event-group-name"}>{props.group_name}</span>;
}

function EventListNoEventView(){
  return <span>There are no upcoming events!</span>;
}