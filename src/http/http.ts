import axios from 'axios'

class Http {

    private cookieName: string = 'cactusToken=';
    readonly instance: any;

    constructor() {
        console.log('new http instance');
        this.instance = axios.create({
            baseURL: 'http://localhost:3000',
            timeout: 1000,
        });
    }

    public setCookie(token: string, days: number) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        const exp: string = 'expires=' + date.toUTCString();
        document.cookie = this.cookieName + token + ';' + exp;
    }

    public getToken(): string {
        const decodedCookie: string = decodeURIComponent(document.cookie);
        const cookies: string[] = decodedCookie.split(';');
        for (let cookie of cookies) {
            while (cookie.charAt(0) === ' ') {
                cookie = cookie.substring(1)
            }
            if (cookie.indexOf(this.cookieName) === 0) {
                return cookie.substring(this.cookieName.length, cookie.length)
            }
        }
        return '';
    }

    public deleteCookie() {
        document.cookie = this.cookieName + 'foo; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
    }
}

export const http = new Http();
