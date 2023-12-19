/**
 * References:
 * - https://itnext.io/implementing-arithmetic-within-typescripts-type-system-a1ef140a6f6f
 * - https://stackoverflow.com/a/73369825
 */

type Digits = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
type LowercaseLetters =
  | "a"
  | "b"
  | "c"
  | "d"
  | "e"
  | "f"
  | "g"
  | "h"
  | "i"
  | "j"
  | "k"
  | "l"
  | "m"
  | "n"
  | "o"
  | "p"
  | "q"
  | "r"
  | "s"
  | "t"
  | "u"
  | "v"
  | "w"
  | "x"
  | "y"
  | "z";
type UppercaseLetters = Uppercase<LowercaseLetters>;
type Letters = LowercaseLetters | UppercaseLetters;
type AlphaNumeric = Digits | Letters;
type AlphaNumericCharacter = `${AlphaNumeric}`;

type Length<T extends any[]> = T extends { length: infer L } ? L : never;

const a: Length<[1]> = 1;

type BuildTuple<L extends number, T extends any[] = []> = T extends {
  length: L;
}
  ? T
  : BuildTuple<L, [...T, any]>;

const b: BuildTuple<2> = [1, 2];

type Add<A extends number, B extends number> = Length<
  [...BuildTuple<A>, ...BuildTuple<B>]
>;

type IsPositive<N extends number> = `${N}` extends `-${number}` ? false : true;
type IsWhole<N extends number> = `${N}` extends `${number}.${number}`
  ? false
  : true;

type IsValid<N extends number> = IsPositive<N> extends true
  ? IsWhole<N> extends true
    ? true
    : false
  : false;
type AreValid<A extends number, B extends number> = IsValid<A> extends true
  ? IsValid<B> extends true
    ? true
    : false
  : false;

type SafeAdd<A extends number, B extends number> = AreValid<A, B> extends true
  ? Add<A, B>
  : never;

type EQ<A, B> = A extends B ? (B extends A ? true : false) : false;

type AtLeastOneCharacter<
  T extends string,
  Count = 0,
  Accumulator extends string = T,
> = Count extends number
  ? EQ<Count, 2> extends true
    ? Accumulator
    :
        | `${T}${Accumulator}`
        | AtLeastOneCharacter<
            T,
            Add<Count, 1>,
            Accumulator | `${T}${Accumulator}`
          >
  : never;
