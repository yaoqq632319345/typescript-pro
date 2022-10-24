// 1.
declare let source: string;

declare let anyType: any;
declare let neverType: never;

anyType = source;

// 不能将类型“string”分配给类型“never”。
// 说明 string不是never 的子类型
neverType = source;

// 2.
type Result1 = 'linbudu' extends string ? 1 : 2; // 1
type Result2 = 1 extends number ? 1 : 2; // 1
type Result3 = true extends boolean ? 1 : 2; // 1
type Result4 = { name: string } extends object ? 1 : 2; // 1
type Result5 = { name: 'linbudu' } extends object ? 1 : 2; // 1
type Result6 = [] extends object ? 1 : 2; // 1

// 3.
type Result7 = 1 extends 1 | 2 | 3 ? 1 : 2; // 1
type Result8 = 'lin' extends 'lin' | 'bu' | 'du' ? 1 : 2; // 1
type Result9 = true extends true | false ? 1 : 2; // 1

type Result10 = string extends string | false | number ? 1 : 2; // 1

// 4.
type Result11 = 'lin' | 'bu' | 'budu' extends string ? 1 : 2; // 1
type Result12 = {} | (() => void) | [] extends object ? 1 : 2; // 1

type Result13 = 'linbudu' extends 'linbudu' | '599'
  ? 'linbudu' | '599' extends string
    ? 2
    : 1
  : 0;

// 5.
type Result14 = string extends String ? 1 : 2; // 1

// 6. {}
type Result15 = String extends {} ? 1 : 2; // 1
type Tmp = string extends object ? 1 : 2; // 2

// 16 21 {} => 代表字面量，是object的一种实现
type Result16 = {} extends object ? 1 : 2; // 1
type Result21 = {} extends Object ? 1 : 2; // 1
// 18 19 {} => 代表结构，符合结构(可扩展)即为子类型
type Result18 = object extends {} ? 1 : 2; // 1
type Result19 = Object extends {} ? 1 : 2; // 1
// 大Obj包含所有类型，小obj包含所有引用类型
type Result17 = object extends Object ? 1 : 2; // 1
type Result20 = Object extends object ? 1 : 2; // 1

type Result111 = string extends Object ? 1 : 2;

// 7. top type: any unknown
type Result22 = Object extends any ? 1 : 2; // 1
type Result23 = Object extends unknown ? 1 : 2; // 1

type Result24 = any extends Object ? 1 : 2; // 1 | 2
type Result25 = unknown extends Object ? 1 : 2; // 2

type Result26 = any extends 'linbudu' ? 1 : 2; // 1 | 2
type Result27 = any extends string ? 1 : 2; // 1 | 2
type Result28 = any extends {} ? 1 : 2; // 1 | 2
type Result29 = any extends never ? 1 : 2; // 1 | 2

type Result31 = any extends unknown ? 1 : 2; // 1
type Result32 = unknown extends any ? 1 : 2; // 1

// 8. never 任何类型的子类型，类型最底层
type Result33 = never extends 'linbudu' ? 1 : 2; // 1

// 当strictNullChecks: false是，undefined 和 null 其他类型的子类型
type Result34 = undefined extends 'linbudu' ? 1 : 2; // 2
type Result35 = null extends 'linbudu' ? 1 : 2; // 2
type Result36 = void extends 'linbudu' ? 1 : 2; // 2

// 9. 类型链
type TypeChain = never extends 'linbudu'
  ? 'linbudu' extends 'linbudu' | '599'
    ? 'linbudu' | '599' extends string
      ? string extends String
        ? String extends Object
          ? Object extends any
            ? any extends unknown
              ? unknown extends any
                ? 8
                : 7
              : 6
            : 5
          : 4
        : 3
      : 2
    : 1
  : 0;

type VerboseTypeChain = never extends 'linbudu'
  ? 'linbudu' extends 'linbudu' | 'budulin'
    ? 'linbudu' | 'budulin' extends string
      ? string extends {}
        ? string extends String
          ? String extends {}
            ? {} extends object
              ? object extends {}
                ? {} extends Object
                  ? Object extends {}
                    ? object extends Object
                      ? Object extends object
                        ? Object extends any
                          ? Object extends unknown
                            ? any extends unknown
                              ? unknown extends any
                                ? 8
                                : 7
                              : 6
                            : 5
                          : 4
                        : 3
                      : 2
                    : 1
                  : 0
                : -1
              : -2
            : -3
          : -4
        : -5
      : -6
    : -7
  : -8;

// 10.
type Result361 = 1 | 2 | 3 extends 1 | 2 | 3 | 4 ? 1 : 2; // 1
type Result37 = 2 | 4 extends 1 | 2 | 3 | 4 ? 1 : 2; // 1
type Result38 = 1 | 2 | 5 extends 1 | 2 | 3 | 4 ? 1 : 2; // 2
type Result39 = 1 | 5 extends 1 | 2 | 3 | 4 ? 1 : 2; // 2

type Result40 = [number, number] extends number[] ? 1 : 2; // 1
type Result41 = [number, string] extends number[] ? 1 : 2; // 2
type Result42 = [number, string] extends (number | string)[] ? 1 : 2; // 1
type Result43 = [] extends number[] ? 1 : 2; // 1
type Result44 = [] extends unknown[] ? 1 : 2; // 1
type Result45 = number[] extends (number | string)[] ? 1 : 2; // 1
type Result46 = any[] extends number[] ? 1 : 2; // 1
type Result47 = unknown[] extends number[] ? 1 : 2; // 2
type Result48 = never[] extends number[] ? 1 : 2; // 1
