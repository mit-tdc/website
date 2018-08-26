"use strict";
/* global App, Aviator, React, ReactDOM, TimeUtil */
/* global EventGroupsContainer */
/*
Aviator stuffs:
https://gist.github.com/hojberg/9549330
https://github.com/swipely/aviator
https://stackoverflow.com/questions/31048953/what-do-these-three-dots-in-react-do

Gist on AFS:
https://gist.github.com/robertvunabandi/36dc4eeab7646713fd627eefc5f5182a
*/

const NAV_BAR_ITEMS = [{ text: "Home", onClick: () => Aviator.navigate("/") }, { text: "Events", onClick: () => Aviator.navigate("/events") }];

function App() {
  const createNavbar = item => {
    return React.createElement(
      "li",
      null,
      React.createElement(
        "span",
        { className: "nav-bar-item", onClick: item.onClick },
        React.createElement(
          "a",
          { className: "nav-bar-link" },
          item.text
        )
      )
    );
  };
  return React.createElement(
    "div",
    null,
    React.createElement(
      "nav",
      { className: "nav-bar" },
      NAV_BAR_ITEMS.map(createNavbar)
    ),
    React.createElement("div", { id: "content" }),
    React.createElement(
      "div",
      { id: "footer" },
      React.createElement(
        "div",
        null,
        "All Rights Reserved"
      ),
      React.createElement(
        "div",
        null,
        "Copywrite ",
        TimeUtil.getCurrentYear(),
        " Theta Delta Chi"
      )
    )
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