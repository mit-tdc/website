"use strict";
/* global App, Footer, Aviator, React, ReactDOM, TimeUtil, rushEvents */
/* global EventGroupsContainer */
/*
aviator stuffs:
https://gist.github.com/hojberg/9549330
https://github.com/swipely/aviator
https://stackoverflow.com/questions/31048953/what-do-these-three-dots-in-react-do

Gist on AFS:
https://gist.github.com/robertvunabandi/36dc4eeab7646713fd627eefc5f5182a
*/

const AppRouteTarget = {
  setupLayout: () => {
    ReactDOM.render(React.createElement(App, null), document.body);
  },
  events: () => {
    ReactDOM.render(React.createElement(EventGroupsContainer, { events: rushEvents }), document.querySelector("#content"));
    Footer.adjustFooterHeight();
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
  Aviator.navigate("/");
}