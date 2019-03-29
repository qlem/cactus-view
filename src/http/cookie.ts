const cookieName = 'cactus=';

export function getCookie(): string {
    const decodedCookie: string = decodeURIComponent(document.cookie);
    const cookies: string[] = decodedCookie.split(';');
    for (let cookie of cookies) {
        while (cookie.charAt(0) === ' ') {
            cookie = cookie.substring(1)
        }
        if (cookie.indexOf(cookieName) === 0) {
            return cookie.substring(cookieName.length, cookie.length)
        }
    }
    return '';
}

export function setCookie(token: string, days: number) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const exp: string = 'expires=' + date.toUTCString();
    document.cookie = cookieName + token + ';' + exp;
}

export function deleteCookie() {
    document.cookie = cookieName + 'foo; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
}
