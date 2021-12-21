import buildClient from '../api/build-client';

const LandingPage = ({ currentUser }) => {
  return currentUser ? (
    <h1>You are signed in.. <p><a href="http://ticketing.dev/auth/signout">Sign Out</a></p></h1>
  ) : (
    <h1>You are NOT signed in.. <p><a href="http://ticketing.dev/auth/signin">Sign In</a></p></h1>
  );
};

LandingPage.getInitialProps = async context => {
  console.log('LANDING PAGE!');
  const client = buildClient(context);
  const { data } = await client.get('/api/users/currentuser');

  return data;
};

export default LandingPage;