export class AssetStatus {

    private _status: string;
    private _statusInPortuguese: string;
    
    constructor (status: string) {
        this._status = status;
        this._statusInPortuguese = this.statusToPortuguese(status);
    }

    public get status(): string {
        return this._status;
    }

    public get statusInPortuguese(): string {
        return this._statusInPortuguese;
    }

    private statusToPortuguese(status: string) {
        if (status === 'inAlert') {
            return 'Em Alerta'
        }
        
        if (status === 'inOperation') {
            return 'Em Operação'
        }
        
        if (status === 'inDowntime') {
            return 'Em Parada'
        }
        
        return "Não classificado"
    }
}