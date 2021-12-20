import { useState } from 'react';
import Router from 'next/router';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import useRequest from '../../hooks/use-request';
export default () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [department, setDepartment] = useState('');
  const { doRequest, errors } = useRequest({
    url: '/api/users/signup',
    method: 'post',
    body: {
      email,
      password,
      name,
      role,
      department
    },
    onSuccess: () => Router.push('/auth/signin')
  });

  const onSubmit = async event => {
    event.preventDefault();
    await doRequest();
  };

  return (
    <form onSubmit={onSubmit}>
    <div className='background-color'>
    <h2><center><b>Shurjo ERP Employee Registration Form</b></center></h2>
    <h3><center>(HR Interface)</center></h3>
    <div className="form-group">
      <label>Email Address</label>
      <input
        placeholder='new-employee@shurjomukhi.com'
        value={email}
        onChange={e => setEmail(e.target.value)}
        className="form-control"
      />
    </div>
    <div className="form-group">
      <label>Password</label>
      <input
        placeholder='Enter Password'
        value={password}
        onChange={e => setPassword(e.target.value)}
        type="password"
        className="form-control"
      />
    </div>
    <div className="form-group">
      <label>Name</label>
      <input
        placeholder='Enter Employee Full Name'
        value={name}
        onChange={e => setName(e.target.value)}
        type="text"
        className="form-control"
      />
    </div>
    <br></br>
    <div className="form-group">
    <label>Designation</label>
    <DropdownButton title="Select Designation"
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
      <br></br>
      {errors}
      <br></br>
      <center><button className="btn btn-primary">Sign Up</button></center>
      <br></br>
      <center><p>If you are already a user, then click here to</p><a href="http://ticketing.dev/auth/signin">Sign In</a></center>
      </div>
    </form>
  );
};
