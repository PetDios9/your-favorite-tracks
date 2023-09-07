import { getAccessToken } from './getAccessToken';
import { redirectToAuthCodeFlow } from './redirectToAuthCodeFlow';

const clientId = import.meta.env.VITE_CLIENT_ID

const params = new URLSearchParams(window.location.search)
const code = params.get('code')

export default async function authenticate() {
    if (!code) {
        redirectToAuthCodeFlow(clientId);

    } else {
        const accessToken = await getAccessToken(clientId, code);
        return accessToken
    }
}