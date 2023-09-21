export async function refreshToken(clientId: string) {
    const refreshToken = sessionStorage.getItem('refresh_token')
    console.log(refreshToken)
    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("grant_type", "refresh_token");
    params.append("refresh_token", refreshToken!);

    const result = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params
    });
    const jsonResult = await result.json()
    console.log(jsonResult)
    const {access_token, expires_in ,refresh_token} = jsonResult
    sessionStorage.setItem('access_token', access_token)
    sessionStorage.setItem('token_set_time', `${Date.now()}`)
    sessionStorage.setItem('token_expiration', `${expires_in * 1000}`)
    sessionStorage.setItem('refresh_token', refresh_token)
    return access_token
}