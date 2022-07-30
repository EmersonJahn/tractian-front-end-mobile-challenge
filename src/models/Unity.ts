export class Unity {

    private _id: number;
    private _name: string;
    private _companyId: number;

    constructor (id: number, name: string, companyId: number) {
        this._id = id;
        this._name = name;
        this._companyId = companyId;
    }

    public get id(): number {
        return this._id;
    }
    
    public get name(): string {
        return this._name;
    }
    
    public get companyId(): number {
        return this._companyId;
    }
    

}