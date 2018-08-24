"use strict";
/* global Aviator, React, ReactDOM */
/*
Aviator stuffs:
https://gist.github.com/hojberg/9549330
https://github.com/swipely/aviator

Gist on AFS:
https://gist.github.com/robertvunabandi/36dc4eeab7646713fd627eefc5f5182a
*/
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
      document.body
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