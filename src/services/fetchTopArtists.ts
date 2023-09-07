export default async function fetchTopArtists(token: string) {
    const result = await fetch("https://api.spotify.com/v1/me/top/artists?time_range=short_term&offset=0", {
        method: "GET", headers: { Authorization: `Bearer ${token}` }
    });
    console.log(await result.json())
    return await result.json();
}