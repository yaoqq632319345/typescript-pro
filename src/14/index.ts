class Animal {
  asPet() {}
}

class Dog extends Animal {
  bark() {}
}

class Corgi extends Dog {
  cute() {}
}
type DogFactory = (args: Dog) => Dog;
function transformDogAndBark(dogFactory: DogFactory) {
  const dog = dogFactory(new Dog());
  dog.bark();
}
function makeDogBark(dog: Dog) {
  dog.bark();
}
makeDogBark(new Corgi()); // 没问题
makeDogBark(new Animal()); // 不行

/**
 *
 */
type AsFuncArgType<T> = (arg: T) => void;
type AsFuncReturnType<T> = (arg: unknown) => T;

// 1 成立：(T -> Corgi) ≼ (T -> Dog): 返回值类型允许为 Dog 的子类型，不允许为 Dog 的父类型。
// 子类型都是适用情况更广泛
// 作为返回值, 柯基是狗，并且比狗更具体,可以做更多的事
type CheckReturnType = AsFuncReturnType<Corgi> extends AsFuncReturnType<Dog>
  ? 1
  : 2;

// 2 不成立：(Dog -> T) ≼ (Animal -> T) 参数类型允许为 Dog 的父类型，不允许为 Dog 的子类型。
// 作为参数 Animal 明显可以适配更多情况
type CheckArgType2 = AsFuncArgType<Animal> extends AsFuncArgType<Dog> ? 1 : 2;
type CheckArgType = AsFuncArgType<Dog> extends AsFuncArgType<Animal> ? 1 : 2;

/**
 * TSConfig 中的 StrictFunctionTypes
 */
function fn(dog: Dog) {
  dog.bark();
}
type CorgiFunc = (input: Corgi) => void;
type AnimalFunc = (input: Animal) => void;
const func1: CorgiFunc = fn;
const func2: AnimalFunc = fn;

// 在 TypeScript ESLint 中 有这么一条规则：method-signature-style，
// 原因
// method 声明 ❎
interface T1 {
  func(arg: string): number;
}
// property 声明 ✅
interface T2 {
  func: (arg: string) => number;
}
