/**
 * 属性修饰工具类型。
 */
type Partial<T> = {
  [P in keyof T]?: T[P];
  // [P in keyof T]+?: T[P];
};
type PartialRecursive<T> = T extends Record<string, any>
  ? { [P in keyof T]?: PartialRecursive<T[P]> }
  : [T];
type test = PartialRecursive<{ a: string; b: { c: string } }>;

type Required<T> = {
  [P in keyof T]-?: T[P];
};
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
  // +readonly [P in keyof T]: T[P];
};
type Mutable<T> = {
  -readonly [P in keyof T]: T[P];
};

/**
 * 结构工具类型
 */
// 快速声明结构
type Record<K extends keyof any, T> = {
  [P in K]: T;
};
type Dictionary<T> = {
  [index: string]: T;
};
type NumericDictionary<T> = {
  [index: number]: T;
};

type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};
type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;

/**
 * 集合工具类型
 */
type Extract<T, U> = T extends U ? T : never;
type Exclude<T, U> = T extends U ? never : T;

type AExtractB = Extract<1 | 2 | 3, 1 | 2 | 4>; // 1 | 2
type _AExtractB =
  | (1 extends 1 | 2 | 4 ? 1 : never) // 1
  | (2 extends 1 | 2 | 4 ? 2 : never) // 2
  | (3 extends 1 | 2 | 4 ? 3 : never); // never

type SetA = 1 | 2 | 3 | 5;

type SetB = 0 | 1 | 2 | 4;

type AExcludeB = Exclude<SetA, SetB>; // 3 | 5
type BExcludeA = Exclude<SetB, SetA>; // 0 | 4
type _AExcludeB =
  | (1 extends 0 | 1 | 2 | 4 ? never : 1) // never
  | (2 extends 0 | 1 | 2 | 4 ? never : 2) // never
  | (3 extends 0 | 1 | 2 | 4 ? never : 3) // 3
  | (5 extends 0 | 1 | 2 | 4 ? never : 5); // 5
type _BExcludeA =
  | (0 extends 1 | 2 | 3 | 5 ? never : 0) // 0
  | (1 extends 1 | 2 | 3 | 5 ? never : 1) // never
  | (2 extends 1 | 2 | 3 | 5 ? never : 2) // never
  | (4 extends 1 | 2 | 3 | 5 ? never : 4); // 4

// 并集
export type Concurrence<A, B> = A | B;
// 补集
export type Complement<A, B extends A> = Exclude<A, B>;

/**
 * 模式匹配工具 infer
 */
type FunctionType = (...args: any) => any;
type Parameters<T extends FunctionType> = T extends (...args: infer P) => any
  ? P
  : never;
type ReturnType<T extends FunctionType> = T extends (...args: any) => infer R
  ? R
  : any;

type FirstParameter<T extends FunctionType> = T extends (
  arg: infer P,
  ...args: any
) => any
  ? P
  : never;
type FuncFoo = (arg: number) => void;
type FuncBar = (...args: string[]) => void;
type FooFirstParameter = FirstParameter<FuncFoo>; // number
type BarFirstParameter = FirstParameter<FuncBar>; // string

type FirstArrayItemType<T extends any[]> = T extends [infer P, ...any[]]
  ? P extends string
    ? P
    : never
  : never;

// ts v4.7+ infer 约束
type FirstArrayItemType4<T extends any[]> = T extends [
  infer P extends string,
  ...any[]
]
  ? P
  : never;
