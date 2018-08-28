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
  return <div className={"event-groups-manipulation"}>
    <div className={"event-groups-settings"}>
      <div className={"event-manipulation-group"}>
        <span>Groups: {props.activeGroupType}</span>
      </div>
      <EventManipulationSearchComponent
        searchEvent={props.searchEvent}
        clearSearch={props.clearSearch}
      />
    </div>
  </div>;
}

class EventManipulationSearchComponent extends React.Component {
  onKeyPress(e) {
    const search_obj = document.querySelector(".event-manipulation-search");
    const input = search_obj.children[0];
    if (e.key === "Enter") {
      input.blur();
    }
  }
  
  onFocus() {
    const group_obj = document.querySelector(".event-manipulation-group");
    group_obj.classList.add("event-manipulation-group-hide");
    const search_obj = document.querySelector(".event-manipulation-search");
    search_obj.classList.add("event-manipulation-search-expand");
  }
  
  onBlur() {
    const group_obj = document.querySelector(".event-manipulation-group");
    group_obj.classList.remove("event-manipulation-group-hide");
    const search_obj = document.querySelector(".event-manipulation-search");
    search_obj.classList.remove("event-manipulation-search-expand");
    const query = search_obj.children[0].value;
    if (query.length === 0) {
      this.props.clearSearch();
    } else {
      this.props.searchEvent(query);
    }
  }
  
  render(){
    return <EventManipulationSearchView
      onFocus={this.onFocus.bind(this)}
      onBlur={this.onBlur.bind(this)}
      onKeyPress={this.onKeyPress.bind(this)}
    />;
  }
}

function EventManipulationSearchView(props){
  return (
    <div className={"event-manipulation-search"}>
      <input
        type={"text"}
        placeholder={"Search"}
        onFocus={props.onFocus}
        onBlur={props.onBlur}
        onKeyPress={(e) => props.onKeyPress(e)}
      />
    </div>
  );
}