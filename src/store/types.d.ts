import {AxiosError} from "axios";

export interface IRootState {
    socialNetworks: [],
    adTypes: [],
    adFormats: [],
    adCategories: [],
    cities: [],
    loading: boolean,
    error: Error,
    offers: ResponseList,
    deals: ResponseList,
    platforms: ResponseList,
    user: {
        firstName: string,
        lastName: string,
        photo: string
    }
}

export type IteratorResult<T, TReturn = any> =
    | IteratorYieldResult<T>
    | IteratorReturnResult<TReturn>;

export interface IteratorYieldResult<TYield> {
    done?: false;
    value: TYield;
}
export interface IteratorReturnResult<TReturn> {
    done: true;
    value: TReturn;
}

export interface Generator<T = unknown, TReturn = any, TNext = unknown>
    extends Iterator<T, TReturn, TNext> {
    next(...args: [] | [TNext]): IteratorResult<T, TReturn>;
    return(value: TReturn): IteratorResult<T, TReturn>;
    throw(e: any): IteratorResult<T, TReturn>;
    [Symbol.iterator](): Generator<T, TReturn, TNext>;
}

export type Error = {code: number, message: string} | boolean
export type Action = {type: string, value: any}
export type ResponseList = {items: [], pagination: {}}