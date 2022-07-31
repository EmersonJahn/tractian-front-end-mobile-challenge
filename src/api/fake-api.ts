import axios, { AxiosResponse } from "axios"
import { Asset } from "../models/Asset";
import { AssetMetric } from "../models/AssetMetric";
import { AssetSpecification } from "../models/AssetSpecification";
import { AssetStatus } from "../models/AssetStatus";

class FakeApi {
    
    private _baseUrl = "https://my-json-server.typicode.com/tractian/fake-api/";

    constructor () {}

    private _genericRequest(endpoint: string, method: "get" | "post", data?: any, urlParameters?: string): Promise<{ data?: any, message?: any }> {
        let request: Promise<AxiosResponse<any, any>>;

        const urlParams = urlParameters ? urlParameters : "";

        if (method === "get") {
            request = axios.get(`${this._baseUrl}${endpoint}${urlParams}`);
        } else {
            request = axios.post(`${this._baseUrl}${endpoint}${urlParams}`, data);
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

    getUnitsByCompanyId(companyId: number): Promise<{ data?: any, message?: any }> {
        return this._genericRequest("units", "get", null, `?companyId=${companyId}`);
    }
    
    getAssetsWithUrlParams(urlParams?: string) {
        return this._genericRequest("assets", "get", null, urlParams)
        .then(assets => {
            return assets.data.map((data: any) => this.dataToAsset(data));
         });
    }

    private dataToAsset(data: any): Asset {      
        return new Asset(
            data.id,
            data.sensors,
            data.model,
            new AssetStatus(data.status),
            data.healthscore,
            data.name,
            data.image,
            new AssetSpecification(data.specifications),
            new AssetMetric(data.metrics),
            data.unitId,
            data.companyId,
        );

    }
}

export default new FakeApi() as FakeApi
