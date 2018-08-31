"use strict";
/* global Aviator, React, TimeUtil */

/* global adjustFooterHeight */
function App(){
  return <div>
    <nav className={"nav-bar"}>
      <li>
        <span className={"nav-bar-item nav-bar-item-tdc"} onClick={() => Aviator.navigate("/")}>
          <a className={"nav-bar-link"}>TDC</a>
        </span>
      </li>
      <li>
        <span className={"nav-bar-item"} onClick={() => Aviator.navigate("/rush/events")}>
          <a className={"nav-bar-link"}>Events</a>
        </span>
      </li>
      <li>
        <span className={"nav-bar-item"}>
          <a
            className={"nav-bar-link"}
            href={"mailto:tdc-brothers@mit.edu?subject=[TDC%20Rush%202018]%20"}>
            Contact Us
          </a>
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
  
  render(){
    return <div id={"footer"}>
      <div>Theta Delta Chi <br/> 372 Memorial Dr, Cambridge, MA 02139</div>
      <br/>
      <div>
        <span>Contact us at </span>
        <a href={"mailto:tdc-brothers@mit.edu?subject=[TDC%20Rush%202018]%20"}>
          tdc-brothers@mit.edu
        </a>
      </div>
      <br/>
      <div>Copyright &#9400; {TimeUtil.getCurrentYear()} Theta Delta Chi</div>
      <div>All Rights Reserved</div>
    </div>;
  }
}