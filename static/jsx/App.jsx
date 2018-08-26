"use strict";
/* global Aviator, TimeUtil */
const NAV_BAR_ITEMS = [
  {text: "Home", onClick: () => Aviator.navigate("/")},
  {text: "Events", onClick: () => Aviator.navigate("/events")},
];

function App(){
  const createNavbar = item =>{
    return (
      <li>
        <span className={"nav-bar-item"} onClick={item.onClick}>
          <a className="nav-bar-link">{item.text}</a>
        </span>
      </li>
    );
  };
  return <div>
    <nav className={"nav-bar"}>{NAV_BAR_ITEMS.map(createNavbar)}</nav>
    <div id={"content"}>Content will be added here.</div>
    <div id={"footer"}>
      <div>All Rights Reserved</div>
      <div>Copywrite {TimeUtil.getCurrentYear()} Theta Delta Chi</div>
    </div>
  </div>;
}