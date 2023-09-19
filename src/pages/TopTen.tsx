import { useState, useEffect } from "react"
import { getAccessToken } from '../services/getAccessToken';
import { redirectToAuthCodeFlow } from "../services/redirectToAuthCodeFlow";
import TrackCard from "../components/TrackCard";
import createTopTenPlaylist from "../services/createTopTenPlaylist";

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
            const response = await fetch("https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=10&offset=0", {
                method: "GET", headers: { Authorization: `Bearer ${token}` }
            })
            const songs : {items: object[]} = await response.json()
            setTracks(songs.items)
            setLoading(false)
        }

        fetchTracks()
    },[])
    const accessToken = sessionStorage.getItem('access_token')

  return (
    <div className="top-ten-container">
        <h1 className="top-ten-heading">Your Top Ten Most Listened To Tracks From The Past Month!</h1>

        {
            !loading && tracks.length > 0 ? tracks.map((track, i) => {
                return <TrackCard 
                    key={track.id} 
                    uri={track.uri} 
                    trackId={track.id} 
                    trackName={track.name} 
                    artistName={track.artists[0].name} 
                    previewURL={track.preview_url!} 
                    albumName={track.album.name} 
                    image={track.album.images[1].url} 
                    placement={i + 1}/>
            }) : 
            <h1>Loading Top Ten...</h1>
        }

        {
            !loading ? 
            <div>
                <h4>Use the button below to turn these tracks into a playlist!</h4>
                <button onClick={() => createTopTenPlaylist(accessToken!, tracks)}> Playlist </button>
            </div>
            : null
        }
    </div>
  )
}
