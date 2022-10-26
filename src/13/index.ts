window.onerror = (event, source, lineno, colno, error) => {};

type CustomHandler = (name: string, age: number) => boolean;
// 也推导出了参数类型
const handler: CustomHandler = (arg1, arg2) => true;

declare const struct: {
  handler: CustomHandler;
};
// 不能将类型“void”分配给类型“boolean”。
struct.handler = (name, age) => {}; // true;

declare let func: (raw: number) => (input: string) => any;
// raw → number
func = (raw) => {
  // input → string
  return (input) => {};
};

class Foo {
  foo!: number;
}

class Bar extends Foo {
  bar!: number;
}

// ts推断不出的示例：
let f1: { (input: Foo): void } | { (input: Bar): void };
// 参数“input”隐式具有“any”类型。
f1 = (input) => {};

type CustomHandler = (name: string, age: number) => void;
const handler1: CustomHandler = (name, age) => true;
const handler2: CustomHandler = (name, age) => 'linbudu';
const handler3: CustomHandler = (name, age) => null;
const handler4: CustomHandler = (name, age) => undefined;
