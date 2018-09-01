"use strict";
/* global React, TimeUtil */

/* global XLightShadedBoxView */
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
      <EventIndicatorView
        date={date}
        time={time}
        duration={duration}
        reRenderParentList={props.reRenderParentList}
      />
      <span className={"event-time"}>On {date_readable} at {time_readable}</span>
      <span className={"event-location"}>{location_name}, {location}</span>
      <EventCategoryView categories={category}/>
      <span className={"event-description"}>{description}</span>
    </span>
  );
}

class EventIndicatorView extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      interval: undefined,
    };
  }
  
  componentDidMount(){
    this.state.interval = setInterval(this.forceUpdate.bind(this), 15 * TimeUtil.SEC_MILS);
  }
  
  render(){
    const {date, time, duration} = this.props;
    const soon_obj = TimeUtil.isDateTimeSoon(date, time);
    if (soon_obj.soon) {
      return (
        <span className={"event-indicator event-indicator-soon"}>
        <XLightShadedBoxView>happening in {soon_obj.time} min</XLightShadedBoxView>
      </span>
      );
    }
    if (TimeUtil.isDateTimeHappeningNow(date, time, duration)) {
      // show this as happening now
      return (
        <span className={"event-indicator event-indicator-now"}>
        <XLightShadedBoxView>happening now!</XLightShadedBoxView>
      </span>
      );
    }
    const just_happened_obj = TimeUtil.isDateTimeJustHappened(date, time, duration);
    if (just_happened_obj.just_happened) {
      return (
        <span className={"event-indicator event-indicator-happened"}>
        <XLightShadedBoxView>
          this event ended {just_happened_obj.time} min ago
        </XLightShadedBoxView>
      </span>
      );
    }
    // stop the interval 30 min after event is done so that the
    // site remains fast and not cluttered with many intervals
    const happened_already = TimeUtil.isDateTimeHappened(date, time, duration);
    if (happened_already) {
      clearInterval(this.state.interval);
      this.props.reRenderParentList();
    }
    return null;
  }
}

function EventCategoryView(props){
  const {categories} = props;
  return (
    <span className={"event-categories"}>
      
      {categories.map(category => <XLightShadedBoxView>{category}</XLightShadedBoxView>)}
    </span>
  );
}