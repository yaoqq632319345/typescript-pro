// 1.
type LiteralType1<T> = T extends string ? 'string' : 'other';

type Res11 = LiteralType<'linbudu'>; // "string"
type Res21 = LiteralType<599>; // "other"

// 2.
export type LiteralType<T> = T extends string
  ? 'string'
  : T extends number
  ? 'number'
  : T extends boolean
  ? 'boolean'
  : T extends null
  ? 'null'
  : T extends undefined
  ? 'undefined'
  : never;

type Res12 = LiteralType<'linbudu'>; // "string"
type Res22 = LiteralType<599>; // "number"
type Res32 = LiteralType<true>; // "boolean"

// 3.
function universalAdd<T extends number | bigint | string>(
  x: T,
  y: T
): LiteralToPrimitive<T> {
  return x + (y as any);
}

export type LiteralToPrimitive<T> = T extends number
  ? number
  : T extends bigint
  ? bigint
  : T extends string
  ? string
  : never;

universalAdd('linbudu', '599'); // string
universalAdd(599, 1); // number
universalAdd(10n, 10n); // bigint

// 4.
type Func = (...args: any[]) => any;

type FunctionConditionType<T extends Func> = T extends (
  ...args: any[]
) => string
  ? 'A string return func!'
  : 'A non-string return func!';

//  "A string return func!"
type StringResult = FunctionConditionType<() => string>;
// 'A non-string return func!';
type NonStringResult1 = FunctionConditionType<() => boolean>;
// 'A non-string return func!';
type NonStringResult2 = FunctionConditionType<() => number>;

// 5. infer
type FunctionReturnType<T extends Func> = T extends (...args: any[]) => infer R
  ? R
  : never;

type Swap<T extends any[]> = T extends [infer A, infer B] ? [B, A] : T;

type SwapResult1 = Swap<[1, 2]>; // 符合元组结构，首尾元素替换[2, 1]
type SwapResult2 = Swap<[1, 2, 3]>; // 不符合结构，没有发生替换，仍是 [1, 2, 3]

// 提取首尾两个
type ExtractStartAndEnd<T extends any[]> = T extends [
  infer Start,
  ...any[],
  infer End
]
  ? [Start, End]
  : T;

// 调换首尾两个
type SwapStartAndEnd<T extends any[]> = T extends [
  infer Start,
  ...infer Left,
  infer End
]
  ? [End, ...Left, Start]
  : T;

// 调换开头两个
type SwapFirstTwo<T extends any[]> = T extends [
  infer Start1,
  infer Start2,
  ...infer Left
]
  ? [Start2, Start1, ...Left]
  : T;

type ArrayItemType<T> = T extends Array<infer ElementType>
  ? ElementType
  : never;

type ArrayItemTypeResult1 = ArrayItemType<[]>; // never
type ArrayItemTypeResult2 = ArrayItemType<string[]>; // string
type ArrayItemTypeResult3 = ArrayItemType<[string, number]>; // string | number

// 提取对象的属性类型
type PropType<T, K extends keyof T> = T extends { [Key in K]: infer R }
  ? R
  : never;

type PropTypeResult1 = PropType<{ name: string }, 'name'>; // string
type PropTypeResult2 = PropType<{ name: string; age: number }, 'name' | 'age'>; // string | number

// 反转键名与键值
type test = Record<string, unknown>;
type ReverseKeyValue<T extends Record<string, unknown>> = T extends Record<
  infer K,
  infer V
>
  ? Record<V & string, K>
  : never;
type ReverseKeyValueResult1 = ReverseKeyValue<{ key: 'value' }>; // { "value": "key" }

// type PromiseValue<T> = T extends Promise<infer V> ? V : T;
// 加入递归
type PromiseValue<T> = T extends Promise<infer V> ? PromiseValue<V> : T;
type PromiseValueResult1 = PromiseValue<Promise<number>>; // number
type PromiseValueResult2 = PromiseValue<number>; // number，但并没有发生提取

