"use strict";
/* global Aviator, React, TimeUtil */
/* global adjustFooterHeight */

const NAV_BAR_ITEMS = [{ text: "TDC", onClick: () => Aviator.navigate("/") }, // todo - replace with logo
{ text: "Events", onClick: () => Aviator.navigate("/events") }];

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
      React.createElement(
        "li",
        null,
        React.createElement(
          "span",
          { className: "nav-bar-item nav-bar-item-tdc", onClick: () => Aviator.navigate("/") },
          React.createElement(
            "a",
            { className: "nav-bar-link" },
            "TDC"
          )
        )
      ),
      React.createElement(
        "li",
        null,
        React.createElement(
          "span",
          { className: "nav-bar-item", onClick: () => Aviator.navigate("/events") },
          React.createElement(
            "a",
            { className: "nav-bar-link" },
            "Events"
          )
        )
      )
    ),
    React.createElement(
      "div",
      { id: "content" },
      "Content will be added here."
    ),
    React.createElement(Footer, null)
  );
}

class Footer extends React.Component {
  componentDidMount() {
    window.addEventListener("resize", adjustFooterHeight);
    adjustFooterHeight();
  }

  static adjustFooterHeight() {
    const above_footer_height = document.querySelector("#content").clientHeight + document.querySelector("nav").clientHeight;
    const footer = document.querySelector("#footer");
    const window_height = window.innerHeight;
    if (window_height - footer.clientHeight > above_footer_height) {
      footer.style.marginTop = window_height - footer.clientHeight - above_footer_height + "px";
    } else {
      footer.style.marginTop = null;
    }
  }

  render() {
    return React.createElement(
      "div",
      { id: "footer" },
      React.createElement(
        "div",
        null,
        "Copyright \u24B8 ",
        TimeUtil.getCurrentYear(),
        " Theta Delta Chi"
      ),
      React.createElement(
        "div",
        null,
        "All Rights Reserved"
      )
    );
  }
}