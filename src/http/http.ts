import axios from 'axios'

class Http {

    private cookieName: string = 'cactusToken=';
    readonly _instance: any;
    private _adminInstance: any;

    constructor() {
        console.log('new http instance');
        this._instance = axios.create({
            baseURL: 'http://localhost:3000',
            timeout: 1000,
        });
    }

    get adminInstance(): any {
        return this._adminInstance
    }

    get instance(): any {
        return this._instance
    }

    public setCookie(token: string, days: number) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        const exp: string = 'expires=' + date.toUTCString();
        document.cookie = this.cookieName + token + ';' + exp;
        this._adminInstance = axios.create({
            baseURL: 'http://localhost:3000',
            timeout: 1000,
            headers: {
                token: this.getToken()
            }
        });
    }

    public getToken(): string {
        const decodedCookie: string = decodeURIComponent(document.cookie);
        const cookies: string[] = decodedCookie.split(';');
        for (let cookie of cookies) {
            while (cookie.charAt(0) == ' ') {
                cookie = cookie.substring(1)
            }
            if (cookie.indexOf(this.cookieName) == 0) {
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
