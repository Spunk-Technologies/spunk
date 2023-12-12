export function tryOrPrintAndThrow<T>(print: string, f: () => T): T {
  try {
    return f();
  } catch (e) {
    console.error(print);
    throw e;
  }
}

export function tryOrPrint<T>(
  print: (e: any) => any[],
  f: () => T,
): T | undefined {
  try {
    return f();
  } catch (e) {
    console.error(...print(e));
  }
}
