"use strict";

/* global Aviator, React, ReactDOM */

/*
event Structure
name: Text Short
description: Text Long
location: Text Short
date: YYYY-MM-DD
(Optional) Category: [Food, Jaunt, House]
*/

class EventListContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const events = [
      {
        name: "Event 1",
        description: "Event 1 Event 1 Event 1 Event 1 Event 1 Event 1",
        location: "Cambridge, MA",
        date: "2018-01-23",
        time: "12:45PM",
        category: "food",
      },
      {
        name: "Event 2",
        description: "Event 2 Event 2 Event 2 Event 2 Event 2 Event 2",
        location: "Cambridge, MA",
        date: "2018-01-23",
        time: "2:30PM",
        category: "house",
      },
      {
        name: "Event 3",
        description: "Event 3 Event 3 Event 3 Event 3 Event 3 Event 3",
        location: "Cambridge, MA",
        date: "2018-01-23",
        time: "5:15PM",
        category: "house",
      },
    ];
    return <EventListEventsView events={ events }/>;
  }
}

function EventListEventsView(props) {
  return (
    <div className={ "events" }>
      { props.events.map((event_data) => {
        return <EventContainer { ... event_data } />;
      }) }
    </div>
  );
}

class EventContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <EventView { ... this.props }/>;
  }
}

function EventView(props) {
  return <div>Hello There</div>;
}
