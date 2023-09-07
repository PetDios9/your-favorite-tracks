import authenticate from "./services/authenticate"
import fetchTopArtists from "./services/fetchTopArtists"

function App() {
  return (
    <div>
      <button onClick={async () => await authenticate()}>Authenticate</button>
      <button onClick={async() => await fetchTopArtists(await authenticate())}>Get Top Artists</button>
    </div>
  )
}

export default App
