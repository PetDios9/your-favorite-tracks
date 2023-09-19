export default async function createPlaylist(userID:string, token: string) {
    const date = new Date()
    const day  = date.getDate()
    const month = date.getMonth()
    const year = date.getFullYear()
        const playlist = await fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
            method: 'POST', 
            headers: { Authorization: `Bearer ${token}` },
            body: JSON.stringify({
                name: `Top 10 Up To ${month}/${day}/${year}`,
                description: `These have been your favorite tracks from the past month up till ${month}/${day}/${year}!`
            })
        })
        return playlist.json()
}
