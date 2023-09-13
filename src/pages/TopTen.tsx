import { useEffect, useState } from "react"
import { getAccessToken } from '../services/getAccessToken';
import { redirectToAuthCodeFlow } from "../services/redirectToAuthCodeFlow";

export default function TopTen() {
    const [tracks, setTracks] = useState<object[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        async function fetchTracks() {
            setLoading(true)
            const clientId = import.meta.env.VITE_CLIENT_ID
            const params = new URLSearchParams(window.location.search)
            const code = params.get('code')

            if (!code) {
                await redirectToAuthCodeFlow(clientId)
                return
            }
            const token = await getAccessToken(clientId, code)
            console.log('token set' + token)
            const response = await fetch("https://api.spotify.com/v1/me/top/tracks?time_range=short_term&offset=0", {
                method: "GET", headers: { Authorization: `Bearer ${token}` }
            })
            const songs : {items: object[]} = await response.json()
            setTracks(songs.items)
            setLoading(false)
        }

        fetchTracks()
    },[])

  return (
    <div>
        {loading ? <h1>Loading tracks...</h1> : <p>Top Ten!</p>}
        {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            !loading && tracks?.length > 0 ? tracks?.map((song : any) => {
                return <p>{song.name!} - {song.artists[0].name!}</p>
            })
        : null}
    </div>
  )
}
