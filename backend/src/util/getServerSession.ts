import axios from "axios";

function getCookieValue(cookieString : string, cookieName : string) : string | null {
    const cookies = cookieString.split('; ');
    for (let cookie of cookies) {
        const [name, value] = cookie.split('=');
        if (name === cookieName) {
            return value;
        }
    }
    return null;
}

export const getServerSession = async (cookieString: string ) => {
    const sessionToken = getCookieValue(cookieString, 'next-auth.session-token');

    if  (sessionToken === null) return null

    const res = await axios.get(`http://localhost:3000/api/auth/session`, {
        headers: { cookie: `next-auth.session-token=${sessionToken}`}
    })



    return res.data;
};