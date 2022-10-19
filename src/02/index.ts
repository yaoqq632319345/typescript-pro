const name1: string = 'string';
const age: number = 18;
const male: boolean = false;
const undef: undefined = undefined;
const nul: null = null;
const obj: object = { name1, age, male };
// const bigintVar1: number = 9007199212312354740991;
const bigintVar1: bigint = 9007199212312354740991n;
const bigintVar2: bigint = BigInt(9007199254740991);
const symbolVar: symbol = Symbol('unique');

const tmp1: null = null;
const tmp2: undefined = undefined;
// 仅在关闭 strictNullChecks 时成立
const tmp3: string = null;
const tmp4: string = undefined;

const tmp9: String = undefined;
const tmp10: String = null;
const tmp11: String = void 0;
const tmp12: String = 'linbudu';

// 以下不成立，因为不是字符串类型的拆箱类型
const tmp13: String = 599; // X
const tmp14: String = { name: 'linbudu' }; // X
const tmp15: String = () => {}; // X
const tmp16: String = []; // X

const tmp17: object = undefined;
const tmp18: object = null;
const tmp19: object = void 0;

const tmp20: object = 'linbudu'; // X 不成立，值为原始类型
const tmp21: object = 599; // X 不成立，值为原始类型

const tmp22: object = { name: 'linbudu' };
const tmp23: object = () => {};
const tmp24: object = [];

const tmp25: {} = undefined; // 仅在关闭 strictNullChecks 时成立，下同
const tmp26: {} = null;
const tmp27: {} = void 0; // void 0 等价于 undefined

const tmp28: {} = 'linbudu';
const tmp29: {} = 599;
const tmp30: {} = { name: 'linbudu' };
const tmp31: {} = () => {};
const tmp32: {} = [];

tmp30.age = 18; // X 类型“{}”上不存在属性“age”。
