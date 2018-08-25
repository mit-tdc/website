"use strict";

/* global Aviator, React, ReactDOM */
/* global EventListContainer */

/*
Aviator stuffs:
https://gist.github.com/hojberg/9549330
https://github.com/swipely/aviator
https://stackoverflow.com/questions/31048953/what-do-these-three-dots-in-react-do

Gist on AFS:
https://gist.github.com/robertvunabandi/36dc4eeab7646713fd627eefc5f5182a
*/

function App() {
  return <div>
    <nav>
      <li>
        <a className="nav-bar-link" onCLick={ () => Aviator.navigate("/") }>Home</a>
      </li>
      <li>
        <a className="nav-bar-link" onClick={ () => Aviator.navigate("/events") }>Events</a>
      </li>
    </nav>
    <div id={ "content" }></div>
  </div>;
}

const AppRouteTarget = {
  setupLayout: () => {
    ReactDOM.render(
      <App/>,
      document.body
    );
  },
  events: () => {
    ReactDOM.render(
      <EventListContainer/>,
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

function main() {
  Aviator.dispatch();
}



