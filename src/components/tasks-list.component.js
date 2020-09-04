import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";


const Task = props => (
  
  
  <tr>
    <td>{[...props.task._id].splice(22, 2)}</td>
    <td>{props.task.username}</td>
    <td>{props.task.description}</td>
    <td>{props.task.duration} hrs</td>
    <td>{props.task.date.substring(0, 10)}</td>
    <td>
      <Link to={"/edit/"+props.task._id} className="btn btn-sm btn-outline-info ">Edit</Link> |{" "}
      <button
         className="btn btn-sm btn-outline-danger"
        onClick={() => {
          props.deleteTask(props.task._id);
        }}
      >
        Delete
      </button>
    </td>
  </tr>
);

class TasksList extends Component {
  constructor(props) {
    super(props);

    this.deleteTask = this.deleteTask.bind(this);

    this.state = {
      tasks: [],
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/tasks/")
      .then((response) => {
        this.setState({ tasks: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  deleteTask(id) {
    axios
      .delete("http://localhost:5000/tasks/"+id)
      .then((res) => console.log(res.data));

    this.setState({
      tasks: this.state.tasks.filter((el) => el._id !== id),
    });
  }

  taskList() {
    return this.state.tasks.map(currenttask => {
      return <Task task={currenttask} deleteTask={this.deleteTask} key={currenttask._id}/>;
      
    })
  }

  render() {
    return (
      <div >
        <h3>Assigned Tasks</h3>
        <br/>
      
        <table className="table table-hover table-responsive">
          <thead className="thead-light">
            <tr>
             <th>Ref. No</th>
              <th>Employee Name</th>
              <th>Description</th>
              <th>Duration</th>
              <th>Submission Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{this.taskList()}</tbody>
        </table>
      </div>
    );
  }
}

export default TasksList;
