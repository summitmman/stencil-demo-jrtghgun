export function isRecord(arg: any): arg is Record<string, unknown> {
    return !!arg && typeof arg === 'object' && !Array.isArray(arg);
}