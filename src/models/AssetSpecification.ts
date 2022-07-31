export class AssetSpecification {

    private _maxTemp?: number;
    private _power?: number;
    private _rpm?: number;

    constructor (specifications: any) {
        if (specifications.maxTemp) {
            this._maxTemp = specifications.maxTemp; 
        }
        if (specifications.power) {
            this._power = specifications.power; 
        }
        if (specifications.rpm) {
            this._rpm = specifications.rpm; 
        }
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