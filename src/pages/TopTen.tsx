import { useEffect, useState } from "react"
import authenticate from "../services/authenticate"

export default function TopTen() {
    const [tracks, setTracks] = useState< unknown | undefined >([])

    useEffect(() => {
        async function fetchTracks() {
            const token : string = await authenticate()
            console.log(token)
            const result = await fetch("https://api.spotify.com/v1/me/top/tracks?time_range=short_term&offset=0", {
                method: "GET", headers: { Authorization: `Bearer ${token}` }
            })
            return result
        }
        setTracks(fetchTracks())
        console.log(tracks)
    },[])
  return (
    <div>
        <h1>top ten</h1>
    </div>
  )
}
