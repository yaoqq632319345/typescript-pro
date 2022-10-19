// 被标记为 any 类型的变量可以拥有任意类型的值
let anyVar: any = 'linbudu';

anyVar = false;
anyVar = 'linbudu';
anyVar = {
  site: 'juejin',
};

anyVar = () => {};

// 标记为具体类型的变量也可以接受任何 any 类型的值
const val1: string = anyVar;
const val2: number = anyVar;
const val3: () => {} = anyVar;
const val4: {} = anyVar;

// unknown
let unknownVar: unknown = 'linbudu';

unknownVar = false;
unknownVar = 'linbudu';
unknownVar = {
  site: 'juejin',
};

unknownVar = () => {};

const val5: string = unknownVar; // Error
const val6: number = unknownVar; // Error
const val7: () => {} = unknownVar; // Error
const val8: {} = unknownVar; // Error // strictNullChecks 为true 时才报错

const val9: any = unknownVar;
const val10: unknown = unknownVar;

// never
type UnionWithNever = 'linbudu' | 599 | true | void | never;
function justThrow(): never {
  throw new Error();
}
function foo(input: number) {
  if (input > 1) {
    justThrow();
    // never 函数后面的代码等同于 return 语句后的代码，即 Dead Code
    const name = 'linbudu';
  }
}

declare const strOrNumOrBool:
    | string
    | number
    | boolean
    | Function /* 假设新增类型，但下面if没有新增对应的判断分支，则会报错 */;

if (typeof strOrNumOrBool === 'string') {
  // 一定是字符串！
  strOrNumOrBool.charAt(1);
} else if (typeof strOrNumOrBool === 'number') {
  strOrNumOrBool.toFixed();
} else if (typeof strOrNumOrBool === 'boolean') {
  strOrNumOrBool === true;
} else {
  const _exhaustiveCheck: never = strOrNumOrBool;
  throw new Error(`Unknown input type: ${_exhaustiveCheck}`);
}

// 当strictNullChecks: true && noImplicitAny: false 时，arr: never[], 否则 any[]
const arr = [];

interface IStruct {
  foo: string;
  bar: {
    barPropA: string;
    barPropB: number;
    barMethod: () => void;
    baz: {
      handler: () => Promise<void>;
    };
  };
}
// 这个例子是不会报错的
const obj = <IStruct>{
  bar: {
    baz: {
      handler: () => {},
    },
  },
};
