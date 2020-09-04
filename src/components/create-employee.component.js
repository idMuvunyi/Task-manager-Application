import React, { Component } from "react";
import axios from "axios";



const Employee = props => (
  
  <tr>
    <td>{[...props.employee._id].splice(18, 6)}</td>
    <td>{props.employee.username}</td>
    <td>
      <button
         className="btn btn-sm btn-outline-warning"
        onClick={() => {
          props.deleteEmployee(props.employee._id);
        }}
      >
        Delete
      </button>
      
    </td>
  </tr>
);


class CreateEmployee extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.deleteEmployee = this.deleteEmployee.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: '',
      employees: []
    };
  }
  
  
  componentDidMount() {
    
    axios
      .get("http://localhost:5000/employees/")
      .then((response) => {
        this.setState({ employees: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  
  
  
  deleteEmployee(id) {
    axios
      .delete("http://localhost:5000/employees/"+id)
      .then((res) => console.log(res.data));

    this.setState({
      employees: this.state.employees.filter((el) => el._id !== id),
    });
  }
  
  
  employeeList() {
    
    return this.state.employees.map(currentempl => {
      return <Employee employee={currentempl} deleteEmployee={this.deleteEmployee} key={currentempl._id}/>;
      
    })
  }
  

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const employee = {
      username: this.state.username,
    };

    console.log(employee);

    axios
      .post("http://localhost:5000/employees/add", employee)
       .then((res) => console.log(res.data));

    this.setState({
      username: '',
    });
    
    window.location = '/user';
  }
  

  render() {
    return (
      <div>
        <h4>Add New Employee</h4>
        <br/>
        <div className="row">
          <div className="col-sm-6">
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Employee Name :</label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}
            />
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Submit"
              className="btn btn-outline-success"
            />
          </div>
        </form>
        </div>
        
      <div className="col-sm-6">
      <table className="table table-hover table-bordered table-responsive">
        <thead className="thead-light">
          <tr>
           <th>Ref. No</th>
            <th>Employee Name</th>
            <th>Actions</th>
          </tr>
        </thead>
    <tbody>{this.employeeList()}</tbody>
      </table>
        </div>
        </div>
      </div>
    );
  }
}

export default CreateEmployee;
