import { useState, useEffect } from 'react';
import Router from 'next/router';
import useRequest from '../../hooks/use-request';

export default () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { doRequest, errors } = useRequest({
    url: '/api/users/signin',
    method: 'post',
    body: {
      email,
      password
    },
    onSuccess: () => Router.push('/')
  });

  const onSubmit = async event => {
    event.preventDefault();

    await doRequest();
  };

  return (
    <form onSubmit={onSubmit}>
    <h2><center><b>Shurjo ERP Employee Log In</b></center></h2>
      <div className="form-group">
        <label>Email Address</label>
        <input
          placeholder='your-email@shurjomukhi.com'
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
      <br></br>
      {errors}
      <br></br>
      <center><button className="btn btn-primary">Sign In</button></center>
      <br></br>
      <center><p>If you haven't signed up yet, then click here to</p><a href="http://ticketing.dev/auth/signup">Sign Up</a></center>
    </form>
  );
};
