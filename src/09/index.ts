class Cat {
  eat() {}
}
class Dog {
  eat() {}
  a() {}
}
function feedCat(cat: Cat) {}

feedCat(new Dog());

declare const tag: unique symbol;

declare type Tagged<Token> = {
  readonly [tag]: Token;
};

export type Opaque<Type, Token = unknown> = Type & Tagged<Token>;

const cnyCnt: Opaque<{ cnt: number }, 'cny'> = { cnt: 100 };
