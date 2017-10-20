declare namespace CrossFilter2 {

    export interface Selector<T> {
        (value: T): any;
    }

    export interface CrossFilterStatic {
        <T>(data: T[]): CrossFilter<T>;
        size(): number;
        version: string;
        permute<T>(arry: T[], index: number[], deep: number): T[];
        heap: {
            <T>(array: T[], lo: number, hi: number): T[];
            by<T>(value: Selector<T>): Heap<T>;
        }
        heapselect: {
            <T>(array: T[], lo: number, hi: number, k: number): T[];
            by<T>(value: Selector<T>): HeapSelect<T>;
        }
        bisect: {
            <T>(array: T[], value: T, lo: number, hi: number): number;
            by<T>(value: Selector<T>): Bisector<T>;
        }
        insertionsort: {
            <T>(array: T[], lo: number, hi: number): T[];
            by<T>(vaule: Selector<T>): Sort<T>;
        }
        quicksort: {
            <T>(array: T[], lo: number, hi: number): T[];
            by<T>(value: Selector<T>): Sort<T>;
        }
    }

    export interface Bisection<T> {
        (array: T[], value: T, lo: number, hi: number): number;
    }

    export interface Bisector<T> extends Bisection<T> {
        left: Bisection<T>
        right: Bisection<T>
    }

    export interface Heap<T> {
        (array: T[], lo: number, hi: number): T[];
        sort(array: T[], lo: number, hi: number): T[];
    }

    export interface HeapSelect<T> {
        (array: T[], lo: number, hi: number, k: number): T[];
    }

    export interface Sort<T> {
        (array: T[], lo: number, hi: number): T[];
    }

    export interface CrossFilter<T> {
        add(records: T[]): CrossFilter<T>;
        remove(predicate?: Function): void;
        dimension<T>(value: Function, isArray?: boolean): Dimension<T>;
        groupAll(): any; // return vale?
        size(): number;
        all(): Array<T>;
        allFiltered(): Array<T>;
        onChange(callback: Function): Function;
        isElementFiltered(index: number, ignoreDimensions?: number): boolean;

    }

    export interface Dimension<T> {
        filter(range: any): any; // returns Array?
        filterExact(value: any): any; // value most likely either string or number? Returns Array?
        filterRange(range: T[]): any; // returns Array?
        filterFunction(funct: Function): any;
        filterAll(): any; // returns Array?
        top(k: number, offset?: number): T[];
        bottom(k: number, offset?: number): T[];
        group(groupValue: Function): Group<T>;
        groupAll(): any;
        dispose(): T[];
        remove(): T[];
        accessor: any;
        id: Function;
    }

    export interface Group<T> {
        top(k: number): T[];
        all(): Array<Group<T>>; // return groups?
        reduce(add: any, remove: any, initial: any): Group<T>;
        reduceCount(): Group<T>;
        reduceSum(func: Function): Group<T>;
        order(orderValue: Function): Group<T>;
        orderNatural(): Group<T>;
        size(): number;
        dispose(): Group<T>;
        remove(): Group<T>;

    }
}
declare var crossfilter: CrossFilter2.CrossFilterStatic;
declare module "crossfilter2" {
    var crossfilter: CrossFilter2.CrossFilterStatic;
    export = crossfilter;
}