type MarkFunctionProperties<Component> = {
  [Key in keyof Component]: Component[Key] extends Function ? never : Key;
};

type ExcludeFunctionProperties<T> = MarkFunctionProperties<T>[keyof T];

type ExcludeFunctionsFromComponent<T> = Pick<T, ExcludeFunctionProperties<T>>;

export type NgChanges<
  Component,
  Props = ExcludeFunctionsFromComponent<Component>
> = {
  [Key in keyof Props]: {
    previousValue: Props[Key];
    currentValue: Props[Key];
    firstChange: boolean;
    isFirstChange(): boolean;
  };
};