/**
 *
 * 6. 分发:
 *   - 是否通过泛型参数传入
 *   - 泛型参数是否裸类型参数
 **/
type Condition<T> = T extends 1 | 2 | 3 ? T : never;
// 1 | 2 | 3
// 逐个进行比较，返回 符合要求的联合类型
type Res1 = Condition<1 | 2 | 3 | 4 | 5>;
// never
// 统一比较
type Res2 = 1 | 2 | 3 | 4 | 5 extends 1 | 2 | 3 ? 1 | 2 | 3 | 4 | 5 : never;

type Naked<T> = T extends boolean ? 'Y' : 'N';
type Wrapped<T> = [T] extends [boolean] ? 'Y' : 'N';
// "N" | "Y"
type Res3 = Naked<number | boolean>;
/**
 * 伪代码:
 * const Res3 = [];
 * for(const input of [number, boolean]){
 *   if(input extends boolean){
 *     Res3.push("Y");
 *   } else {
 *     Res.push("N");
 *   }
 * }
 */
// "N"
type Res4 = Wrapped<number | boolean>;

// 将类型包裹之后，联合类型不会被分发
type test31 = NoDistribute<number | boolean>; // => number | boolean
export type NoDistribute<T> = T & {};

type Wrapped2<T> = NoDistribute<T> extends boolean ? 'Y' : 'N';
type Res13 = Wrapped<number | boolean>; // "N"
type Wrapped22<T> = T extends boolean ? 'Y' : 'N';
type Res133 = Wrapped22<number | boolean>; // "Y" | "N"

// 禁用分发特性来达到预期的效果
type CompareUnion<T, U> = [T] extends [U] ? true : false;
type CompareRes1 = CompareUnion<1 | 2, 1 | 2 | 3>; // true
type CompareRes2 = CompareUnion<1 | 2, 1>; // false

// never
type IsNever<T> = [T] extends [never] ? true : false;
type IsNever2<T> = T extends never ? true : false;
type IsNeverRes1 = IsNever<never>; // true
type IsNeverRes12 = IsNever<never>; // never
type IsNeverRes2 = IsNever<'linbudu'>; // false
// 直接使用，仍然会进行判断 ============> never 是所有类型的子类型
type Tmp3 = never extends string ? 1 : 2; // 1
type Tmp4<T> = T extends string ? 1 : 2;
// 通过泛型参数传入，会跳过判断 ===========> 我的理解：当传入never时，等于传了一个虚无，根本得不到结果嘛
type Tmp4Res = Tmp4<never>; // never
// 如果判断条件是 never，还是仅在作为泛型参数时才跳过判断
type Special3 = never extends never ? 1 : 2; // 1
type Special4<T> = T extends never ? 1 : 2;
type Special4Res = Special4<never>; // never

// any 直接使用，返回联合类型
type Tmp1 = any extends string ? 1 : 2; // 1 | 2
type Tmp2<T> = T extends string ? 1 : 2;
// 通过泛型参数传入，同样返回联合类型
type Tmp2Res = Tmp2<any>; // 1 | 2
// 如果判断条件是 any，那么仍然会进行判断
type Special1 = any extends any ? 1 : 2; // 1
type Special2<T> = T extends any ? 1 : 2;
type Special2Res = Special2<any>; // 1

/**
 *
 * isAny & isUnknown
 */
type IsAny<T> = 0 extends 1 & T ? true : false;
// 原理 =>
type testIsAny = 1 & any; // any
type testIsAny2 = any & 1; // any

type IsUnknown<T> = unknown extends T // 这个条件就可以过滤出 any 和 unknown
  ? IsAny<T> extends false
    ? true
    : false
  : false;

type testUnknown = IsUnknown<unknown>;
type testUnknown2 = IsUnknown<any>;
type testUnknown3 = IsUnknown<1>;
