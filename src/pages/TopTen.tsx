import { useEffect, useState } from "react"
import { getAccessToken } from '../services/getAccessToken';
import { redirectToAuthCodeFlow } from "../services/redirectToAuthCodeFlow";
import SongScreens from "../components/SongScreens";
import crt from '../assets/crt.png'

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
            const response = await fetch("https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=1&offset=0", {
                method: "GET", headers: { Authorization: `Bearer ${token}` }
            })
            const songs : {items: object[]} = await response.json()
            setTracks(songs.items)
            setLoading(false)
        }

        fetchTracks()
    },[])

  return (
    <div className="top-ten-container">
        {loading ? <h1>Loading top 10...</h1> :null }
        <div className="television-container">
            {
                !loading && tracks?.length > 0 ? 
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    tracks?.map((track : any) => {
                        return  <div key={track.id}>
                                    <div>
                                        <audio src={track.preview_url} controls />
                                    </div>
                                    <div>
                                        <SongScreens 
                                            trackId={track.id} 
                                            trackName={track.name} 
                                            artistName={track.artists[0]} 
                                            albumName={track.album.name} 
                                            previewURL={track.preview_url}
                                            image={track.album.images[1].url}
                                            />
                                    </div>
                                </div>
                    })
                : null}
                <img className="television" src={crt} alt="drawing of a crt tv" height={350} width={350} />
        </div>
    </div>
  )
}
