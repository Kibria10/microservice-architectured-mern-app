// import buildClient from "../api/build-client";
// const LandingPage = ({ currentUser }) => {
//   console.log(currentUser);

//   return <h1>Landing Page</h1>;
// };

// LandingPage.getInitialProps = async context => {
//   const client = buildClient(context);
//   const { data } = await client.get('/api/users/currentuser');
//   return data;
// };
// export default LandingPage;


import axios from 'axios';
const LandingPage = ({ currentUser }) => {
  console.log(currentUser);
  return currentUser ? <h1>You are signed in...  <p><a href="http://ticketing.dev/auth/signout">Sign Out</a></p>
  </h1> : <h1>You are not signed in...   <p><a href="http://ticketing.dev/auth/signin">Sign In</a></p>
</h1>;


};

LandingPage.getInitialProps = async ({ req }) => {
  if (typeof window === 'undefined') {
    // we are on the server!
    // requests should be made to http://ingress-nginx.ingress-nginx...laksdjfk
    console.log("SSR-URL");
    const { data } = await axios.get(
        
      'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser',
      {
        headers: req.headers
      }
      
    );

    return data;
  } else {
    // we are on the browser!
    // requests can be made with a base url of ''
    console.log("Browser-URL");
    const { data } = await axios.get('/api/users/currentuser');

    return data;
  }
  return {};
};

export default LandingPage;