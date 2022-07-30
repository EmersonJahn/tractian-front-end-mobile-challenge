export class AssetSpecification {

    private _maxTemp?: number;
    private _power?: number;
    private _rpm?: number;

    constructor (maxTemp?: number, power?: number, rpm?: number) {
        this._maxTemp = maxTemp; 
        this._power = power; 
        this._rpm = rpm; 
    }

    public get maxTemp(): number | undefined {
        return this._maxTemp;
    }

    public get power(): number | undefined {
        return this._power;
    }

    public get rpm(): number | undefined {
        return this._rpm;
    }
}