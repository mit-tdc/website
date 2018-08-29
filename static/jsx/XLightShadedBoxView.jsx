"use strict";

function XLightShadedBoxView(props){
  return (
    <span className={"x-light-shaded-box"}>
      <span className={"x-light-shaded-box-init"}>{props.children}</span>
    </span>
  );
}