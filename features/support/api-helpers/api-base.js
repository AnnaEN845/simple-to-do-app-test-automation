import axios from 'axios';
import qs from 'qs';
import { CookieJar } from 'tough-cookie';
import { wrapper } from 'axios-cookiejar-support';

export default class APIBase {
    constructor(url) {
        this.url = url;
        this.cookieJar = new CookieJar();
        this.client = wrapper(axios.create({
            jar: this.cookieJar,
            withCredentials: true
        }));
    }

    async post(endpoint, body, config = {}) {
        try {
            const formattedBody = qs.stringify(body);
            const headers = {
                'Content-Type': 'application/x-www-form-urlencoded',
                ...config.headers
            };
            const response = await this.client.post(`${this.url}${endpoint}`, formattedBody, { ...config, headers });
            return response;
        } catch (error) {
            console.error('Error in POST request:', error.message);
            throw error;
        }
    }

    async get(endpoint, config = {}) {
        try {
            const response = await this.client.get(`${this.url}${endpoint}`, config);
            return response;
        } catch (error) {
            console.error('Error in GET request:', error.message);
            throw error;
        }
    }
}