export = crossfilter;

declare function crossfilter<T>(records?: T[]): crossfilter.Crossfilter<T>;

declare namespace crossfilter {
  export type ComparableValue = string | number | boolean;

  export interface ComparableObject {
    valueOf(): ComparableValue;
  }

  export type NaturallyOrderedValue = ComparableValue | ComparableObject;

  export type Predicate<T> = (record: T) => boolean;

  export type OrderedValueSelector<TRecord, TValue extends NaturallyOrderedValue = NaturallyOrderedValue> = (
    record: TRecord,
  ) => TValue;

  export type FilterValue =
    | NaturallyOrderedValue
    | [NaturallyOrderedValue, NaturallyOrderedValue]
    | Predicate<NaturallyOrderedValue>;

  export interface Grouping<TKey extends NaturallyOrderedValue> {
    key: TKey;
    value: number;
  }

  export interface Group<T, TKey extends NaturallyOrderedValue, TReduce extends NaturallyOrderedValue> {
    top(k: number): Array<Grouping<TKey>>;
    all(): Array<Grouping<TKey>>;
    reduce(
      add: (p: T, v: TReduce, nf: boolean) => TReduce,
      remove: (p: T, v: TReduce, nf: boolean) => TReduce,
      initial: () => TReduce,
    ): Group<T, TKey, TReduce>;
    reduceCount(): Group<T, TKey, TReduce>;
    reduceSum(selector: (record: T) => number): Group<T, TKey, TReduce>;
    order(selector: (value: TReduce) => NaturallyOrderedValue): Group<T, TKey, TReduce>;
    orderNatural(): Group<T, TKey, TReduce>;
    size(): number;
    dispose(): Group<T, TKey, TReduce>;
  }

  export interface GroupAll<T, TReduce extends NaturallyOrderedValue> {
    reduce(
      add: (p: T, v: TReduce, nf: boolean) => TReduce,
      remove: (p: T, v: TReduce, nf: boolean) => TReduce,
      initial: () => TReduce,
    ): GroupAll<T, TReduce>;
    reduceCount(): GroupAll<T, TReduce>;
    reduceSum(selector: (record: T) => number): GroupAll<T, TReduce>;
    dispose(): GroupAll<T, TReduce>;
    value(): number;
  }

  export interface Dimension<TRecord, TValue extends NaturallyOrderedValue> {
    filter(filterValue: FilterValue): Dimension<TRecord, TValue>;
    filterExact(value: TValue): Dimension<TRecord, TValue>;
    filterRange(range: [TValue, TValue]): Dimension<TRecord, TValue>;
    filterFunction(predicate: Predicate<TValue>): Dimension<TRecord, TValue>;
    filterAll(): Dimension<TRecord, TValue>;
    top(k: number, offset?: number): TRecord[];
    bottom(k: number, offset?: number): TRecord[];
    group<TReduce extends NaturallyOrderedValue>(
      groupValue?: (value: TValue) => NaturallyOrderedValue,
    ): Group<TRecord, TValue, TReduce>;
    groupAll<TReduce extends NaturallyOrderedValue>(): GroupAll<TRecord, TReduce>;
    dispose(): Dimension<TRecord, TValue>;
    accessor(record: TRecord): NaturallyOrderedValue;
    id(): number;
  }

  export const enum EventType {
    DATA_ADDED = 'dataAdded',
    DATA_REMOVED = 'dataRemoved',
    FILTERED = 'filtered',
  }

  export interface Crossfilter<T> {
    add(records: T[]): Crossfilter<T>;
    remove(predicate?: Predicate<T>): void;
    dimension<TValue extends NaturallyOrderedValue>(
      selector: OrderedValueSelector<T, TValue>,
      isArray?: boolean,
    ): Dimension<T, TValue>;
    groupAll<TReduce extends NaturallyOrderedValue>(): GroupAll<T, TReduce>;
    size(): number;
    all(): T[];
    allFiltered(): T[];
    onChange(callback: (type: EventType) => void): void;
    isElementFiltered(index: number, ignoreDimensions?: number[]): boolean;
  }

  export type HeapSelector<T> = (records: T[], lo: number, hi: number, k: number) => T[];

  export interface Heap<T> {
    (records: T[], lo: number, hi: number): T[];
    sort(records: T[], lo: number, hi: number): T[];
  }

  export type Sorter<T> = (records: T[], lo: number, hi: number) => T[];

  export type Bisection<T> = (records: T[], record: T, lo: number, hi: number) => number;

  export interface Bisector<T> extends Bisection<T> {
    left: Bisection<T>;
    right: Bisection<T>;
  }

  export const version: string;

  namespace heap {
    export function by<T>(selector: OrderedValueSelector<T>): Heap<T>;
  }

  export function heap<T>(records: T[], lo: number, hi: number): T[];

  namespace heapselect {
    export function by<T>(selector: OrderedValueSelector<T>): HeapSelector<T>;
  }

  export function heapselect<T>(records: T[], lo: number, hi: number, k: number): T[];

  namespace bisect {
    export function by<T>(selector: OrderedValueSelector<T>): Bisector<T>;
  }

  export function bisect<T>(records: T[], record: T, lo: number, hi: number): number;

  namespace insertionsort {
    export function by<T>(selector: OrderedValueSelector<T>): Sorter<T>;
  }

  export function insertionsort<T>(records: T[], lo: number, hi: number): T[];

  namespace quicksort {
    export function by<T>(selector: OrderedValueSelector<T>): Sorter<T>;
  }

  export function quicksort<T>(records: T[], lo: number, hi: number): T[];

  export function permute<T>(records: T[], index: number[], deep: number): T[];
}
