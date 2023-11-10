export type Intersect<U> = (U extends any ? (k: U) => void : never) extends (
  k: infer I
) => void
  ? I
  : never;

export type SlashTuple<TupleSet extends any[]> = ((
  ...args: TupleSet
) => any) extends (_: any, ..._1: infer Rest) => any
  ? Rest
  : never;
