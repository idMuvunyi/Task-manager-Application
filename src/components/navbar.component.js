import React, { Component } from "react";
import { Link } from "react-router-dom";


class NavBar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-info">
  <Link to="/" className="navbar-brand"> Task Manager App</Link>
        
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
      
      <li className="nav-item">
      <Link to="/" className="nav-link">
                Tasks
        </Link>
      </li>
      <li className="nav-item">
      <Link to="/create" className="nav-link">
                Assign New Task
              </Link>
        </li>
     
        <li className="nav-item">
        <Link to="/employee" className="nav-link">
                New Employee
              </Link>
        </li>
     
    </ul>
    
  </div>
</nav>
      
      
      
      
      
    );
  }
}

export default NavBar;
