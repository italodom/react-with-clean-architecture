import HttpClientInterface from "./HttpClientInterface.ts";

export default class FetchHttpClient implements HttpClientInterface {

    async get(url: string): Promise<any> {
        const response = await fetch(url)
        return response.json();
    }

    async post(url: string, body: any): Promise<any> {
        const response = await fetch(url, {
            method: 'post',
            body: JSON.stringify(body)
        })
        return response.json();
    }

    async put(url: string, body: any): Promise<any> {
        const response = await fetch(url, {
            method: 'put',
            body: JSON.stringify(body)
        })
        return response.json();
    }

    async delete(url: string): Promise<any> {
        const response = await fetch(url, {
            method: 'delete',
        })
        return response.json();
    }

}