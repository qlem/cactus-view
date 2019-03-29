import axios from 'axios'

class Http {

    readonly instance: any;

    // https://api.cactus.run
    // http://localhost:3000
    constructor() {
        this.instance = axios.create({
            baseURL: 'https://api.cactus.run',
            timeout: 1000,
        });
    }
}

export const http = new Http();
