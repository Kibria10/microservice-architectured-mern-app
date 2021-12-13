import { useState } from 'react';
import axios from 'axios';

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
      <h1>Sign Up</h1>
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
      <div className="form-group">
        <label>Role</label>
        <input
          value={role}
          onChange={e => setRole(e.target.value)}
          type="text"
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label>Department</label>
        <input
          value={department}
          onChange={e => setDepartment(e.target.value)}
          type="text"
          className="form-control"
        />
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
      <button className="btn btn-primary">Sign Up</button>
    </form>
  );
};
