import axios from 'axios'
import moment from 'moment';
import CactusType from '@/http/cactusType'

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

    async identification(user: any) {
        try {
            const response = await this.instance.post('/identification', user);
            return response.data.token
        } catch (e) {
            throw e
        }
    }

    async getCactus(type: CactusType) {
        try {
            let response;
            if (type !== CactusType.ALL) {
                response = await this.instance.get('/blog', {
                    params: {
                        type: CactusType[type]
                    }
                });
            } else {
                response = await this.instance.get('/blog');
            }
            for (let post of response.data) {
                post.date = moment(post.date).format('dddd, MMMM Do YYYY, h:mm:ss a');
                if (Object.keys(post.lastEdited).length > 0) {
                    post.lastEdited.date = moment(post.lastEdited.date).format('dddd, MMMM Do YYYY, h:mm:ss a');
                }
            }
            return response.data;
        } catch (e) {
            throw e
        }
    }

    addCactus(cactus: any) {
        try {
            return this.instance.post('/blog', {
                data: cactus
            });
        } catch (e) {
            throw e
        }
    }

    editCactus(cactus: any) {
        try {
            return this.instance.put('/blog', {
                data: cactus
            });
        } catch (e) {
            throw e
        }
    }

    deleteCactus(cactusId: string) {
        try {
            return this.instance.delete('/blog', {
                params: {
                    postId: cactusId
                }
            });
        } catch (e) {
            throw e
        }
    }
}

export const http = new Http();
