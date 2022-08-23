import { filter, isEmpty, map, Observable, of, takeUntil, takeWhile, } from "rxjs";

export const filterArr = <T, Q>(obsArr: Observable<T[]>, query: Q): Observable<T[]> => {
    return obsArr.pipe(
        map((arr: T[]): T[] => {
            if (typeof (query) === 'string')
                return arr.filter((item: any) => item.species === query)
            else
                return arr.filter((item: any) => item.price <= query)
        })
    )
} 