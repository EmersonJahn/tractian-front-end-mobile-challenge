export class AssetMetric {
    private _totalCollectsUptime: number;
    private _totalUptime: number;
    private _lastUptimeAt: Date;

    constructor (metrics: any) {
        this._totalCollectsUptime = metrics.totalCollectsUptime;
        this._totalUptime  = metrics.totalUptime;
        this._lastUptimeAt = new Date(metrics.lastUptimeAt);
    }

    public get totalCollectsUptime(): number {
        return this._totalCollectsUptime;
    }

    public get totalUptime(): number {
        return this._totalUptime;
    }

    public get lastUptimeAt(): Date {
        return this._lastUptimeAt;
    }
}