type Factory<T> = T | number | string;
const foo: Factory<boolean> = true;

// 交叉类型
// 1.
interface NameStruct {
  name: string;
}
interface AgeStruct {
  age: number;
}
type ProfileStruct = NameStruct & AgeStruct;
const profile: ProfileStruct = {
  name: 'linbudu',
  age: 18,
};

// 2.
type StrAndNum = string & number; // never

// 3.
type Struct1 = {
  primitiveProp: string;
  objectProp: {
    name: string;
  };
};
type Struct2 = {
  primitiveProp: number;
  objectProp: {
    age: number;
  };
};
type Composed = Struct1 & Struct2;
type PrimitivePropType = Composed['primitiveProp']; // never
type ObjectPropType = Composed['objectProp']; // { name: string; age: number; }

// 4.
type UnionIntersection1 = (1 | 2 | 3) & (1 | 2); // 1 | 2
type UnionIntersection2 = (string | number | symbol) & string; // string

// 索引类型
// 1.
interface AllStringTypes {
  [key: string]: string;
}
type PropType1 = AllStringTypes['linbudu']; // string
type PropType2 = AllStringTypes['599']; // string

// 2.
interface AllStringTypes2 {
  propA: number; // 类型“number”的属性“propA”不能赋给“string”索引类型“boolean”。;
  [key: string]: boolean;
}

// keyof
// 1.
type key = keyof any;
const a: key = {}; // error: keyof any => string number symbol 是所有可能的键值类型

//索引类型访问
// 1.
interface NumberRecord {
  props: 1;
  [key: string]: number;
}
type PropType3 = NumberRecord[string /* 这里表示类型,而不是js表达式 */]; // number
type props = 'props';
type PropType4 = NumberRecord[props];

type Clone<T> = {
  [K in keyof T]: T[K];
};
//K in 属于映射类型的语法，keyof T 属于 keyof 操作符，[K in keyof T]的[]属于索引签名类型，T[K]属于索引类型访问
