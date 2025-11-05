export function parseProp<D>(
    value: string | D | null | undefined,
    guard: (arg: any) => arg is D,
    defaults: D,
    // eslint-disable-next-line no-console
    handleJsonError: (e: Error) => void = (e) => console.error(e),
): D {
    if (!value) {
        return defaults;
    }
    if (typeof (value) === 'string') {
        try {
            const parsed = JSON.parse(value);
            return guard(parsed) ? parsed : defaults;
        } catch (e) {
            // tslint:disable-next-line:no-console
            handleJsonError(e);
            return defaults;
        }
    }
    return guard(value) ? value : defaults;
}