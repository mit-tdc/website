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
  constructor(props){
    super(props);
    this.state = {displayPastEvents: false};
  }
  
  static defaultProps(){
    return {name: null, events: []};
  }
  
  static filterOutPastEvents(events){
    return events.filter(event =>{
      const {date, time, duration} = event;
      const duration_mils = TimeUtil.convertDurationToMils(duration);
      return !TimeUtil.isTimeMilsPassed(
        TimeUtil.getIncrementedDateInMils(date, time, duration_mils)
      );
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
  let event_components = [];
  if (events.length === 0) {
    event_components = (
      <EventListNoEventView isSearchResult={props.group_name === "search results"}/>);
  } else {
    events.forEach((event, index) =>{
      event_components.push(<EventContainer {...event} />);
      if (index < events.length - 1) {
        event_components.push(<EventSeparator/>);
      }
    });
  }
  return (
    <div className={"event-list"}>
      <span>
        <EventGroupName group_name={props.group_name}/>
        <span className={"event-list-content"}>{event_components}</span>
      </span>
    </div>
  );
}

function EventSeparator(){
  return <span className={"event-separator"}><span></span></span>;
}

function EventGroupName(props){
  return <span className={"event-group-name"}>{props.group_name}</span>;
}

function EventListNoEventView(props){
  const content = props.isSearchResult
    ? (
      <span>
        No events found as a result of this search.
        <br/>
        <br/>
        Try something different?
      </span>
    )
    : "There are no upcoming events for this category.";
  return <span className={"event-list-no-event-view"}>{content}</span>;
}