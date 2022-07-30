export class AssetMetric {
    private _totalCollectsUptime: number;
    private _totalUptime: number;
    private _lastUptimeAt: string;

    constructor (totalCollectsUptime: number, totalUptime: number, lastUptimeAt: string) {
        this._totalCollectsUptime = totalCollectsUptime;
        this._totalUptime = totalUptime;
        this._lastUptimeAt = lastUptimeAt;
    }

    public get totalCollectsUptime(): number {
        return this._totalCollectsUptime;
    }

    public get totalUptime(): number {
        return this._totalUptime;
    }

    public get lastUptimeAt(): string {
        return this._lastUptimeAt;
    }
}