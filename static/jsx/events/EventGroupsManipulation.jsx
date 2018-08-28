"use strict";
/* global React, ReactDOM */

/* global EVENT_GROUP_CONSTANTS */
class EventGroupsManipulationContainer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      optionsToggled: false,
    };
  }
  
  static get defaultProps(){
    return {
      activeGroupType: "all",
      searchEvent: () => null,
      clearSearch: () => null,
      setGroupType: () => null,
    };
  };
  
  render(){
    return <EventGroupsManipulationView
      {...this.props}
      toggleOptions={this.toggleOptions.bind(this)}
      optionsToggled={this.state.optionsToggled}
    />;
  }
  
  toggleOptions(){
    this.setState((prevState, _) =>{
      return {optionsToggled: !prevState.optionsToggled};
    });
  }
}

function EventGroupsManipulationView(props){
  const event_group_options = !props.optionsToggled && false
    ? null
    : <div className={"event-groups-settings"}>
      <div>
        <span className={"event-manipulation-group"}>Groups: {props.activeGroupType}</span>
      </div>
      <div>
        <span className={"event-manipulation-search"}>
          Search
        </span>
      </div>
    </div>;
  return <div className={"event-groups-manipulation"}>
    {event_group_options}
  </div>;
}