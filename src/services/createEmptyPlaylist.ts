export default async function createPlaylist(userID:string, token: string, timeframe: string, tracksQuantity: string) {
    let time 
    switch(timeframe){
        case 'short_term':
            time = 'from one month'
            break
        case 'medium_term':
            time = 'from 6 months'
            break
        case 'long_term':
            time = 'of all time'
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
                description: `These have been your ${tracksQuantity} favorite tracks ${time} up till ${month}/${day}/${year}!`
            })
        })
        return playlist.json()
}
