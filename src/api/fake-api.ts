import axios, { AxiosResponse } from "axios"

class FakeApi {
    
    private _baseUrl = "https://my-json-server.typicode.com/tractian/fake-api/";

    constructor () {}

    private _genericRequest(endpoint: string, method: "get" | "post", data?: any): Promise<{ data?: any, message?: any }> {
        let request: Promise<AxiosResponse<any, any>>;

        if (method === "get") {
            request = axios.get(`${this._baseUrl}${endpoint}`);
        } else {
            request = axios.post(`${this._baseUrl}${endpoint}`, data);
        }

        return new Promise((resolve, reject) => {
            request
                .then(response => {
                    if (response.status >= 400) { // erro
                        reject({
                            message: "Um erro ocorreu."
                        })
                    }

                    resolve({
                        data: response.data
                    });
                })
                .catch(error => {
                    reject({
                       message: error.message
                    });
                 });
        });
    }

    getCompanies(): Promise<{ data?: any, message?: any }> {
        return this._genericRequest("companies", "get");
    }

}

export default new FakeApi() as FakeApi
