"use strict";
/* global Aviator, React, TimeUtil */

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
    React.createElement(Footer, null)
  );
}

class Footer extends React.Component {
  componentDidMount() {
    window.addEventListener("resize", Footer.adjustFooterHeight);
    Footer.adjustFooterHeight();
  }

  static adjustFooterHeight() {
    const above_footer_height = document.querySelector("#content").clientHeight + document.querySelector("nav").clientHeight;
    const footer = document.querySelector("#footer");
    const window_height = window.innerHeight;
    if (window_height - footer.clientHeight > above_footer_height) {
      footer.style.position = "fixed";
      footer.style.top = window_height - footer.clientHeight + "px";
    } else {
      footer.style.position = "relative";
      footer.style.top = null;
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