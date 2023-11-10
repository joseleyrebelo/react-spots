import { Intersect } from "./types";

/**
 * @todo - resolve not returning string only (returns "string | number" when Type only as string)
 */
export const objKeys = <Type extends object>(data: Type) =>
  Object.keys(data) as (keyof Intersect<Type>)[];
