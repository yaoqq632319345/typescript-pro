interface Tmp {
  user:
    | {
        vip: true;
        expires: string;
      }
    | {
        vip: false;
        promotion: string;
      };
}

declare var tmp: Tmp;

if (tmp.user.vip) {
  console.log(tmp.user.expires);
}
const returnNum = () => 100 + 499;

enum Items {
  Baz,
  Bar = 599,
  Foo = returnNum(),
}
// 字符串枚举 不能通过值访问
enum Items2 {
  Foo,
  Bar = 'BarValue',
  Baz = 'BazValue',
}
// 编译结果，只会进行 键-值 的单向映射
// var Items2;
// (function (Items2) {
//   Items2[(Items2['Foo'] = 0)] = 'Foo';
//   Items2['Bar'] = 'BarValue';
//   Items2['Baz'] = 'BazValue';
// })(Items2 || (Items2 = {}));

//   常量枚举    ==   普通枚举
// 不能通过值访问
//   编译区别
const enum Items1 {
  Foo,
  Bar,
  Baz,
}

const fooValue = Items1.Foo; // 0
