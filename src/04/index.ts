function foo1(name: string): number {
  return name.length;
}
const foo2 = function (name: string): number {
  return name.length;
};
const foo3: (name: string) => number = function (name) {
  return name.length;
};

// 也可以使用interface
interface FuncFooStruct {
  (name: string): number;
}
const fn: FuncFooStruct = (xx: string) => 1;

// 在函数逻辑中注入可选参数默认值
function foo4(name: string, age?: number): number {
  const inputAge = age || 18; // 或使用 age ?? 18
  return name.length + inputAge;
}
foo4('');

foo5('');
// 直接为可选参数声明默认值
function foo5(name: string, age: number = 18): number {
  const inputAge = age;
  return name.length + inputAge;
}

// 函数重载
function func(foo: number, bar: true): string;
function func(foo: number, bar?: false): number;
function func(foo: number, bar?: boolean) {
  if (bar) {
    return String(foo);
  } else {
    return foo * 599;
  }
}

const res1 = func(599); // number
const res2 = func(599, true); // string
const res3 = func(599, false); // number

// 异步
async function asyncFunc(): Promise<void> {}
function* genFunc(): Iterable<void> {}
async function* asyncGenFunc(): AsyncIterable<void> {}

// class
class Foo {
  prop: string;

  constructor(inputProp: string) {
    this.prop = inputProp;
  }

  print(a: string): void; // 类的方法重载
  print(addon: string): void {
    console.log(`${this.prop} and ${addon}`);
  }

  get propA(): string {
    return `${this.prop}+A`;
  }

  set propA(value: string) {
    this.prop = `${value}+A`;
  }
}

// 修饰符
class Foo2 {
  static staticHandler() {}
  public instanceHandler() {}
}
class Foo2Child extends Foo2 {}
// 子类也可以使用 static 修饰过的属性和方法
Foo2Child.staticHandler();

class Base {
  printWithLove() {}
}
class Derived extends Base {
  override print() {
    // ...
  }
}

// 接口
interface FooStruct {
  absProp: string;
  get absGetter(): string;
  absMethod(input: string): string;
}

class Foo3 implements FooStruct {
  absProp: string = 'linbudu';
  get absGetter() {
    return 'linbudu';
  }
  absMethod(name: string) {
    return name;
  }
}
