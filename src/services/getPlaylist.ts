export default async function getPlaylist(playlistID: string, token: string) {
    const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistID}`, {
        method: "GET", headers: { Authorization: `Bearer ${token}` }
    });
    return response.json()
}