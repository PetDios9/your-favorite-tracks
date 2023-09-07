import authenticate from "../services/authenticate";

export default function LandingPage() {
  return (
    <div className="login-container">
    <h2>Spotify Month In Review!</h2>
    <h3>Click here to login and see your last month's top tracks and artists!</h3>
    <button onClick={authenticate}>Log In Using Spotify</button>
  </div>
  )
}

