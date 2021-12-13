import { useState } from 'react';
import axios from 'axios';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown'

export default () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [department, setDepartment] = useState('');

  const [errors, setErrors] = useState([]);

  const onSubmit = async event => {
    event.preventDefault();

    try {
      const response = await axios.post('/api/users/signup', {
        email,
        password,
        name,
        role,
        department
      });

      console.log(response.data);
    } catch (err) {
      setErrors(err.response.data.errors);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <h1><center><i>Shurjo ERP Registration Form</i></center></h1>
      <div className="form-group">
        <label>Email Address</label>
        <input
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input
          value={password}
          onChange={e => setPassword(e.target.value)}
          type="password"
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label>Name</label>
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          type="text"
          className="form-control"
        />
      </div>
      <br></br>
      <div className="form-group">
      <label>Role</label>
      <DropdownButton title="Select Role"
               onSelect={e=>setRole(e)}>
              <Dropdown.Item eventKey="Senior HR">Senior HR</Dropdown.Item>
              <Dropdown.Item eventKey="Senior Accountant">Senior Accountant</Dropdown.Item>
              <Dropdown.Item eventKey="Jr. Software Developer">Jr. Software Developer</Dropdown.Item>
              <Dropdown.Item eventKey="Sr. Software Developer">Sr. Software Developer</Dropdown.Item>
              <Dropdown.Item eventKey="Product Manager">Product Manager</Dropdown.Item>
              <Dropdown.Item eventKey="Intern">Intern</Dropdown.Item>
      </DropdownButton>
      </div>
      <br></br>
      <div className="form-group">
        <label>Department</label>
        <DropdownButton title="Select Department"
               onSelect={e=>setDepartment(e)}>
              <Dropdown.Item eventKey="HR">HR</Dropdown.Item>
              <Dropdown.Item eventKey="Accounting">Accounting</Dropdown.Item>
              <Dropdown.Item eventKey="Technology">Technology</Dropdown.Item>
              <Dropdown.Item eventKey="Sales">Sales</Dropdown.Item>
        </DropdownButton>

      </div>
      {errors.length > 0 && (
        <div className="alert alert-danger">
          <h4>Sorry,</h4>
          <ul className="my-0">
            {errors.map(err => (
              <li key={err.message}>{err.message}</li>
            ))}
          </ul>
        </div>
      )}
      <br></br>
      <center><button className="btn btn-primary">Sign Up</button> </center>
    </form>
  );
};
