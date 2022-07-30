import { AssetMetric } from "./AssetMetric";
import { AssetSpecification } from "./AssetSpecification";
import { AssetStatus } from "./AssetStatus";

export class Asset {

    private _id: number;
    private _sensors: string[];
    private _model: string;
    private _status: AssetStatus;
    private _healthscore: number;
    private _name: string;
    private _image: string;
    private _specifications: AssetSpecification;
    private _metrics: AssetMetric;
    private _unitId: number;
    private _companyId: number;

    constructor (id: number, sensors: string[], model: string, status: AssetStatus, healthscore: number, name: string, image: string, specifications: AssetSpecification, metrics: AssetMetric, unitId: number, companyId: number) {
        this._id = id;
        this._sensors = sensors;
        this._model = model;
        this._status = status;
        this._healthscore = healthscore;
        this._name = name;
        this._image = image;
        this._specifications = specifications;
        this._metrics = metrics;
        this._unitId = unitId;
        this._companyId = companyId;
    }

    public get id(): number {
        return this._id;
    }
    
    public get sensors(): string[] {
        return this._sensors;
    }
    
    public get model(): string {
        return this._model;
    }
    
    public get status(): AssetStatus {
        return this._status;
    }
    
    public get healthscore(): number {
        return this._healthscore;
    }
    
    public get name(): string {
        return this._name;
    }
    
    public get image(): string {
        return this._image;
    }
    
    public get specifications(): AssetSpecification {
        return this._specifications;
    }
    
    public get metrics(): AssetMetric {
        return this._metrics;
    }
    
    public get unitId(): number {
        return this._unitId;
    }
    
    public get companyId(): number {
        return this._companyId;
    }

}