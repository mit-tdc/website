"use strict";
/* global Aviator, React, ReactDOM */
/* global EventGroupsContainer */
/*
Aviator stuffs:
https://gist.github.com/hojberg/9549330
https://github.com/swipely/aviator
https://stackoverflow.com/questions/31048953/what-do-these-three-dots-in-react-do

Gist on AFS:
https://gist.github.com/robertvunabandi/36dc4eeab7646713fd627eefc5f5182a
*/
const NAV_BAR_ITEMS = [
  {text: "Home", onClick: () => Aviator.navigate("/")},
  {text: "Events", onClick: () => Aviator.navigate("/events")},
];

function App(){
  const createNavbar = item =>{
    return (
      <li>
        <span className={"nav-bar-item"} onClick={item.onClick}>
          <a className="nav-bar-link">{item.text}</a>
        </span>
      </li>
    );
  };
  return <div>
    <nav className={"nav-bar"}>{NAV_BAR_ITEMS.map(createNavbar)}</nav>
    <div id={"content"}></div>
    <div id={"footer"}> I am the footer</div>
  </div>;
}

const AppRouteTarget = {
  setupLayout: () =>{
    ReactDOM.render(
      <App/>,
      document.body
    );
  },
  events: () =>{
    ReactDOM.render(
      <EventGroupsContainer/>,
      document.querySelector("#content")
    );
  },
};
Aviator.setRoutes({
  target: AppRouteTarget,
  "/*": "setupLayout",
  "/": "events",
  "/events": "events",
});
window.addEventListener("load", main);

function main(){
  Aviator.dispatch();
  // Aviator.navigate("/");
}



