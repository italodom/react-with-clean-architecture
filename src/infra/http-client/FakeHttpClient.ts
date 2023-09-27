import HttpClientInterface from "./HttpClientInterface.ts";

export default class FakeHttpClient implements HttpClientInterface {
    async get(url: string): Promise<any> {
        return Promise.resolve([url])
    }

    async post(url: string, body: any): Promise<any> {
        return Promise.resolve([url, body])
    }

    async put(url: string, body: any): Promise<any> {
        return Promise.resolve([url, body])
    }

    async delete(url: string): Promise<any> {
        return Promise.resolve([url])
    }

}