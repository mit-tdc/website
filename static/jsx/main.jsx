"use strict";
/* global Aviator, React, ReactDOM */
function App() {
  return <div>
    <nav>
      <li>Home</li>
      <li>About</li>
    </nav>
    <div id={"content"}></div>
  </div>;
}

function AboutPage(props) {
  return <div>Hello There!</div>;
}
const AppRouteTarget = {
  setupLayout: () => {
    ReactDOM.render(
      <App />,
      document.body,
    );
  },
  home: (request) => {},
  about: (request) => {
    ReactDOM.render(
      <AboutPage />,
      document.querySelector("#content"),
    );
  }
};
Aviator.setRoutes({
  target: AppRouteTarget,
  "/*": "setupLayout",
  "/": "home",
  "/home": "home",
  "/about":"about",
});

window.addEventListener("load", main);

function main() {
  Aviator.dispatch();
}