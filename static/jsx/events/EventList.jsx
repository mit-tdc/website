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
  static defaultProps(){
    return {name: null, events: []};
  }
  
  static splitCurrentToFutureAndPastEvents(events){
    const future_or_current_events =  events.filter(event =>{
      const {date, time, duration} = event;
      const duration_mils = TimeUtil.convertDurationToMils(duration);
      return !TimeUtil.isTimeMilsPassed(
        TimeUtil.getIncrementedDateInMils(date, time, duration_mils)
      );
    });
    const past_events = events.filter(event =>{
      const {date, time, duration} = event;
      const duration_mils = TimeUtil.convertDurationToMils(duration);
      return TimeUtil.isTimeMilsPassed(
        TimeUtil.getIncrementedDateInMils(date, time, duration_mils)
      );
    });
    return [future_or_current_events, past_events];
  }
  
  render(){
    let events = this.props.events || [];
    const [
      future_or_current_events,
      past_events,
    ] = EventListContainer.splitCurrentToFutureAndPastEvents(events);
    // we don't want to display past events if there aren't any
    const passed_events_component = past_events.length > 0
      ? <EventListView
        group_name={"past events"}
        events={past_events}
        is_passed={true}
      />
      : null;
    return (
      <div>
        <EventListView
          group_name={this.props.group_name}
          events={future_or_current_events}
          is_passed={false}
        />
        {passed_events_component}
      </div>
    );
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
    <div className={"event-list" + (props.is_passed ? " event-list-past" : "")}>
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