"use strict";
/* global Aviator, React, ReactDOM */

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
        "Home"
      ),
      React.createElement(
        "li",
        null,
        "About"
      )
    ),
    React.createElement("div", { id: "content" })
  );
}

function AboutPage(props) {
  return React.createElement(
    "div",
    null,
    "Hello There!"
  );
}
const AppRouteTarget = {
  setupLayout: () => {
    ReactDOM.render(React.createElement(App, null), document.body);
  },
  home: request => {},
  about: request => {
    ReactDOM.render(React.createElement(AboutPage, null), document.querySelector("#content"));
  }
};
Aviator.setRoutes({
  target: AppRouteTarget,
  "/*": "setupLayout",
  "/": "home",
  "/home": "home",
  "/about": "about"
});

window.addEventListener("load", main);

function main() {
  Aviator.dispatch();
}