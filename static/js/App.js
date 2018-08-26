"use strict";
/* global Aviator, TimeUtil */

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
    React.createElement(
      "div",
      { id: "content" },
      "Content will be added here."
    ),
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