// typeof
// 1.
const str = 'linbudu';

const obj = { name: 'linbudu' };

const nullVar = null; //strictNullChecks 为false时 ，会推断为any
const undefinedVar = undefined;

const func0 = (input: string) => {
  return input.length > 10;
};

type Str = typeof str; // "linbudu"
type Obj = typeof obj; // { name: string; }
type Null = typeof nullVar; // null
type Undefined = typeof undefined; // undefined
type Func = typeof func0; // (input: string) => boolean

// 2.
const func1 = (input: string) => {
  return input.length > 10;
};

type MyReturnType<T extends Function> = T extends (...args: any) => infer X
  ? X
  : never;
type FuncReturnType = MyReturnType<typeof func1>;

// 类型守卫
// 1.
function isString(input: unknown): boolean {
  return typeof input === 'string';
}
function foo(input: string | number) {
  // 这里isString 函数内部虽然判断了 input === string , 但ts不知道
  if (isString(input)) {
    // 类型“string | number”上不存在属性“replace”。
    input.replace('linbudu', 'linbudu599');
  }
}

// 2.
function isString2(input: unknown): input is string {
  return typeof input === 'string'r
}
// 当isString2 的结果为true时，input就是string
function foo2(input: string | number) {
  if (isString2(input)) {
    // 正确了
    input.replace('linbudu', 'linbudu599');
  }
}

// 3.
function isString3(input: unknown): input is number {
  return typeof input === 'string';
}
// 当isString2 的结果为true时，input就是number 并不会检查内部逻辑与ts的冲突
function foo3(input: string | number) {
  if (isString3(input)) {
    // 报错，在这里变成了 number 类型
    input.replace('linbudu', 'linbudu599');
  }
}
