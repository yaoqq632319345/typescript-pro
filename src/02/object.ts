const tmp1: Object = undefined;
const tmp2: Object = null;
const tmp3: Object = void 0;

const tmp4: Object = 'linbudu';
const tmp5: Object = 599;
const tmp6: Object = { name: 'linbudu' };
const tmp7: Object = () => {};
const tmp8: Object = [];

type test<T> = T extends Object ? true : false;
type test2<T> = T extends object ? true : false;
// Object 是所有类型的顶端 '123' 也 属于Object的子类型
type a = test<'123'>; // true
type a2 = test2<'123'>; // false
