import { useState, useEffect } from "react"
import { getAccessToken } from '../services/getAccessToken';
import { redirectToAuthCodeFlow } from "../services/redirectToAuthCodeFlow";
import TrackCard from "../components/TrackCard";
import createTopTenPlaylist from "../services/createTopTenPlaylist";

export default function TopTen() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [tracks, setTracks] = useState<any[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [timeframe, setTimeframe] = useState<string>('short_term')
    const [tracksQuantity, setTracksQuantity] = useState<string>('10')

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
            const response = await fetch(`https://api.spotify.com/v1/me/top/tracks?time_range=${timeframe}&limit=${tracksQuantity}&offset=0`, {
                method: "GET", headers: { Authorization: `Bearer ${token}` }
            })
            const songs : {items: object[]} = await response.json()
            setTracks(songs.items)
            setLoading(false)
        }

        fetchTracks()
    },[timeframe, tracksQuantity])
    const accessToken = sessionStorage.getItem('access_token')

  return (
    <div className="top-ten-container">
        <h1 className="top-ten-heading">Your Most Listened To Tracks!</h1>
        <h2>Use the buttons below to change the time range and amount of songs you want to see.</h2>
        {
            !loading ?
                <div>
                    <div className="timeframe-buttons-container">
                        <button style={timeframe === 'short_term' ? {backgroundColor: 'red'} : undefined} name="short_term" className="timeframe-button" onClick={()=> setTimeframe('short_term')}>1 Month</button>
                        <button style={timeframe === 'medium_term' ? {backgroundColor: 'red'} : undefined} name="medium_term" className="timeframe-button" onClick={()=> setTimeframe('medium_term')}>6 Months</button>
                        <button style={timeframe === 'long_term' ? {backgroundColor: 'red'} : undefined} name="long_term" className="timeframe-button" onClick={()=> setTimeframe('long_term')}>All Time</button>
                    </div>
                    <div className="quantity-buttons-container">
                        <button style={tracksQuantity === '10' ? {backgroundColor: 'red'} : undefined} name="10" className="quantity-button" onClick={()=> setTracksQuantity('10')}>Top 10 Tracks</button>
                        <button style={tracksQuantity === '25' ? {backgroundColor: 'red'} : undefined} name="25" className="quantity-button" onClick={()=> setTracksQuantity('25')}>Top 25 Tracks</button>
                        <button style={tracksQuantity === '50' ? {backgroundColor: 'red'} : undefined} name="50" className="quantity-button" onClick={()=> setTracksQuantity('50')}>Top 50 Tracks</button>
                    </div>
                    <div>
                        <h4>Use the button below to turn these tracks into a playlist!</h4>
                        <button onClick={() => createTopTenPlaylist(accessToken!, tracks, timeframe, tracksQuantity)}>Playlistify</button>
                    </div>
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
                    }) : <h1>Loading Top Ten...</h1>}
                </div>
        : <h4>Loading Top Tracks...</h4>}
    </div>
  )
}
