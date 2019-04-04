export = crossfilter;

declare function crossfilter<T>(records?: T[]): crossfilter.Crossfilter<T>;

declare namespace crossfilter {
  export type ComparableValue = string | number | boolean;

  export interface ComparableObject {
    valueOf(): ComparableValue;
  }

  export type NaturallyOrderedValue = ComparableValue | ComparableObject;

  export type Predicate<T> = (record: T) => boolean;

  export type TSelectorValue = NaturallyOrderedValue | NaturallyOrderedValue[];
  export type OrderedValueSelector<TRecord, TValue extends TSelectorValue = NaturallyOrderedValue> = (
    record: TRecord,
  ) => TValue;

  export type FilterValue =
    | NaturallyOrderedValue
    | [NaturallyOrderedValue, NaturallyOrderedValue]
    | Predicate<NaturallyOrderedValue>;

  export interface Grouping<TKey extends NaturallyOrderedValue, TValue> {
    key: TKey;
    value: TValue;
  }

  export interface Group<TRecord, TKey extends NaturallyOrderedValue, TValue> {
    top(k: number): Array<Grouping<TKey, TValue>>;
    all(): Array<Grouping<TKey, TValue>>;
    reduce(
      add: (p: TValue, v: TRecord, nf: boolean) => TValue,
      remove: (p: TValue, v: TRecord, nf: boolean) => TValue,
      initial: () => TValue,
    ): Group<TRecord, TKey, TValue>;
    reduceCount(): Group<TRecord, TKey, TValue>;
    reduceSum(selector: (record: TRecord) => number): Group<TRecord, TKey, TValue>;
    order(selector: (value: TValue) => NaturallyOrderedValue): Group<TRecord, TKey, TValue>;
    orderNatural(): Group<TRecord, TKey, TValue>;
    size(): number;
    dispose(): Group<TRecord, TKey, TValue>;
  }

  export interface GroupAll<TRecord, TValue> {
    reduce(
      add: (p: TValue, v: TRecord, nf: boolean) => TValue,
      remove: (p: TValue, v: TRecord, nf: boolean) => TValue,
      initial: () => TValue,
    ): GroupAll<TRecord, TValue>;
    reduceCount(): GroupAll<TRecord, TValue>;
    reduceSum(selector: (record: TRecord) => number): GroupAll<TRecord, TValue>;
    dispose(): GroupAll<TRecord, TValue>;
    value(): TValue;
  }

  export interface Dimension<TRecord, TValue extends NaturallyOrderedValue> {
    filter(filterValue: FilterValue): Dimension<TRecord, TValue>;
    filterExact(value: TValue): Dimension<TRecord, TValue>;
    filterRange(range: [TValue, TValue]): Dimension<TRecord, TValue>;
    filterFunction(predicate: Predicate<TValue>): Dimension<TRecord, TValue>;
    filterAll(): Dimension<TRecord, TValue>;
    currentFilter(): FilterValue | undefined;
    hasCurrentFilter(): boolean;
    top(k: number, offset?: number): TRecord[];
    bottom(k: number, offset?: number): TRecord[];
    group<TKey extends NaturallyOrderedValue, TGroupValue>(
      groupValue?: (value: TValue) => TKey,
    ): Group<TRecord, TKey, TGroupValue>;
    groupAll<TGroupValue>(): GroupAll<TRecord, TGroupValue>;
    dispose(): Dimension<TRecord, TValue>;
    accessor(record: TRecord): NaturallyOrderedValue;
    id(): number;
  }

  export enum EventType {
    DATA_ADDED = 'dataAdded',
    DATA_REMOVED = 'dataRemoved',
    FILTERED = 'filtered',
  }

  export interface Crossfilter<T> {
    add(records: T[]): Crossfilter<T>;
    remove(predicate?: Predicate<T>): void;
    dimension<TValue extends NaturallyOrderedValue>(
      selector: OrderedValueSelector<T, TValue | TValue[]>,
      isArray?: boolean,
    ): Dimension<T, TValue>;
    groupAll<TGroupValue>(): GroupAll<T, TGroupValue>;
    size(): number;
    all(): T[];
    allFiltered(): T[];
    onChange(callback: (type: EventType) => void): () => void;
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
