declare namespace Crossfilter2 {
  export type ComparableValue = string | number | boolean;

  export interface ComparableObject {
    valueOf(): ComparableValue;
  }

  export type NaturallyOrderedValue = ComparableValue | ComparableObject;

  export type Predicate<T> = (record: T) => boolean;

  export type OrderedValueSelector<TRecord, TValue extends NaturallyOrderedValue = NaturallyOrderedValue> = (
    record: TRecord,
  ) => TValue;

  export type NumberSelector<T> = (record: T) => number;

  export type FilterValue =
    | NaturallyOrderedValue
    | [NaturallyOrderedValue, NaturallyOrderedValue]
    | Predicate<NaturallyOrderedValue>;

  export interface Grouping<TKey extends NaturallyOrderedValue> {
    key: TKey;
    value: number;
  }

  export interface Group<T, TKey extends NaturallyOrderedValue> {
    top(k: number): Array<Grouping<TKey>>;
    all(): Array<Grouping<TKey>>;
    reduce(
      add: (p: number, v: T) => number,
      remove: (p: number, v: T) => number,
      initial: () => number,
    ): Group<T, TKey>;
    reduceCount(): Group<T, TKey>;
    reduceSum(selector: NumberSelector<T>): Group<T, TKey>;
    order(selector: NumberSelector<T>): Group<T, TKey>;
    orderNatural(): Group<T, TKey>;
    size(): number;
    dispose(): Group<T, TKey>;
  }

  export interface GroupAll<T> {
    reduce(add: (p: number, v: T) => number, remove: (p: number, v: T) => number, initial: () => number): GroupAll<T>;
    reduceCount(): GroupAll<T>;
    reduceSum(selector: NumberSelector<T>): GroupAll<T>;
    dispose(): GroupAll<T>;
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
    group(groupValue?: (value: TValue) => NaturallyOrderedValue): Group<TRecord, TValue>;
    groupAll(): GroupAll<TRecord>;
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
    groupAll(): GroupAll<T>;
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

  export interface CrossfilterStatic {
    <T>(records?: T[]): Crossfilter<T>;
    version: string;
    heap: {
      <T>(records: T[], lo: number, hi: number): T[];
      by<T>(selector: OrderedValueSelector<T>): Heap<T>;
    };
    heapselect: {
      <T>(records: T[], lo: number, hi: number, k: number): T[];
      by<T>(selector: OrderedValueSelector<T>): HeapSelector<T>;
    };
    bisect: {
      <T>(records: T[], record: T, lo: number, hi: number): number;
      by<T>(selector: OrderedValueSelector<T>): Bisector<T>;
    };
    insertionsort: {
      <T>(records: T[], lo: number, hi: number): T[];
      by<T>(selector: OrderedValueSelector<T>): Sorter<T>;
    };
    quicksort: {
      <T>(records: T[], lo: number, hi: number): T[];
      by<T>(selector: OrderedValueSelector<T>): Sorter<T>;
    };
    size(): number;
    permute<T>(records: T[], index: number[], deep: number): T[];
  }
}

declare module 'crossfilter2' {
  const crossfilter: Crossfilter2.CrossfilterStatic;
  export = crossfilter;
}
