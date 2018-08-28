"use strict";
/* global React, ReactDOM */

/* global EVENT_GROUP_CONSTANTS */
class EventGroupsManipulationContainer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      optionsToggled: false,
      removeGroupText: false,
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
    const {activeGroupType, searchEvent, clearSearch, setGroupType} = this.props;
    return <EventGroupsManipulationView
      removeGroupText={this.state.removeGroupText}
      activeGroupType={activeGroupType}
      searchEvent={searchEvent}
      clearSearch={clearSearch}
      searchOnFocus={this.searchOnFocus.bind(this)}
      searchOnBlur={this.searchOnBlur.bind(this)}
      setGroupType={setGroupType}
      toggleOptions={this.toggleOptions.bind(this)}
      optionsToggled={this.state.optionsToggled}
    />;
  }
  
  toggleOptions(){
    this.setState((prevState, _) =>{
      return {optionsToggled: !prevState.optionsToggled};
    });
  }
  
  searchOnFocus(){
    this.setState({removeGroupText: true});
  }
  
  searchOnBlur(){
    this.setState({removeGroupText: false});
  }
}

function EventGroupsManipulationView(props){
  return <div className={"event-groups-manipulation"}>
    <div className={"event-groups-settings"}>
      <EventManipulationGroupComponent
        removeGroupText={props.removeGroupText}
        activeGroupType={props.activeGroupType}
      />
      <EventManipulationSearchComponent
        searchEvent={props.searchEvent}
        clearSearch={props.clearSearch}
        searchOnFocus={props.searchOnFocus}
        searchOnBlur={props.searchOnBlur}
      />
    </div>
  </div>;
}

class EventManipulationGroupComponent extends React.Component {
  render(){
    return <EventManipulationGroup {...this.props} />;
  }
}

function EventManipulationGroup(props){
  const content = props.removeGroupText ? "" : `Groups: ${props.activeGroupType}`;
  return (
    <div className={"event-manipulation-group"}>
      <span>{content}</span>
    </div>
  );
}

class EventManipulationSearchComponent extends React.Component {
  onKeyPress(e){
    const search_obj = document.querySelector(".event-manipulation-search");
    const input = search_obj.children[0];
    if (e.key === "Enter") {
      input.blur();
    }
  }
  
  onFocus(){
    this.props.searchOnFocus();
    const group_obj = document.querySelector(".event-manipulation-group");
    group_obj.classList.add("event-manipulation-group-hide");
    const search_obj = document.querySelector(".event-manipulation-search");
    search_obj.classList.add("event-manipulation-search-expand");
  }
  
  onBlur(){
    this.props.searchOnBlur();
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