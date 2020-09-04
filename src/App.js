import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./components/navbar.component";
import TasksList from "./components/tasks-list.component";
import EditTask from "./components/edit-task.component";
import CreateTask from "./components/create-task.component";
import CreateEmployee from "./components/create-employee.component";

function App() {
  return (
    <Router>
     
        
        <NavBar />
        <div className="container">
          
        <br />
        <Route path="/" exact component={TasksList} />
        <Route path="/edit/:id" component={EditTask} />
        <Route path="/create" component={CreateTask} />
        <Route path="/employee" component={CreateEmployee} />
      </div>
      
    </Router>
  );
}

export default App;
