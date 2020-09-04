import React, { Component } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class EditTask extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDuration = this.onChangeDuration.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: "",
      description: "",
      duration: 0,
      date: new Date(),
      employees: [],
    };
  }

  componentDidMount() {
    axios.get("http://localhost:5000/tasks/"+this.props.match.params.id)
      .then((response) => {
        this.setState({
          username: response.data.username,
          description: response.data.description,
          duration: response.data.duration,
          date: new Date(response.data.date),
        })
      })
      .catch(function (error) {
        console.log(error);
      });

    axios.get("http://localhost:5000/employees/").then((response) => {
      if (response.data.length > 0) {
        this.setState({
          employees: response.data.map((employee) => employee.username),
        });
      }
    });
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value,
    });
  }

  onChangeDuration(e) {
    this.setState({
      duration: e.target.value,
    });
  }

  onChangeDate(date) {
    this.setState({
      date: date,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const task = {
      username: this.state.username,
      description: this.state.description,
      duration: this.state.duration,
      date: this.state.date,
    };

    console.log(task);

    axios
      .post(
        'http://localhost:5000/tasks/update/'+this.props.match.params.id, task)
      .then((response) => console.log(response.data));

    window.location = '/';
    
  }

  render() {
    return (
      <div>
        <h3>Update Task</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Employee Name :</label>
            <select
              required
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}
            >
              {this.state.employees.map(function(employee){
                return (
                  <option key={employee} value={employee}>
                    {" "}
                    {employee}{" "}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="form-group">
            <label> Description :</label>
            <textarea
            rows="6"
              type="text"
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription}
            />
          </div>

          <div className="form-group">
            <label> Duration (in hours) :</label>
            <input
              type="text"
              className="form-control"
              value={this.state.duration}
              onChange={this.onChangeDuration}
            />
          </div>

          <div className="form-group">
            <label> Date :</label>
            <div>
              <DatePicker
                selected={this.state.date}
                onChange={this.onChangeDate}
              />
            </div>
          </div>

          <div className="form-group">
            <input
              type="submit"
              value="Update Task"
              className="btn btn-outline-warning"
            />
          </div>
        </form>
      </div>
    );
  }
}

export default EditTask;