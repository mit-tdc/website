"use strict";

function XLightShadedBoxView(props) {
  return React.createElement(
    "span",
    { className: "x-light-shaded-box" },
    React.createElement(
      "span",
      { className: "x-light-shaded-box-init" },
      props.children
    )
  );
}