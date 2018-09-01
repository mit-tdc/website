"use strict";
/* global Aviator, React, TimeUtil */

/* global adjustFooterHeight */

function App() {
  const TDC_GREEK = React.createElement(
    "span",
    null,
    "\u0398\u0394\u03A7"
  );
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
            TDC_GREEK || "TDC"
          )
        )
      ),
      React.createElement(
        "li",
        null,
        React.createElement(
          "span",
          { className: "nav-bar-item", onClick: () => Aviator.navigate("/rush/events") },
          React.createElement(
            "a",
            { className: "nav-bar-link" },
            "Events"
          )
        )
      ),
      React.createElement(
        "li",
        null,
        React.createElement(
          "span",
          { className: "nav-bar-item" },
          React.createElement(
            "a",
            {
              className: "nav-bar-link",
              href: "mailto:tdc-brothers@mit.edu?subject=[TDC%20Rush%202018]%20" },
            "Contact Us"
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

  render() {
    return React.createElement(
      "div",
      { id: "footer" },
      React.createElement(
        "div",
        null,
        "Theta Delta Chi ",
        React.createElement("br", null),
        " 372 Memorial Dr, Cambridge, MA 02139"
      ),
      React.createElement("br", null),
      React.createElement(
        "div",
        null,
        React.createElement(
          "span",
          null,
          "Contact us at "
        ),
        React.createElement(
          "a",
          { href: "mailto:tdc-brothers@mit.edu?subject=[TDC%20Rush%202018]%20" },
          "tdc-brothers@mit.edu"
        )
      ),
      React.createElement("br", null),
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