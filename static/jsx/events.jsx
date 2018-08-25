"use strict";

/* global Aviator, React, ReactDOM */

class EventListContainer extends React.Component {
  constructor(props) {
    super(props);
  }
}

function EventListEventsView(props) {
  return (
    <div className={ "events" }>
      { props.events.map((event_data) => {
        <EventContainer { ... event_data }/>;
      }) }
    </div>
  );
}

class EventContainer extends React.Component {
}

function EventView(props) {
}
