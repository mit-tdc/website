"use strict";
/* global Aviator, React, TimeUtil */
/* global adjustFooterHeight */
const NAV_BAR_ITEMS = [
  {text: "TDC", onClick: () => Aviator.navigate("/")}, // todo - replace with logo
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
    <nav className={"nav-bar"}>
      <li>
        <span className={"nav-bar-item nav-bar-item-tdc"} onClick={() => Aviator.navigate("/")}>
          <a className="nav-bar-link">TDC</a>
        </span>
      </li>
      <li>
        <span className={"nav-bar-item"} onClick={() => Aviator.navigate("/events")}>
          <a className="nav-bar-link">Events</a>
        </span>
      </li>
    </nav>
    <div id={"content"}>Content will be added here.</div>
    <Footer/>
  </div>;
}

class Footer extends React.Component {
  componentDidMount(){
    window.addEventListener("resize", adjustFooterHeight);
    adjustFooterHeight();
  }

  static adjustFooterHeight(){
    const above_footer_height =
      document.querySelector("#content").clientHeight +
      document.querySelector("nav").clientHeight;
    const footer = document.querySelector("#footer");
    const window_height = window.innerHeight;
    if ((window_height - footer.clientHeight) > above_footer_height) {
      footer.style.marginTop = (window_height - footer.clientHeight - above_footer_height) + "px";
    } else {
      footer.style.marginTop = null;
    }
  }

  render(){
    return <div id={"footer"}>
      <div>Copyright &#9400; {TimeUtil.getCurrentYear()} Theta Delta Chi</div>
      <div>All Rights Reserved</div>
    </div>;
  }
}