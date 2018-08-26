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

function App() {
  return React.createElement(
    "div",
    null,
    React.createElement(
      "nav",
      null,
      React.createElement(
        "li",
        null,
        React.createElement(
          "a",
          { className: "nav-bar-link", onClick: () => {
              console.log("home");
              Aviator.navigate("/");
            } },
          "Home"
        )
      ),
      React.createElement(
        "li",
        null,
        React.createElement(
          "a",
          { className: "nav-bar-link", onClick: () => {
              console.log("events");
              Aviator.navigate("/events");
            } },
          "Events"
        )
      )
    ),
    React.createElement("div", { id: "content" })
  );
}

const AppRouteTarget = {
  setupLayout: () => {
    ReactDOM.render(React.createElement(App, null), document.body);
  },
  events: () => {
    ReactDOM.render(React.createElement(EventGroupsContainer, null), document.querySelector("#content"));
  }
};

Aviator.setRoutes({
  target: AppRouteTarget,
  "/*": "setupLayout",
  "/": "events",
  "/events": "events"
});

window.addEventListener("load", main);

function main() {
  Aviator.dispatch();
  // Aviator.navigate("/");
}