export class AssetStatus {

    private _status: string;
    private _statusInPortuguese: string;
    private _color: string;
    
    constructor (status: string) {
        this._status = status;
        this._statusInPortuguese = this.statusToPortuguese(status);
        this._color = this.getStatusColor(status);
    }

    public get status(): string {
        return this._status;
    }

    public get statusInPortuguese(): string {
        return this._statusInPortuguese;
    }

    public get color(): string {
        return this._color;
    }

    private statusToPortuguese(status: string): string {
        if (status === 'inAlert') {
            return 'Em Alerta'
        }
        
        if (status === 'inOperation') {
            return 'Em Operação'
        }
        
        if (status === 'inDowntime') {
            return 'Em Parada'
        }
        
        return 'Não classificado'
    }

    private getStatusColor(status: string): string {
        if (status === 'inAlert') {
            return 'warning'
        }
        
        if (status === 'inOperation') {
            return 'success'
        }
        
        if (status === 'inDowntime') {
            return 'default'
        }
        
        return 'default'
    }
}