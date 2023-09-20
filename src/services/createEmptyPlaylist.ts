export default async function createPlaylist(userID:string, token: string, timeframe: string, tracksQuantity: string) {
    let time 
    switch(timeframe){
        case 'short_term':
            time = 'month'
            break
        case 'medium_term':
            time = '6 months'
            break
        case 'long_term':
            time = 'year'
            break
    }
    const date = new Date()
    const day  = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()
        const playlist = await fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
            method: 'POST', 
            headers: { Authorization: `Bearer ${token}` },
            body: JSON.stringify({
                name: `Top ${tracksQuantity} Up To ${month}/${day}/${year}`,
                description: `These have been your ${tracksQuantity} favorite tracks from the past ${time} up till ${month}/${day}/${year}!`
            })
        })
        return playlist.json()
}
