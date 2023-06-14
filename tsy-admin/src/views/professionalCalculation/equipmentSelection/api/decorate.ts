let counter = 0;

function add(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  descriptor.value = function (...args: any[]) {
    counter++;
    return originalMethod.apply(this, args);
  };
  return descriptor;
}
class MyClass {
  @add
  static myStaticMethod() {}

  @add
  myInstanceMethod() {}
}

export const countDeractor = () => {
  MyClass.myStaticMethod();
  console.log(counter);
};
