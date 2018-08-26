"use strict";
/* global Aviator, React, TimeUtil */
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
    <Footer/>
  </div>;
}

class Footer extends React.Component {
  componentDidMount(){
    window.addEventListener("resize", Footer.adjustFooterHeight);
    Footer.adjustFooterHeight();
  }

  static adjustFooterHeight(){
    const above_footer_height =
      document.querySelector("#content").clientHeight +
      document.querySelector("nav").clientHeight;
    const footer = document.querySelector("#footer");
    const window_height = window.innerHeight;
    if ((window_height - footer.clientHeight) > above_footer_height) {
      footer.style.position = "fixed";
      footer.style.top = (window_height - footer.clientHeight) + "px";
    } else {
      footer.style.position = "relative";
      footer.style.top = null;
    }
  }

  render(){
    return <div id={"footer"}>
      <div>Copyright &#9400; {TimeUtil.getCurrentYear()} Theta Delta Chi</div>
      <div>All Rights Reserved</div>
    </div>;
  }
}