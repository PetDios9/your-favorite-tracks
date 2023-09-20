import createEmptyPlaylist from './createEmptyPlaylist'
import addSongsToPlaylist from './addSongsToPlaylist'
import TracksModel from '../models/TracksModel'

export default async function createTopPlaylist(token: string, tracks: TracksModel[],timeframe: string, tracksQuantity: string) {
    const response = await fetch("https://api.spotify.com/v1/me", {
        method: "GET", headers: { Authorization: `Bearer ${token}` }
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const user = await response.json()
    const playlistResponse = await createEmptyPlaylist(user.id, token, timeframe, tracksQuantity)
    const playlist = playlistResponse
    await addSongsToPlaylist(playlist.id!, tracks, token)
    window.open(playlist.external_urls.spotify, '_blank')?.focus()
}