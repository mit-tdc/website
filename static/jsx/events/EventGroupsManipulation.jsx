"use strict";
/* global React, ReactDOM */
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
    const {activeGroupType, searchEvent, clearSearch, setGroupType} = this.props;
    return <EventGroupsManipulationView
      activeGroupType={activeGroupType}
      searchEvent={searchEvent}
      clearSearch={clearSearch}
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
}

function EventGroupsManipulationView(props){
  return <div className={"event-groups-manipulation"}>
    <div className={"event-groups-settings"}>
      <EventManipulationSearchComponent
        searchEvent={props.searchEvent}
        clearSearch={props.clearSearch}
      />
    </div>
  </div>;
}

class EventManipulationSearchComponent extends React.Component {
  onBlur(e){
    const query = e.target.value;
    if (query.length === 0) {
      this.props.clearSearch();
    } else {
      this.props.searchEvent(query);
    }
  }
  
  render(){
    return <EventManipulationSearchView onBlur={this.onBlur.bind(this)}/>;
  }
}

function EventManipulationSearchView(props){
  return (
    <div className={"event-manipulation-search"}>
      <input
        type={"text"}
        placeholder={"Search"}
        onBlur={props.onBlur}
        onKeyPress={(event) =>{
          const input_text = event.target;
          if (event.key === "Enter") {
            input_text.blur();
          }
        }}
      />
    </div>
  );
}