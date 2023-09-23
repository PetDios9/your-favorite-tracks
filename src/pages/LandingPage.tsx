import authenticate from "../services/authenticate";

export default function LandingPage() {
  return (
    <div className="login-container">
      <h2 className="top-tracks-heading">Your Favorites In Review!</h2>
      <h3>Click here to login and see your favorite tracks on Spotify!</h3>
      <button onClick={authenticate}>Log In Using Spotify</button>
      <h6 className="top-tracks-heading">Created by: Peter Diosdado</h6>
      <p>*Note: This web app is still not publically usable due to Spotify's API restrictions and 
        is currently under review for public release. Please contact me at peterdiosdadochavez@gmail.com 
        if you would like a demo or to be added as an authorized user.
      </p>
  </div>
  )
}

