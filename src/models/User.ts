export class User {
    
    private _id: number;
    private _email: string;
    private _name: string;
    private _unitId: number;
    private _companyId: number;

    constructor (id: number, email: string, name: string, unitId: number, companyId: number) {
        this._id = id;
        this._email = email;
        this._name = name;
        this._unitId = unitId;
        this._companyId = companyId;
    }

    public get id(): number {
        return this._id;
    }

    public get email(): string {
        return this._email;
    }

    public get name(): string {
        return this._name;
    }

    public get unitId(): number {
        return this._unitId;
    }

    public get companyId(): number {
        return this._companyId;
    }

}