export function Pure<T>(
  _target: Object,
  propertyKey: string,
  { enumerable, value }: TypedPropertyDescriptor<T>
): TypedPropertyDescriptor<T> {
  if (typeof value !== 'function') {
    throw new Error('Pure can only be used with functions or getters');
  }

  const original = value;

  return {
    enumerable,
    get(): T {
      let previousArgs: ReadonlyArray<unknown> = [];
      let previousResult: T;

      const patched = (...args: Array<unknown>) => {
        if (
          previousArgs.length === args.length &&
          args.every((arg, index) => arg === previousArgs[index])
        ) {
          return previousResult;
        }

        previousArgs = args;
        previousResult = original(...args);

        return previousResult;
      };

      Object.defineProperty(this, propertyKey, {
        value: patched,
      });

      return patched as any;
    },
  };
}
