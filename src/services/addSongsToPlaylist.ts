import TracksModel from "../models/TracksModel"

export default async function addSongsToPlaylist(playlistID:string, tracks: TracksModel[], token: string) {
    const uris = tracks.map(track => track.uri)
    console.log(uris)
    await fetch(`https://api.spotify.com/v1/playlists/${playlistID}/tracks`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify({
            uris: uris
        })
    })
}