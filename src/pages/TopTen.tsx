import { useEffect, useState } from "react"
import { getAccessToken } from '../services/getAccessToken';
import { redirectToAuthCodeFlow } from "../services/redirectToAuthCodeFlow";
import TrackCard from "../components/TrackCard";

export default function TopTen() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [tracks, setTracks] = useState<any[]>([])
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
            const response = await fetch("https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=10&offset=0", {
                method: "GET", headers: { Authorization: `Bearer ${token}` }
            })
            const songs : {items: object[]} = await response.json()
            setTracks(songs.items)
            setLoading(false)
        }

        fetchTracks()
    },[])
    console.log(loading, tracks)
  return (
    <div className="top-ten-container">
        { loading ? <h1>Loading...</h1> : null}
        {!loading && tracks.length > 0 ? tracks.map((track, i) => {
            return <TrackCard trackId={track.id!} trackName={track.name} artistName={track.artists[0].name} previewURL={track.preview_url!} albumName={track.album.name} image={track.album.images[1].url} placement={i + 1}/>
        }) : null}        
    </div>
  )
}
