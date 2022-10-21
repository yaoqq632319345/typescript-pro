// 泛型
// 1.
type Factory<T> = T | number | string;
type Stringify<T> = {
  [K in keyof T]: string;
};
type Clone<T> = {
  [K in keyof T]: T[K];
};
type Partial<T> = {
  [P in keyof T]?: T[P];
};

// extends
// 1.
type IsEqual<T> = T extends true ? 1 : 2;
type A = IsEqual<true>; // 1
type B = IsEqual<false>; // 2
type C = IsEqual<'linbudu'>; // 2

// 2. 默认值
type Factory2<T = boolean> = T | number | string;

// 3.
type ResStatus<ResCode extends number> = ResCode extends 10000 | 10001 | 10002 ? 'success' : 'failure';
type Res1 = ResStatus<10000>; // "success"
type Res2 = ResStatus<20000>; // "failure"
type Res3 = ResStatus<'10000'>; // 类型“string”不满足约束“number”。

// 4.
type ProcessInput<Input, SecondInput extends Input = Input, ThirdInput extends Input = SecondInput> = number;

// 5.
interface IRes<TData = unknown> {
  code: number;
  error?: string;
  data: TData;
}
interface IUserProfileRes {
  name: string;
  homepage: string;
  avatar: string;
}
function fetchUserProfile(): Promise<IRes<IUserProfileRes>> {
  return 1 as any;
}
type StatusSucceed = boolean;
function handleOperation(): Promise<IRes<StatusSucceed>> {
  return 1 as any;
}
interface IPaginationRes<TItem = unknown> {
  data: TItem[];
  page: number;
  totalCount: number;
  hasNextPage: boolean;
}
function fetchUserProfileList(): Promise<IRes<IPaginationRes<IUserProfileRes>>> {
  return 1 as any;
}

// 函数泛型
function swap<T extends number, U extends number>([start, end]: [T, U]): [U, T] {
  return [end, start];
}
function pick<T extends object, U extends keyof T>(obj: T, ...props: Array<U>): Pick<T, U> {
  props.forEach((p) => delete obj[p]);
  return obj;
}

function handle<T>(payload: T): Promise<[T]> {
  return new Promise<[T]>((res, rej) => {
    res([payload]);
  });
}

const arr: Array<number> = [1, 2, 3];

// 类型“string”的参数不能赋给类型“number”的参数。
arr.push('linbudu');
// 类型“string”的参数不能赋给类型“number”的参数。
arr.includes('linbudu');

// number | undefined
let b = arr.find(() => false);

// 第一种 reduce
arr.reduce((prev, curr, idx, arr) => {
  return prev;
}, false);

// 第二种 reduce
// 报错：不能将 number 类型的值赋值给 never 类型
arr.reduce((prev, curr, idx, arr) => {
  return [...prev, curr];
}, []); // 这里的初始值在 strictNullChecks 都情况下被推断为never[]
// 解决办法
arr.reduce<number[]>((prev, curr, idx, arr) => {
  return [...prev, curr];
}, []); // 这里的初始值在 strictNullChecks 都情况下被推断为never[]
