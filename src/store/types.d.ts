import {IUserState} from "./user/types";


export interface IRootState {
    auth: IAuthState,
    user: IUserState,
    blogger: IBloggerState,
    advertiser: IAdvertisersState,
    admin: IAdminState
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