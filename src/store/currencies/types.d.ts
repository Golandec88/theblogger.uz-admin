export interface ICurrencyState {
    loading: boolean,
    error: Error | boolean,
    items: {
        rates: Object<string>
    },
    base?: string
}