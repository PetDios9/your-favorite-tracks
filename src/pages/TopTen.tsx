import { useEffect, useState } from "react"
import { getAccessToken } from '../services/getAccessToken';

export default function TopTen() {
    const [tracks, setTracks] = useState<object[] | undefined>([])
    const[loading, setLoading] = useState<boolean>(true)

    useEffect(() => {

        async function fetchTracks() {
            const clientId = import.meta.env.VITE_CLIENT_ID
            const params = new URLSearchParams(window.location.search)
            const code = params.get('code')
            console.log(code)
            const token = await getAccessToken(clientId, code!);

            const response = await fetch("https://api.spotify.com/v1/me/top/tracks?time_range=short_term&offset=0", {
                method: "GET", headers: { Authorization: `Bearer ${token}` }
            })

            setLoading(false)
            const songs : {items: object[]}= await response.json()
            setTracks(songs.items)
            console.log(tracks)
        }
        fetchTracks()
    },[])

  return (
    <div>
        {loading ? <h1>Loading tracks...</h1> : <p>Top Ten!</p>}
        {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            !loading && tracks ? tracks.map((song : any) => {
                return <p>{song.name!} - {song.artists[0].name!}</p>
            })
        :null}
    </div>
  )
}
