import { expectType } from 'tsd';
/**
 * 各种递归处理工具
 */
export type DeepPartial<T extends object> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

export type DeepRequired<T extends object> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired<T[K]> : T[K];
};

export type DeepReadonly<T extends object> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly<T[K]> : T[K];
};

export type DeepMutable<T extends object> = {
  -readonly [K in keyof T]: T[K] extends object ? DeepMutable<T[K]> : T[K];
};

type NonNullable<T> = T extends null | undefined ? never : T;
export type DeepNonNullable<T extends object> = {
  [K in keyof T]: T[K] extends object
    ? DeepNonNullable<T[K]>
    : NonNullable<T[K]>;
};

export type Nullable<T> = T | null;
export type DeepNullable<T extends object> = {
  [K in keyof T]: T[K] extends object ? DeepNullable<T[K]> : Nullable<T[K]>;
};

// 修饰已知属性
export type Flatten<T> = { [K in keyof T]: T[K] };
export type MarkPropsAsOptional<
  T extends object,
  K extends keyof T = keyof T
> = Flatten<Partial<Pick<T, K>> & Omit<T, K>>;

type MarkPropsAsOptionalStruct = MarkPropsAsNonNullable<
  {
    foo: string;
    bar: number;
    baz: boolean;
  },
  'bar'
>;
type Mutable<T> = {
  -readonly [P in keyof T]: T[P];
};

export type MarkPropsAsRequired<
  T extends object,
  K extends keyof T = keyof T
> = Flatten<Omit<T, K> & Required<Pick<T, K>>>;

export type MarkPropsAsReadonly<
  T extends object,
  K extends keyof T = keyof T
> = Flatten<Omit<T, K> & Readonly<Pick<T, K>>>;

export type MarkPropsAsMutable<
  T extends object,
  K extends keyof T = keyof T
> = Flatten<Omit<T, K> & Mutable<Pick<T, K>>>;

export type MarkPropsAsNullable<
  T extends object,
  K extends keyof T = keyof T
> = Flatten<Omit<T, K> & Nullable<Pick<T, K>>>;

export type MarkPropsAsNonNullable<
  T extends object,
  K extends keyof T = keyof T
> = Flatten<Omit<T, K> & NonNullable<Pick<T, K>>>;

/**
 * 对已知键值处理
 */

type ExpectedPropKeys<T extends object, ValueType> = {
  [Key in keyof T]-?: T[Key] extends ValueType ? Key : never;
}[keyof T];
export type PickByValueType<T extends object, ValueType> = Pick<
  T,
  ExpectedPropKeys<T, ValueType>
>;

expectType<PickByValueType<{ foo: string; bar: number }, string>>({
  foo: 'linbudu',
});

expectType<
  PickByValueType<{ foo: string; bar: number; baz: boolean }, string | number>
>({
  foo: 'linbudu',
  bar: 599,
});
