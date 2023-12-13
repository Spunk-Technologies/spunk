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
    const res = f();
    if ((res as any).catch) {
      return (res as Promise<unknown>).catch((e) =>
        console.error(...print(e)),
      ) as any;
    }
    return res;
  } catch (e) {
    console.error(...print(e));
  }
}
