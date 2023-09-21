import { refreshToken } from "./refreshToken";

export async function getAccessToken(clientId: string, code: string) {

    if(sessionStorage.getItem('access_token') && (Date.now() - Number(sessionStorage.getItem('token_set_time')!) > Number(sessionStorage.getItem('token_expiration')!))){
        return await refreshToken(clientId)
    }
    if (sessionStorage.getItem('access_token') && (Date.now() - Number(sessionStorage.getItem('token_set_time')!) < Number(sessionStorage.getItem('token_expiration')!))) {
        return sessionStorage.getItem('access_token')
    }

    const verifier = localStorage.getItem("verifier");
    const redirect_uri = import.meta.env.VITE_REDIRECT_URI
    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("grant_type", "authorization_code");
    params.append("code", code);
    params.append("redirect_uri", redirect_uri);
    params.append("code_verifier", verifier!);

    const result = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params
    });

    const { access_token, refresh_token, expires_in } = await result.json();
    sessionStorage.setItem('access_token', access_token)
    sessionStorage.setItem('refresh_token', refresh_token)
    sessionStorage.setItem('token_expiration', `${expires_in * 1000}`)
    sessionStorage.setItem('token_set_time', `${Date.now()}`)
    return access_token;
}